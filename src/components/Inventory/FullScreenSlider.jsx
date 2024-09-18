import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const FullscreenSwiper = ({ images }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSlide, setSelectedSlide] = useState(null);

    const openFullscreen = (image) => {
        setSelectedSlide(image);
        setIsOpen(true);
    };

    const closeFullscreen = () => {
        setIsOpen(false);
        setSelectedSlide(null);
    };

    return (
        <div>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                navigation
                modules={[Navigation]}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} onClick={() => openFullscreen(image)}>
                        <img src={image.image} alt={`Slide ${index + 1}`} style={{ width: '100%' ,objectFit:'contain', height:'100%', cursor: 'pointer' }} />
                    </SwiperSlide>
                ))}
            </Swiper>

            {isOpen && (
                <div style={fullscreenStyle} onClick={closeFullscreen}>
                    <div style={slideStyle}>
                        <img src={selectedSlide.image} alt="Selected" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    </div>
                </div>
            )}
        </div>
    );
};

const fullscreenStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
};

const slideStyle = {
    color: '#fff',
    textAlign: 'center',
};

export default FullscreenSwiper;
