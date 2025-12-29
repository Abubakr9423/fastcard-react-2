
import { Swiper, SwiperSlide } from 'swiper/react';
import imgIphone from '../assets/hero_endframe__cvklg0xk3w6e_large 2.png'
import LogoIphone from '../assets/1200px-Apple_gray_logo 1.png'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import '../swiperHeader.css';

import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { MoveRight } from 'lucide-react';

export default function SwipperHeader() {
    return (
        <>
            <Swiper
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <aside className='bg-black text-white  rounded-sm flex md:flex-row flex-col md:gap-0 gap-3  md:px-20 md:py-5 py-10  items-center justify-between'>
                        <div className='flex flex-col justify-between gap-8'>
                            <div className='flex items-center gap-2'>
                                <img className='w-10' src={LogoIphone} alt="" />
                                <h1 >iPhone 14 Series</h1>
                            </div>
                            <div>
                                <h1 className='md:text-6xl text-2xl font-bold'>Up to 10% off Voucher</h1>
                            </div>
                            <div>
                                <p className='text-[20px] underline flex items-center gap-2'>Shop Now <MoveRight /></p>
                            </div>
                        </div>
                        <div className='md:w-140'>
                            <img className='w-full' src={imgIphone} alt="" />
                        </div>
                    </aside>
                </SwiperSlide>
                <SwiperSlide>
                    <aside className='bg-black text-white  rounded-sm flex md:flex-row-reverse flex-col md:gap-0 gap-3  md:px-20 md:py-5 py-10  items-center justify-between'>
                        <div className='flex flex-col justify-between gap-8'>
                            <div className='flex items-center gap-2'>
                                <img className='w-10' src={LogoIphone} alt="" />
                                <h1>iPhone 14 Series</h1>
                            </div>
                            <div>
                                <h1 className='md:text-6xl text-2xl font-bold'>Up to 10% off Voucher</h1>
                            </div>
                            <div>
                                <p className='text-[20px] underline'>Shop Now {'->'}</p>
                            </div>
                        </div>
                        <div className='md:w-140'>
                            <img className='w-full' src={imgIphone} alt="" />
                        </div>
                    </aside>
                </SwiperSlide>
            </Swiper>
        </>
    );
}
