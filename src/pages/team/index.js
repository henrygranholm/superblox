import React from 'react'
import './index.scss'
import backPic from '../../assets/img/bg/team.png'
import teamPic1 from '../../assets/img/team/1.svg'
import teamPic2 from '../../assets/img/team/2.svg'
import teamPic3 from '../../assets/img/team/3.svg'
import teamPic4 from '../../assets/img/team/4.svg'
import teamPic5 from '../../assets/img/team/5.svg'
import teamPic6 from '../../assets/img/team/6.svg'
import teamPic7 from '../../assets/img/team/7.svg'
import teamPic8 from '../../assets/img/team/8.svg'
import teamPic9 from '../../assets/img/team/9.svg'
import teamPic10 from '../../assets/img/team/10.svg'
import twitter from '../../assets/img/team/twitter.svg'

const data = [{
    pic: teamPic1,
    name: 'AL409',
    role: 'PRODUCT',
    contact: '7X7X7eth',
}, {
    pic: teamPic2,
    name: 'StreetStaker',
    role: 'Title',
    contact: 'streetstaker',
}, {
    pic: teamPic3,
    name: 'Creeptoad',
    role: 'Title',
    contact: 'creept0ad',
}, {
    pic: teamPic4,
    name: 'Moondust',
    role: 'Title',
    contact: 'moondustear',
}, {
    pic: teamPic5,
    name: 'unsecret',
    role: 'Title',
    contact: 'theunsecretman',
}, {
    pic: teamPic6,
    name: 'raz',
    role: 'Title',
    contact: 'Razorie1',
}, {
    pic: teamPic7,
    name: 'nobi',
    role: 'Title',
    contact: 'nobi',
}, {
    pic: teamPic8,
    name: 'brem',
    role: 'Title',
    contact: '_brownempire',
}, {
    pic: teamPic9,
    name: 'Luvi',
    role: 'Title',
    contact: 'Louvi_eth',
}, {
    pic: teamPic10,
    name: 'ToadyHawk',
    role: 'Title',
    contact: 'toady_hawks',
}]

export const Team = () => {
    return (
        <div className='team'>
            <img className='backImg' alt='pic' src={ backPic }></img>

            <div className='container'>
                <h1 className='team__title'>TEAM</h1>
                <p className='team__desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum.</p>

                <div className='team__contentwrapper'>
                    {data.map((item, index) => (
                        <div className='item' key={`team ${index}`}>
                            <div className='item__thumbnail'>
                                <img alt='pic' src={ item.pic } />
                            </div>

                            <div className='item__detail'>
                                <div className='item__detail__pic'>
                                    <img alt='pic' src={ item.pic } />
                                </div>

                                <div className='item__detail__name'>
                                    {item.name}
                                </div>

                                <div className='item__detail__role'>
                                    {item.role}
                                </div>

                                <a className='item__detail__contact' href={`https://twitter.com/${ item.contact }`} target={'_blank'}>
                                    <img alt='pic' src={twitter}></img>
                                    @{item.contact}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Team