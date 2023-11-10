import React, { useState, useEffect } from 'react'

const ProgressiveImg = ({ placeholderSrc, src, ...props }) => {
    const [imgSrc, setImgSrc] = useState(placeholderSrc || src)

    const customClass = placeholderSrc && imgSrc === placeholderSrc ? "loading" : "loaded"

    useEffect(() => {
        setImgSrc(placeholderSrc)

        const img = new Image()
        img.src = src
        img.onload = () => {
            setImgSrc(src)
        }
    }, [src])

    useEffect(() => {
        if( imgSrc !== src )
            setImgSrc(placeholderSrc)
    }, [imgSrc])

    return (
        <img
            {...{ src: imgSrc, ...props }}
            alt={props.alt || ""}
            className={`${customClass}`}
        />
    )
}

export default ProgressiveImg