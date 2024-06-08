import React, { useState } from 'react';
import './ImageSlider.css';

const ImageSlider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const sliderStyles = {
        height: '100%',
        position: 'relative',
    };

    const slideStyles = {
        width: '100%',
        height: '100%',
        borderRadius: '20px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        boxShadow: '0px 0px 10px 0px #1c1c1c3f',
    };

    const leftArrowStyles = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        left:'32px',
        fontSize: '45px',
        color:'#fff',
        zIndex: 1,
        cursor:'pointer',
    };

    const rightArrowStyles = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        right:'32px',
        fontSize: '45px',
        color:'#fff',
        zIndex: 1,
        cursor:'pointer',
    };

    const dotsContainerStyles = {
        display:'flex',
        justifyContent:'center',
    };

    const dotStyles = {
        margin: '0 3px',
        cursor:'pointer',
        fontSize:'20px',
    };

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1: currentIndex-1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length-1;
        const newIndex = isLastSlide ? 0 : currentIndex +1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    const getFileType = (url) => {
        if (!url) {
            return 'unknown';
        }
        const extension = url.split('.').pop();
        switch(extension) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                return 'image';
            case 'mp4':
            case 'avi':
            case 'mov':
                return 'video';
            default:
                return 'unknown';
        }
    };

    const renderSlide = (slideUrl) => {
        const fileType = getFileType(slideUrl);
        if (fileType === 'image') {
            return <div style={{...slideStyles, backgroundImage: `url(${slideUrl})`}}></div>;
        } else if (fileType === 'video') {
            return (
                <video autoPlay loop muted style={slideStyles}>
                    <source src={slideUrl} type="video/mp4" />
                </video>
            );
        } else {
            return <div>Unsupported file type</div>;
        }
    };

    return (
        <div style={sliderStyles}>
            {(slides.length>1) && <div style={leftArrowStyles} onClick={goToPrevious}>❮</div>}
            {(slides.length>1) && <div style={rightArrowStyles} onClick={goToNext}>❯</div>}
            {renderSlide(slides[currentIndex])}
            <div style={dotsContainerStyles}>
                {slides.map((slide, slideIndex) => (
                    <div key={slideIndex} style={dotStyles} onClick={()=>goToSlide(slideIndex)}>⚬</div>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
