import React,{useContext } from 'react';
import { ProductContext  } from '../api/FetchProducts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Paginate from '../snippets/Paginate';
import FormatWeight from '../Helper/formatWeight';
import { Link, NavLink } from 'react-router-dom';

// Helper function to convert item_name to slug
function generateSlug(itemName) {
    return itemName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

export default function ItemsCard() {
    const { products, loading, error, currentPage, setCurrentPage, totalPages, sliderProducts  } = useContext(ProductContext );
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
                                <NavLink to={`/product/${generateSlug(item.item.item_name)}`} className='slidecard'>
                                    <div>
                                        {item.item.images.length > 0 ? (
                                            <img src={item.item.images[0].image} loading='lazy' height="150px" width="100%" alt={item.item.item_name} />
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
                                </NavLink>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <div className='center ItemCard' style={{ flexDirection: 'column', alignItems: 'center' }}>
                <div className='page-width card-grid-container'>
                    {products.map((item, index) => (
                        <NavLink to={`/product/${generateSlug(item.item.item_name)}`} key={index} className='slidecard'>
                            <div>
                                {item.item.images.length > 0 ? (
                                    <img src={item.item.images[0].image} lazysizes="true" loading='lazy' height="150px" width="100%" alt={item.item.item_name} />
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
                        </NavLink>
                    ))}
                </div>
                {totalPages === 1 ? null : (
                    <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
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
