import React from 'react'
import loaderImg from '../../assets/svg/loader.svg'
import './index.scss'

export const Loader = ({ size='16' }) => {
    return (
        <img className='loader' src={ loaderImg } alt='pic' width={size} height={size} />
    )
}