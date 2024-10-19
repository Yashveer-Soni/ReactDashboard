import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export default function ProductImageSlider({ images }) {
    const [activeImage, setActiveImage] = useState(images[0]); 

    return (
        <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <div style={{ width: '100%' }}>
                <Swiper
                    spaceBetween={10}
                    slidesPerView={3}
                    navigation
                    modules={[Navigation]}
                    direction='horizontal'
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={image.image}
                                onClick={() => setActiveImage(image)}
                                loading="lazy" // Lazy load images
                                style={{
                                    cursor: 'pointer',
                                    filter: activeImage === image ? 'brightness(0.5)' : 'brightness(1)',
                                    padding: '2px',
                                    borderRadius: '4px',
                                    width: '100%',
                                    height: '100px'
                                }}
                                alt='swiper slider' // Accessibility
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            
        </div>
    );
}
