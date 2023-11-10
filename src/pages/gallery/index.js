import './index.scss'
import React, { useState, useEffect } from 'react'
import backPic from '../../assets/img/bg/gallery.jpg'
import searchIcon from '../../assets/img/gallery/searchIcon.svg'
import { ApplicationModal, attributes } from '../../constants'
import plusIcon from '../../assets/img/gallery/plus.svg'
import minusIcon from '../../assets/img/gallery/minus.svg'
import { useGalleryModalToggle, useModalOpen } from '../../hooks/store'
import { GalleryModal } from '../../components/galleryModal'
import useNFTMoralis from '../../hooks/useNFTMoralis'
import placeholderSrc from '../../assets/img/gallery/placeholder.png'
import ProgressiveImg from './galleryImage'

const Attribute = ({ name, searchAttr, toggleAttr }) => {
    const values = attributes[name]
    const [ open, setOpen ] = useState(false)
    const img = require(`../../assets/img/gallery/attr/${ name }.svg`)
    const [ searchText, setSearchText ] = useState('')

    const attrSelected = ( attr ) => {
        const index = searchAttr.findIndex(item => item.trait_type === name && item.value === attr)
        return index !== -1
    }

    const filteredValues = values.filter( (item) => item.toUpperCase().indexOf( searchText.toUpperCase() ) !== -1 )

    const selectedCount = values.filter((value) => {
        return searchAttr.findIndex( item => item.trait_type === name && item.value === value ) !== -1
    }).length

    return (
        <div className='my-2'>
            <div className='flex justify-between items-center cursor-pointer pb-3 px-1' onClick={ () => setOpen(prev => !prev) }>
                <div className='flex justify-center items-center'>
                    <div className='attrImg mr-2'><img alt='pic' src={img.default}></img></div>
                    <div className='attrName'>{ name }</div>
                    
                    { selectedCount > 0 ? (
                        <div className='attrBadge text-base flex items-center justify-center ml-2'>{ selectedCount }</div>
                    ) : null }
                </div>

                <div className='arrowIcon'>
                    <img alt='pic' src={ open ? minusIcon : plusIcon }></img>
                </div>
            </div>

            <div className={`lg:max-h-80 lg:overflow-y-auto relative attrContent px-2 ${ open ? 'active' : '' }`}>
                <div className='attrSearch mb-2'>
                    <input className='px-2' placeholder='Search...' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                </div>

                { filteredValues.map((item, index) => (
                    <div 
                        className={`attrCheck p-2 ${ attrSelected(item) ? 'active' : '' }`} 
                        key={`filter_${index}`} 
                        onClick={ () => toggleAttr( name, item ) }
                        >
                        <div className="attrCheck__btn">
                            <button>
                            </button> 
                        </div>
                        <p className="attrCheck__label">{ item }</p>
                    </div>
                )) }
            </div>
        </div>
    )
}

export const Gallery = () => {
    const [ showFilter, setShowFilter ] = useState(false)

    const [ searchAttr, setSearchAttr ] = useState([])

    const [ nftDetail, setNftDetail ] = useState({})

    const [ showCount, setShowCount ] = useState(20)

    const [ searchTokenId, setSearchTokenId ] = useState('')

    const openModal = useModalOpen( ApplicationModal.GALLERY )

    const toggleModal = useGalleryModalToggle()

    const { allNFTData } = useNFTMoralis()

    const getFilteredData = (data) => {
        return data.filter((item) => {
            const metadata = JSON.parse(item.metadata)

            if( searchTokenId !== '' && Number(item.token_id) !== Number(searchTokenId) )
                return false

            for( let i = 0; i < searchAttr.length; i++ ) {
                const temp = searchAttr[i]

                const index = metadata.attributes.findIndex((attr) => attr.trait_type === temp.trait_type && attr.value === temp.value)

                if( index === -1 )  return false
            }

            return true
        })
    }
    const dataArray = getFilteredData(allNFTData).slice(0, showCount)

    const toggleAttr = ( name, attr ) => {
        const newSearchAttr = [ ...searchAttr ]

        const index = newSearchAttr.findIndex( (item) => item.trait_type === name && item.value === attr )

        if( index === -1 )
            newSearchAttr.push({ trait_type: name, value: attr })
        else
            newSearchAttr.splice( index, 1 )

        setSearchAttr(newSearchAttr)
    }

    const getImageUrl = (item) => {
        let imageUrl = JSON.parse(item.metadata).image
        imageUrl = imageUrl.replace('ipfs://', 'https://nounpunks.mypinata.cloud/ipfs/')
        return imageUrl
    }

    const detectScroll = () => {
        if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight * 90 / 100)) {
            setShowCount(prev => prev + 20)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', detectScroll)

        return (() => window.removeEventListener('scroll', detectScroll))
    }, [])

    const onClickImage = (item) => {
        setNftDetail(item)

        toggleModal()
    }

    const handleClearFilter = () => {
        setSearchAttr([])
        setSearchTokenId('')
    }

    return (
        <div className='gallery'>
            <img className='backImg' alt='pic' src={ backPic }></img>

            <div className='container'>
                <div className={`gallery__filter ${ showFilter ? 'active' : '' }`}>
                    <h1 className='gallery__title'>FILTER</h1>
                    
                    <div className='gallery__filter__search'>
                        <input placeholder='Token ID...' value={ searchTokenId } onChange={ (ev) => setSearchTokenId( ev.target.value ) }/>
                        <img src={ searchIcon } alt='pic'></img>
                    </div>

                    <div className='gallery__filter__attributes'>
                        { Object.keys(attributes).map( (item, index) => (
                            <div key={ `attributes_${index}` }>
                                <Attribute name={ item } searchAttr={ searchAttr } toggleAttr={ toggleAttr } />
                            </div>
                        )) }
                    </div>

                    <div className='gallery__filter__collapse' onClick={() => setShowFilter(prev => !prev)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#b4b4b4" width="36px" height="36px"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path><path d="M0 0h24v24H0V0z" fill="none"></path></svg>
                    </div>
                </div>

                <div className='gallery__content'>
                    <h1 className='gallery__title'>GALLERY</h1>

                    <div className='gallery__content__wrapper relative'>
                        { dataArray.length > 0 && dataArray.map((item, index) => (
                            <div className='item p-2 flex flex-col relative' key={`galleryitem__${index}`} onClick={ () => onClickImage(item) }>
                                <div className='item__title w-full'>
                                    superBLOX #{ item.token_id }
                                </div>

                                <ProgressiveImg placeholderSrc={ placeholderSrc } src={`https://nounpunks.mypinata.cloud/ipfs/QmQUme3g63psPnu8cuvhaS9NAFoPfoyMvV5zyYBDCMwfYM/${ item.token_id }.jpg`} alt='pic' />
                            </div>
                        )) }

                        { allNFTData.length > 0 && !dataArray.length ? (
                            <div className='flex flex-col w-full justify-center items-center mt-12'>
                                <div className='text-white'>No search result found.</div>
                                <button className='clearFilterBtn p-4 mt-4' onClick={handleClearFilter}>Clear Filters</button>
                            </div>
                        ) : null }
                    </div>

                    <GalleryModal
                        isOpen={ openModal }
                        onClose={ toggleModal }
                        nftDetail={ nftDetail }
                    />
                </div>
            </div>
        </div>
    )
}

export default Gallery