import react, { useState, useEffect } from "react"
import Modal from 'react-modal'
import './index.scss'

export const GalleryModal = ({ isOpen, onClose, nftDetail }) => {
    const metadata = nftDetail.metadata ? JSON.parse( nftDetail.metadata ) : { attributes: [] }

    const downloadImage = async (imageSrc) => {
        const image = await fetch(imageSrc)
        const imageBlog = await image.blob()
        const imageURL = URL.createObjectURL(imageBlog)
        
        const link = document.createElement('a')
        link.href = imageURL
        link.download = imageSrc.split('/').pop()
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div id="modal_gallery">
            <Modal 
                isOpen={ isOpen } 
                onRequestClose={ onClose }
                appElement={document.getElementById('modal_gallery')} 
                className='galleryModal'
                overlayClassName="Overlay"
            >
                <div className="flex h-full relative modalWrapper">
                    <div className="w-3/5 h-full modalViewer">
                        <iframe src={`https://sbviewer.herokuapp.com/${ nftDetail.token_id }`} className="w-full h-full"></iframe>
                    </div>

                    <div className="p-8 w-full flex flex-col justify-between relative modalDetail">
                        <div className="relative" style={{ height: "calc(100% - 80px)" }}>
                            <div className="nft_name p-4 flex items-center mb-8">
                                superBLOX <span className="ml-2">#{ nftDetail.token_id }</span>
                            </div>

                            <div className="nft_attributes flex flex-wrap">
                                { (metadata?.attributes).map((item, index) => (
                                    <div className="nft_attribute text-center p-4" key={`attr_${index}`}>
                                        <div>{ item.trait_type }</div>
                                        <div className="font-bold"> { item.value } </div>
                                    </div>
                                )) }
                            </div>
                        </div>

                        <div className="buttons flex justify-between items-center">
                            <a 
                                className="w-1/3 p-2 py-5 flex justify-center items-center text-center"
                                target={'_blank'}
                                href={`https://opensea.io/assets/ethereum/0x1622ddfe621f5a3fb43a95cd575fc164a7e6c158/${ nftDetail.token_id }`}>
                                    OpenSea
                            </a>

                            <a 
                                className="w-1/3 p-2 py-5 flex justify-center items-center text-center" 
                                onClick={ () => downloadImage( `https://nounpunks.mypinata.cloud/ipfs/QmUoaAv8jkQxxxDdbF1cW5KZg8hUyeqESSXwZeSdZhqL6M/${ nftDetail.token_id }.png` ) }
                                >
                                    Download IMAGE
                            </a>

                            <a 
                                className="w-1/3 p-2 py-5 flex justify-center items-center text-center"
                                target={'_blank'}
                                href={`https://nounpunks.mypinata.cloud/ipfs/QmNR5nhCCDgges6uMRLZNzXQshVZtWZDSVwSrU7jvA6ozB/${ nftDetail.token_id }.glb`}>
                                    Download GLB
                            </a>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}