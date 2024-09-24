import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ReactImageMagnify from 'react-image-magnify';

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
                                alt={`Product Image ${index + 1}`} // Accessibility
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            
            <div style={{ width: '100%' }}>
                <ReactImageMagnify
                    {...{
                        smallImage: {
                            alt: 'Product Image',
                            isFluidWidth: true,
                            src: activeImage.image,
                            sizes: '100vw'
                        },
                        largeImage: {
                            src: activeImage.image, 
                            width: 3000, 
                            height: 3000 
                        },
                        enlargedImageContainerDimensions: { width: '200%', height: '200%' }, 
                        enlargedImagePosition: 'beside',
                        enlargedImageContainerStyle: { background: '#fff', zIndex: 1000 }, 
                        enlargedImageStyle: {
                            width: '100%', 
                            height: '100%',
                            objectFit: 'cover',
                        }
                    }}
                    style={{
                        width: '100%', 
                        height: 'auto',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        overflow: 'visible'
                    }}
                />
            </div>
        </div>
    );
}
