import React from 'react';
import {FetchProducts,FetchSliderProducts } from '../api/FetchProducts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Paginate from '../snippets/Paginate';
import FormatWeight from '../Helper/formatWeight';


export default function ItemsCard() {
    const { products, loading, error, currentPage, setCurrentPage, totalPages } = FetchProducts();
    const {sliderProducts } = FetchSliderProducts();
    return (
        <>
        <div className='center ItemCard'>
            <div className='page-width'>
            <Swiper
                    spaceBetween={10}
                    slidesPerView={5}
                    navigation
                    modules={[Navigation]}
                >
                    {sliderProducts.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className='slidecard'>
                                <div>
                                    {item.item.images.length > 0 ? (
                                        <img src={item.item.images[0].image}  loading='lazy' height="150px" width="100%" alt={item.item.item_name} />
                                    ) : (
                                        <p>No Image Available</p>  
                                    )}
                                </div>
                                <div>
                                    <h3>{item.item.item_name}</h3>
                                </div>
                                <div>
                                <FormatWeight weight={item.unit.weight} />
                                </div>
                                <div>
                                    <span>₹ {item.mrp} </span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
            </Swiper>
            </div>
        </div>
        <div className='center ItemCard' style={{flexDirection: 'column', alignItems: 'center'}}>
            <div className='page-width card-grid-container'>
                {products.map((item, index) => (
                    <div key={index} className='slidecard'>
                        <div>
                            {item.item.images.length > 0 ? (
                                <img src={item.item.images[0].image} lazysizes="true" loading='lazy' height="150px" width="100%" alt={item.item.item_name} />
                            ) : (
                                <p>No Image Available</p>  // Optional fallback if there is no image
                            )}
                        </div>
                        <div>
                            <h3>{item.item.item_name}</h3>
                        </div>
                        <div>
                            <FormatWeight weight={item.unit.weight} />
                        </div>
                        <div>
                            <span>₹ {item.mrp} </span>
                        </div>
                    </div>
                ))}
            </div>
            {totalPages === 1 ? null : (
                <div style={{paddingTop: '20px', paddingBottom: '20px'}}>
                    <Paginate
                        count={totalPages}
                        page={currentPage}
                        onPageChange={page => setCurrentPage(page)} 
                    />
                </div>
            )}

          
        </div>
        </>
    );
}