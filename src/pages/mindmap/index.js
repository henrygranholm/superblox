import React from 'react'
import './index.scss'
import backPic from '../../assets/img/bg/mindmap.png'
import vision from '../../assets/img/mindmap/vision.svg'
import drops from '../../assets/img/mindmap/drops.svg'
import metaverse from '../../assets/img/mindmap/metaverse.svg'
import partnership from '../../assets/img/mindmap/partnership.svg'
import community from '../../assets/img/mindmap/community.svg'
import { useState } from 'react'
import { ApplicationModal } from '../../constants'
import { useMindMapModalToggle, useModalOpen } from '../../hooks/store'
import { MindMapModal } from '../../components/mindmapModal'

export const MindMap = () => {
    const [ type, setType ]  = useState('')

    const modalOpen = useModalOpen( ApplicationModal.MINDMAP )

    const toggleModal = useMindMapModalToggle()

    const handleClickSection = (type) => {
        setType(type)
        
        toggleModal()
    }

    return (
        <div className='mindmap'>
            <img className='backImg' alt='pic' src={ backPic }></img>

            <div className='container'>
                <h1 className='mindmap__title'>MINDMAP</h1>
                <p className='mindmap__desc'>Lorem ipsum dolor sit amet, consec
                tetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>

                <div className='flex mindmap__gridwrapper justify-between'>
                    <div className='flex flex-col first'>
                        <div className='gridItem vision' onClick={() => { handleClickSection('vision') }}>
                            <img alt='pic' src={vision}/>
                            <h5>VISION</h5>
                        </div>

                        <div className='gridItem drops' onClick={() => { handleClickSection('drops') }}>
                            <img alt='pic' src={drops}/>
                            <h5>DROPS</h5>
                        </div>
                    </div>

                    <div className='gridItem community' onClick={() => { handleClickSection('community') }}>
                        <img alt='pic' src={community}/>
                        <h5>COMMUNITY</h5>
                    </div>

                    <div className='flex flex-col third'>
                        <div className='gridItem metaverse' onClick={() => { handleClickSection('metaverse') }}>
                            <img alt='pic' src={metaverse}/>
                            <h5>METAVERSE</h5>
                        </div>

                        <div className='gridItem partnership' onClick={() => { handleClickSection('partnership') }}>
                            <img alt='pic' src={partnership}/>
                            <h5>PARTNERSHIP</h5>
                        </div>
                    </div>
                </div>

                <MindMapModal
                    isOpen={modalOpen}
                    onClose={ toggleModal }
                    type={ type }
                />
            </div>

        </div>
    )
}

export default MindMap