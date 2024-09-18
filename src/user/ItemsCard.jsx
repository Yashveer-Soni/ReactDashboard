import * as React from 'react';
import FetchProducts from '../api/FetchProducts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function ItemsCard() {
    const { products, loading, error } = FetchProducts();
    console.log(products);
    return (
        <section className='center ItemCard'>
            <div className='page-width'>
            <Swiper
                    spaceBetween={10}
                    slidesPerView={5}
                    navigation
                    modules={[Navigation]}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    {products.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className='slidecard'>
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
                                    <span>{item.unit.weight} kg</span>
                                </div>
                                <div>
                                    <span>₹ {item.mrp} </span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}