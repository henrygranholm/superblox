import react, { useState, useEffect } from "react"
import Modal from 'react-modal'
import './index.scss'
import closeIcon from '../../assets/svg/close.svg'
import visionPic from '../../assets/img/mindmap/vision_modal.png'
import dropsPic from '../../assets/img/mindmap/drops_modal.png'
import communityPic from '../../assets/img/mindmap/community_modal.svg'
import metaversePic from '../../assets/img/mindmap/metaverse_modal.svg'
import partnershipPic from '../../assets/img/mindmap/partnership.svg'

const backPicArray = {
    vision: visionPic,
    drops: dropsPic,
    community: communityPic,
    metaverse: metaversePic,
    partnership: partnershipPic,
}

export const contents = {
    vision: {
        title: 'The Journey (Vision)',
        desc: `<p class="italic">¼) To passers-by, the cave at the top of the cliff, in Pixel valley, looked like any cave.</p>

                <br/>

                <p class="italic text-base">At exactly 8:59 pm, on the last day of summer, the sunset on the cliff opposite the cave. Buky and Boxy caught the glimpse of a golden leaf amongst the pale backdrop.</p>

                <br/>

                <p class="italic text-base">Suddenly the leaves began to glow, one by one. Colors flowed through the vines and the perfectly square crystalline rocks of the cave danced with summer’s final rays. </p>

                <br/>

                <p class="italic text-base">The majestic rocks were so artfully cut, shaped, and assembled that they did not match their surroundings.</p>

                <br/>

                <p class="text-lg">Our vision is the process. As architectural designers and artists, we want to distance ourselves from the classical mindset of a “static vision” to build towards a dynamic vision, with the process as the heartbeat. Design is self-communication, and we want to extend and re-establish that communicative process for community participation. Contemporary art and design, have given creators the power to believe in the process rather than limiting themselves to end results. We like to take on the challenge, work on it non-stop and embrace what we call “Happy accidents''. superBlox is a true outcome of this phenomenon.</p>

                <br/>

                <p class="text-lg">Our journey with NounPunks began as an experiment, inspired by our favorite collections/ artists with a desire to build a community of like-minded creative builders. Our next challenge was to take this further. Virtual communities and metaverses are the inevitable extension of our reality and social interaction. With the design process and metaverse in mind, we started our second journey by translating our 2D static representation into 3D avatars, fully open-source that will enable the holders to exist in the so-called metaverse. Our goal is to become a platform that creatively empowers individuals, to help develop their internal guidelines for unique designs, artistic expression, and web3 development. Focusing on the processes of self-expression whilst inhabiting metaverse ready social experience and collaboration.</p>
            `
    },
    drops: {
        title: 'Drops (The hole)',
        desc: `<p class="italic">2/4) ​​A flash of light cracked from the cave, and more crystal rocks began to protrude from the lower cliff face, spell-bindingly forming the shape of a pixelated, diamond hand.</p>

                <br/>

                <p class="italic">Our two teens were swept under the palm of the giant hand and thrown deep into the mouth of the cave.</p>

                <br/>

                <p class="italic">The leaves began turning pale in the final seconds of sunset. No one else witnessed the event.</p>

                <br/>

                <p class="italic">Tumbling down and down, distracted by unique colors and cubic rocks, and a crimson waterfall, the two teenagers hit the sandy floor of a dark room, surrounded by ancient ruins. Pillars or blocks.</p>

                <br/>

                <p class="text-lg">As we progress, our team is constantly working on ways to add value to our holders, offering both digital and physical drops for all superBlox holders.</p>

                <br/>

                <p class="text-lg font-bold">Digital Assets:</p>
                <p class="text-lg">There will be a series of future Airdrops and Minting passes for all superBlox holders that will place our holders in a higher position than other buyers. Below is a list of future drops:</p>

                <br />

                <p class="text-lg"> - 3D interactive glb superBlox avatars (Completed)</p>
                <p class="text-lg"> - Minting pass for superPets (In process)</p>
                <p class="text-lg"> - Metaverse ready models compatible with multiples platforms ( In process)</p>
                <p class="text-lg"> - superVerse platform (exploring)</p>
                <p class="text-lg"> - Play to collect game (exploring)</p>

                <br />

                <p class="text-lg font-bold">Physical Assets:</p>
                <p class="text-lg">superBlox is blessed with an amazing community of holders. Our community roots in design are tied to our brand and our vision. In addition, our team of designers is constantly in search of creating physical assets for all superBlox holders.</p>

                <br />

                <p class="text-lg"> - superBlox designed Hoodie(wearables in general) (In process)</p>
                <p class="text-lg"> - superBlox designed Caps (In process)</p>
                <p class="text-lg"> - Merchandise created by other superBlox holders available on superShop (Exploring)</p>
            `
    },
    community: {
        title: 'Community (the crystal cube)',
        desc: `<p class="italic">¾) One carving stood out more than any other. It glistened in the dark room, the only source of light. Boxy curiously walked over to the shining runes on the wall and ran her hand across them, to reveal golden etchings that formed pixelated faces of an ape and alien. Each unique etching was wearing a gold hoodie and a golden pair of specs. These mystical beings’ eyes were looking to the left of the Boxy.</p>

                <br/>

                <p class="italic">Boxy turned to her left, pursuing their gaze, to show a small, rainbow-colored crystal cube on a pedestal.</p>

                <br/>

                <p class="text-lg">Community engagement has been at the heart of superBlox development. We are very fortunate to have a vibrant and supportive community. As we venture into the metaverse, superBlox follows the same open-source ideologies of CC0 in nature. We encourage and support those who want to take aspects of the project and turn it into something new. We also believe for any community to evolve, existing mechanisms need to be embedded as catalysts for individual growth. Thus we have introduced three pillars of growing together, like the ABC of writing, this is our ECG of growing.</p>

                <br/>

                <p class="text-lg ml-8 font-bold">Education:</p>
                <p class="text-lg ml-8">We believe in Web3 and its future. We also believe for that future to exist there has to be a certain general understanding of the key principles of decentralization and web3 thinking and it is for that reason that we have launched our NounPunks University (NPU), where both NounPunks and superBlox holders can access a series of educational articles and videos that will pave the way for our community and teach the basics of web3, NFT and crypto culture. LINK></p>

                <br/>

                <p class="text-lg ml-8 font-bold">Competition:</p>
                <p class="text-lg ml-8">We believe healthy competition is one of the best ways of activating the power of our community and educating them at the same time. Competitions are also a great way for us to find talents within our own community. This has been an ongoing process with the NounPunks and now any superBlox holder can also take part in it.</p>

                <br/>

                <p class="text-lg ml-8 font-bold">Giveaways:</p>
                <p class="text-lg ml-8">Finally, giveaways are our last step in engaging our community. Giveaways are not only a way of giving back to a community we hold so dear, but it is also a way of motivating (incentivizing) our holder more to ignite a spark of talent they did not realize they have, to develop talent and become creators. We have experienced and are experiencing firsthand the artistic process of design. We share this passion with you and are here to develop your passion for design.</p>
            `
    },
    metaverse: {
        title: 'Metaverse',
        desc: `<p class="italic">4/4) Boxy picked up the crystal cube, its colors moved within, swirling, mesmerizing the two teenagers. Stunned by its magic, Boxy dropped the cube, shattering its crystalline walls. An explosion of iridescent paint filled the room, so much so that the walls faded into a new horizon with every splash. The two teenagers were no longer in Pixel valley, nor were they in the room of ruins. Unknowingly, they had opened the portal to a new dimension.</p>

                <br/>

                <p class="text-lg">The superVerse is perhaps our most ambitious goal. Building upon the 2D art of NounPunks and forming a community around it has led us step by step into the 3D realm of SuperBlox and the inevitable future of the web3. This will be a place where everything can gather in an alternate space and form a new platform for socials, events, marketing, you name it. It is what we make it, so let's make it special. This indeed will be a long, bumpy road but your SuperBlox will be your key into this future, and what is most exciting is that the development has already started…</p>

                <br />

                <p class="text-lg"> - Transformation of 2D into 3D (Completed)</p>
                <p class="text-lg"> - superBlox 3D Model airdrop (Completed)</p>
                <p class="text-lg"> - Fully rigged SuperBlox (in process)</p>
                <p class="text-lg"> - superVerse ( Exploring)</p>
            `
    },
    partnership: {
        title: 'Partnership (The Fabric)',
        desc: `
                <p class="text-lg">The NFT community is extremely polarizing yet incredibly small in scale! With the whole culture being built on the basis of decentralization, it is vital for any project to form strong partnerships, build trust, and help each other grow. Collaboration enhances the process and discovers new concepts. We are still a minority in the world of art and tech and our best bet for growth is to learn from each other and support one another. superBlox and NounPunks are fortunate to be part of one of the most prominent and important movements of the blockchain, the CC0 movement. Being tied to NounPunks, superBlox has the advantage of being affiliated with Nouns Dao, Prophouse, and Nouncil. We encourage members to look into these projects more and see the potential we see. Our team is constantly in search of other like-minded projects to co-operate with and to bring more value to our holders. Help move the culture forward little by little.</p>
            `
    }
}

export const MindMapModal = ({ isOpen, onClose, type }) => {
    return (
        <div id="modal_mindmap">
            <Modal 
                isOpen={ isOpen } 
                onRequestClose={ onClose }
                appElement={document.getElementById('modal_mindmap')} 
                className='mindmapModal'
                overlayClassName="Overlay"
            >
                <div className="flex flex-col h-full relative">
                    <button className="closeBtn" onClick={ onClose }>
                        <img src={ closeIcon } alt='pic'></img>
                    </button>

                    <div className="flex flex-col justify-between h-full">
                        <div className="text-3xl text-black font-bold uppercase p-6">
                            { contents[type]?.title }
                        </div>

                        <div 
                            className="w-1/2 text-base p-6 mb-6 description" 
                            dangerouslySetInnerHTML={{
                                __html: contents[type]?.desc
                            }}>
                        </div>
                    </div>

                    <div className={`backPic ${ type }`}>
                        <img alt="pic" src={ backPicArray[ type ] } />
                    </div>
                </div>
            </Modal>
        </div>
    )
}