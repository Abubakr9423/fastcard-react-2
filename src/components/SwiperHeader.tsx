
import { Swiper, SwiperSlide } from 'swiper/react';
import imgIphone from '../assets/hero_endframe__cvklg0xk3w6e_large 2.png'
import LogoIphone from '../assets/1200px-Apple_gray_logo 1.png'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import '../swiperHeader.css';

import { Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { MoveRight } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function SwipperHeader() {
    const { t } = useTranslation();
    return (
        <>
            <Swiper
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Pagination, Mousewheel, Keyboard]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <aside className='bg-black text-white rounded-sm flex md:flex-row flex-col md:gap-0 gap-3 md:px-20 md:py-7 py-10 items-center justify-between'>
                        <div className='flex flex-col justify-between gap-8'>
                            <div className='flex items-center gap-2'>
                                <img className='w-10' src={LogoIphone} alt="iPhone Logo" />
                                <h1>{t("iphoneSeries")}</h1>
                            </div>
                            <div>
                                <h1 className='md:text-6xl text-2xl font-bold'>
                                    {t("upToOff")}
                                </h1>
                            </div>
                            <div>
                                <p className='text-[20px] underline flex items-center gap-2 cursor-pointer'>
                                    {t("shopNow")} <MoveRight />
                                </p>
                            </div>
                        </div>
                        <div className='md:w-140'>
                            <img className='w-full' src={imgIphone} alt="iPhone" />
                        </div>
                    </aside>
                </SwiperSlide>
                <SwiperSlide>
                    <aside className='bg-black text-white rounded-sm flex md:flex-row-reverse flex-col md:gap-4 gap-3 md:px-30 md:py-6 py-6 px-10 items-center justify-between'>
                        <div className='flex flex-col justify-between gap-8'>
                            <div className='flex items-center gap-2'>
                                <img className='w-10' src={LogoIphone} alt="" />
                                <h1>{t("iphoneSeries")}</h1>
                            </div>
                            <div>
                                <h1 className='md:text-6xl text-2xl font-bold'>
                                    {t("upToOff")}
                                </h1>
                            </div>
                            <div>
                                <p className='text-[20px] underline cursor-pointer'>
                                    {t("shopNow")} {'->'}
                                </p>
                            </div>
                        </div>
                        <div>
                            <img
                                className='w-45 h-70 rounded-2xl'
                                src={'https://i.pinimg.com/736x/ba/d5/35/bad535436fd6f2895c99fbe4047f46b3.jpg'}
                                alt="iPhone"
                            />
                        </div>
                    </aside>
                </SwiperSlide>
            </Swiper>
        </>
    );
}
