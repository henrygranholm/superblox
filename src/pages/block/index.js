import React from 'react'
import {isMobile} from 'react-device-detect'
import './index.scss'
import backPic from '../../assets/img/bg/block.png'
import backMobilePic from '../../assets/img/bg/block_mobile.jpg'

export const Block = () => {
    return (
        <div className='block'>
            <img className='backImg' alt='pic' src={ !isMobile ? backPic : backMobilePic }></img>

            <div className='container'>
                <div className='block__title'>
                    Block
                </div>

                <p className='block__desc'>
                    Hidden in the mountains of the Pixel valley there was a cave. In fact, this cave was so subtle and so high up, it was often mistaken for a small alcove. Vines with pale leaves wove across its square-like mouth. The unique thing about these specific leaves was that they shone iridescently at a specific minute on a particular day, exactly when the sun set on the cliff opposite. Even more unique than the leaves were the stones that they covered. Few explorers ventured down Pixel valley, for only the local villagers knew of its whereabouts. Most thought it ugly and overgrown, except for two teenagers. To passers-by, the cave at the top of the cliff, in Pixel valley, looked like any cave. At exactly 8:59 pm, on the last day of summer, the sunset on the cliff opposite the cave. The two teens Boxy and Buky caught the glimpse of a golden leaf amongst the pale backdrop. Suddenly the leaves began to glow, one by one. Colors flowed through the vines and the perfectly square crystalline rocks of the cave danced with summer's final rays. The majestic rocks were so artfully cut, shaped, and assembled that they did not match their surroundings. A flash of light cracked from the cave, and more crystal rocks began to protrude from the lower cliff face, spell-bindingly forming the shape of a pixelated, diamond hand. Mesmerized by its shimmering presence, Boxy and Buky climbed towards the mouth of the cave and suddenly were swept under the palm of the giant hand and thrown deep into the mouth. The leaves began turning pale in the final seconds of sunset. No one else witnessed the event. Tumbling down and down, distracted by unique colors and cubic rocks, they hit the sandy floor of a dark room, surrounded by ancient ruins. Pillars and blocks. They turned to look for the cave entrance, but there was none. Across the walls were carvings of human-like faces and spectacles. One carving stood out more than any other. It glistened in the dark room, the only source of light. Curious Buky walked over to the shining runes on the wall and ran her hand across them, to reveal golden etchings that formed pixelated faces of an ape and an alien. Each unique etching was wearing a gold hoodie and a golden pair of specs. These mystical beings' eyes were looking to the left of Buky. Buky turned to her left, pursuing their gaze, to show a small, rainbow-colored crystal cube on a pedestal. She picked it up, and the colors moved within, swirling, hypnotizing the two teenagers. Stunned by its magic, Buky dropped the cube, shattering its crystalline walls. An explosion of iridescent paint filled the room, so much so that the walls faded into a new horizon with every splash. They were no longer in Pixel valley, nor were they in the room of ruins. Unknowingly, they had opened the gate to a new dimension. Hidden in the mountains of the Pixel valley there was a cave. In fact, this cave was so subtle and so high up, it was often mistaken for a small alcove. Vines with pale leaves wove across its square-like mouth. The unique thing about these specific leaves was that they shone iridescently at a specific minute on a particular day, exactly when the sun set on the cliff opposite. Even more unique than the leaves were the stones that they covered.
                    <br/>
                    Few explorers ventured down Pixel valley, for only the local villagers knew of its whereabouts. Most thought it ugly and overgrown, except for two teenagers.
                    <br/>
                    To passers-by, the cave at the top of the cliff, in Pixel valley, looked like any cave.
                    <br/>
                    At exactly 8:59 pm, on the last day of summer, the sunset on the cliff opposite the cave. The two teens Boxy and Buky caught the glimpse of a golden leaf amongst the pale backdrop.
                    <br/>
                    Suddenly the leaves began to glow, one by one. Colors flowed through the vines and the perfectly square crystalline rocks of the cave danced with summer’s final rays.
                    <br/>
                    The majestic rocks were so artfully cut, shaped, and assembled that they did not match their surroundings.
                    <br/>
                    A flash of light cracked from the cave, and more crystal rocks began to protrude from the lower cliff face, spell-bindingly forming the shape of a pixelated, diamond hand.
                    <br/>
                    Mesmerized by its shimmering presence, Boxy and Buky climbed towards the mouth of the cave and suddenly were swept under the palm of the giant hand and thrown deep into the mouth.
                    <br/>
                    The leaves began turning pale in the final seconds of sunset. No one else witnessed the event.
                    <br/>
                    Tumbling down and down, distracted by unique colors and cubic rocks, they hit the sandy floor of a dark room, surrounded by ancient ruins. Pillars and blocks.
                    <br/>
                    They turned to look for the cave entrance, but there was none.
                    <br/>
                    Across the walls were carvings of human-like faces and spectacles.
                    <br/>
                    One carving stood out more than any other. It glistened in the dark room, the only source of light. Curious Buky walked over to the shining runes on the wall and ran her hand across them, to reveal golden etchings that formed pixelated faces of an ape and an alien. Each unique etching was wearing a gold hoodie and a golden pair of specs. These mystical beings' eyes were looking to the left of Buky.
                    <br/>
                    Buky turned to her left, pursuing their gaze, to show a small, rainbow-colored crystal cube on a pedestal.
                    <br/>
                    She picked it up, the colors moved within, swirling, hypnotizing the two teenagers. Stunned by its magic, Buky dropped the cube, shattering its crystalline walls. An explosion of iridescent paint filled the room, so much so that the walls faded into a new horizon with every splash. They were no longer in Pixel valley, nor were they in the room of ruins.
                    <br/>
                    Unknowingly, they had opened the gate to a new dimension.
                </p>
            </div>
        </div>
    )
}

export default Block
