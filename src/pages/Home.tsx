
import img1 from '../assets/Frame 694.png'
import img2 from '../assets/Services.png'
import img3 from '../assets/Services (1).png'
import img4 from '../assets/Services (2).png'
import img5 from '../assets/ps5-slim-goedkope-playstation_large 1.png'
import img6 from '../assets/attractive-woman-wearing-hat-posing-black-background 1.png'
import img7 from '../assets/Frame 707.png'
import img8 from '../assets/652e82cd70aa6522dd785109a455904c.png'
import { Eye, Heart, MoveLeft, MoveRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import Rating from '@/components/Rating'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../swiper.css';
import "../App.css"
import { Pagination } from 'swiper/modules';
import { Link, useNavigate } from 'react-router-dom'
import { GetToken } from '@/utils/axios'
import { toggleWishlist, useAddToCards, useCategory, useProductStore } from '@/store/store'
import SwipperHeader from '@/components/SwiperHeader'
import { NumberTicker } from '@/components/ui/number-ticker'
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { toast, ToastContainer } from 'react-toastify'


const Home = () => {
  const { data, fetchProducts } = useProductStore();
  const { isCategoria, getCategory } = useCategory();
  const { AddToCard } = useAddToCards();
  const naviget = useNavigate()
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const swiperRef = useRef<SwiperType | null>(null);
  const swiperRef2 = useRef<SwiperType | null>(null);
  const errorForBuy = () => toast("Бубахшед шумо то хол худро ба кайд нагирифтаuд!");
  const { setFilters } = useProductStore((state) => state);
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);

  const handleAddCart = (productId: number) => {
    if (token) {
      AddToCard(productId);
    } else {
      errorForBuy();
      setTimeout(() => {
        naviget('/');
      }, 4000);
    }
  };


  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const diff = tomorrow.getTime() - now.getTime();

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistIds(data.map((item: any) => item.id));
  }, []);

  const handleWishlist = (product: any) => {
    toggleWishlist(product);
    const data = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistIds(data.map((item: any) => item.id));
  };
  const token = GetToken()


  useEffect(() => {
    fetchProducts();
    getCategory();
  }, [fetchProducts, getCategory, naviget, AddToCard]);

  return (
    <main className='max-w-337.5 m-auto my-2 md:px-0 px-3'>
      <ToastContainer />
      <section className='flex mt-5 mb-8 md:flex-row flex-col gap-5'>
        <aside className='md:flex hidden gap-3 flex-col  items-start  w-[20%]'>
          <div className="p-3 border h-80 flex flex-col w-65 rounded-lg shadow bg-white min-h-55">
            <h2 className="text-base font-semibold mb-2 text-gray-700">Category</h2>

            {Array.isArray(isCategoria) ? (
              <div
                className="space-y-1 overflow-y-auto overflow-x-hidden max-h-65 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-100">
                {isCategoria.map((e) => (
                  <h1
                    key={e.id}
                    onClick={() => {
                      setFilters({ categoryId: e.id });
                      naviget("/products");
                      fetchProducts();
                    }}
                    className="cursor-pointer py-1 px-2 rounded-md 
                     hover:bg-blue-100 hover:text-blue-600
                     transition-all duration-300 ease-in-out
                     transform hover:scale-105 text-gray-800"
                  >
                    {e.subCategoryName}
                  </h1>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center mt-6">
                <p className="font-medium text-sm text-gray-500 animate-pulse">
                  Маълумот ёфт нашуд...
                </p>
              </div>
            )}
          </div>
        </aside>

        <aside className='my-2 md:hidden block'>
          <Input type="text" className='px-2' placeholder='Search' />
          <div className='flex flex-wrap my-2 gap-2'>
            <p className='px-2 py-2 rounded-sm bg-[#F5F5F5] '>Woman’s Fashion {'->'}</p>
            <p className='px-2 py-2 rounded-sm bg-[#F5F5F5] '>Men’s Fashion {'->'}</p>
            <p className='px-2 py-2 rounded-sm bg-[#F5F5F5] '>Electronics</p>
            <p className='px-2 py-2 rounded-sm bg-[#F5F5F5] '>Home & Lifestyle</p>
            <p className='px-2 py-2 rounded-sm bg-[#F5F5F5] '>Medicine</p>
            <p className='px-2 py-2 rounded-sm bg-[#F5F5F5] '>Sports & Outdoor</p>
            <p className='px-2 py-2 rounded-sm bg-[#F5F5F5] '>Baby’s & Toys</p>
            <p className='px-2 py-2 rounded-sm bg-[#F5F5F5] '>Groceries & Pets</p>
            <p className='px-2 py-2 rounded-sm bg-[#F5F5F5] '>Health & Beauty</p>
          </div>
        </aside>

        <SwipperHeader />
      </section>
      <section className='my-5'>
        <div className='text-[#DB4444]  flex items-center gap-2'>
          <div className='bg-[#DB4444] rounded-lg  py-2 px-1'>O</div>
          <p className='font-bold text-xl'>Today’s</p>
        </div>
        <div className='flex md:my-0 my-5 md:items-center md:flex-row flex-col justify-between'>
          <div className='flex md:flex-row flex-col md:items-center md:gap-25'>
            <h1 className='text-5xl font-bold'>Flash Sales</h1>
            <div className='flex items-center gap-2'>
              <div>
                <p className='font-bold'>Hours</p>
                <h1 className='text-5xl font-bold'>{timeLeft.hours}</h1>
              </div>
              <span className='text-3xl font-bold mt-5 text-[#DB4444]'>:</span>
              <div>
                <p className='font-bold'>Minutes</p>
                <h1 className='text-5xl font-bold'>{timeLeft.minutes}</h1>
              </div>
              <span className='text-3xl font-bold mt-5 text-[#DB4444]'>:</span>
              <div>
                <p className='font-bold'>Seconds</p>
                <h1 className='text-5xl font-bold'>{timeLeft.seconds}</h1>
              </div>
            </div>
          </div>
          <div className='md:flex hidden items-center gap-2'>
            <button className='bg-[#F5F5F5] rounded-full p-4' onClick={() => swiperRef.current?.slidePrev()}><MoveLeft /></button>
            <button className='bg-[#F5F5F5] rounded-full p-4' onClick={() => swiperRef.current?.slideNext()}><MoveRight /></button>
          </div>
        </div>
        <div className='my-5'>
          <Swiper
            slidesPerView={1}
            spaceBetween={5}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 50,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 60,
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {Array.isArray(data?.products) ? (
              data.products.map((e) => (
                <SwiperSlide>
                  <div key={e.id} className="product-card border rounded  w-64">
                    <div className="image-container relative">
                      <img
                        src={`https://store-api.softclub.tj/images/${e.image}`}
                        alt={e.productName}
                        className="w-full object-cover h-32 mx-auto"
                      />
                      <button
                        className="add-to-cart"
                        onClick={() => handleAddCart(e.id)}>Add to Cart</button>
                      <div className="absolute top-2 right-2 flex flex-col gap-2">
                        <button
                          onClick={() => handleWishlist(e)}
                          className="bg-white rounded-full p-2 shadow hover:scale-110 transition-transform"
                        >
                          <Heart
                            size={20}
                            className={`transition-colors duration-300 ${wishlistIds.includes(e.id)
                              ? "fill-red-500 text-red-500"
                              : "text-gray-400"
                              }`}
                          />
                        </button>
                        <Link to={`/productsdetail/${e.id}`} className="bg-white rounded-full p-2 shadow">
                          <Eye className="w-5 h-5 text-blue-600" />
                        </Link>
                      </div>
                    </div>

                    <div className="info mt-3 text-start">
                      <h1 className="text-lg font-semibold">{e.productName}</h1>
                      {e.hasDiscount ? (
                        <div className='flex gap-3 items-end'>
                          <div className="flex justify-center  items-baseline">
                            <span className="text-red-600 font-bold">$</span>
                            <NumberTicker
                              value={
                                e?.price > 4000
                                  ? (Number(e?.price.toString().slice(0, 4)) || 0)
                                  : (Number(e?.price) || 0)
                              }
                              className="text-red-600 font-bold"
                            />
                          </div>
                          <div>
                            <span className='text-gray-400'>$</span>
                            <NumberTicker
                              value={
                                e?.discountPrice > 4000
                                  ? (Number(e?.discountPrice.toString().slice(0, 4)) || 0)
                                  : (Number(e?.discountPrice) || 0)
                              }
                              className="line-through text-gray-500"
                            />
                          </div>
                        </div>
                      ) : (
                        <p className="text-blue-600 font-bold">${e.price}</p>
                      )}
                      <p className="text-xs text-gray-400">{e.categoryName}</p>
                      <Rating
                        value={4}
                        max={5}
                        className="my-rating"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <div className='flex items-center justify-center mt-10'>
                <p className='font-bold text-2xl'>Маълумот ёфт нашуд...</p>
              </div>
            )}
          </Swiper>
        </div>
        <div className='flex py-5 justify-center'>
          <button className='bg-[#DB4444] rounded-sm px-3 py-2 text-white' onClick={() => naviget('/products')}>View All Products</button>
        </div>
      </section>
      <section className='my-8'>
        <div className='text-[#DB4444]  flex items-center gap-2'>
          <div className='bg-[#DB4444] rounded-lg  py-2 px-1'>O</div>
          <p className='font-bold text-xl'>Categories</p>
        </div>
        <div className='flex md:my-0 my-5 md:items-center md:flex-row flex-col justify-between'>
          <div className='flex md:flex-row flex-col md:items-center md:gap-25'>
            <h1 className='text-4xl font-bold'>Browse By Category</h1>
          </div>
          <div className='md:flex hidden items-center gap-2'>
            <button className='bg-[#F5F5F5] rounded-full p-4' onClick={() => swiperRef2.current?.slidePrev()}><MoveLeft /></button>
            <button className='bg-[#F5F5F5] rounded-full p-4' onClick={() => swiperRef2.current?.slideNext()}><MoveRight /></button>
          </div>
        </div>
        <div className='my-5'>
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            onSwiper={(swiper) => (swiperRef2.current = swiper)}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {Array.isArray(isCategoria) ? (
              isCategoria.map((e) => (
                <SwiperSlide key={e.id}>
                  <div

                    className='border hover:bg-[#DB4444] transition-colors duration-500 hover:text-white rounded-sm py-5 px-3 w-40 h-30 flex flex-col items-center justify-center'
                  >
                    <span className='text-[17px] font-bold text-center'>
                      {e.subCategoryName}
                    </span>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <div className='flex items-center justify-center mt-10'>
                <p className='font-bold text-2xl'>Маълумот ёфт нашуд...</p>
              </div>
            )}
          </Swiper>
        </div>
        <div className='flex md:my-0 my-5 md:items-center md:flex-row flex-col justify-between'>
          <h1 className='text-4xl font-bold'>Best Selling Products</h1>
          <button className='bg-[#DB4444] px-3 py-2 rounded-sm text-white' onClick={() => naviget('/products')}>View All</button>
        </div>
        <div className='my-5'>
          <Swiper
            slidesPerView={1}
            spaceBetween={2}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 50,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }}
            modules={[Pagination]}
            className="mySwiper">
            {Array.isArray(data?.products) ? (
              data.products.map((e) => (
                <SwiperSlide key={e.id}>
                  <div className="product-card border rounded ">
                    <div className="image-container relative">
                      <img
                        src={`https://store-api.softclub.tj/images/${e.image}`}
                        alt={e.productName}
                        className="w-full object-cover h-32 mx-auto"
                      />
                      <button className="add-to-cart" onClick={() => handleAddCart(e.id)}>Add to Cart</button>
                      <div className="absolute top-2 right-2 flex flex-col gap-2">
                        <button
                          onClick={() => handleWishlist(e)}
                          className="bg-white rounded-full p-2 shadow hover:scale-110 transition-transform"
                        >
                          <Heart
                            size={20}
                            className={`transition-colors duration-300 ${wishlistIds.includes(e.id)
                              ? "fill-red-500 text-red-500"
                              : "text-gray-400"
                              }`}
                          />
                        </button>
                        <Link to={`/productsdetail/${e.id}`} className="bg-white rounded-full p-2 shadow">
                          <Eye className="w-5 h-5 text-blue-600" />
                        </Link>
                      </div>
                    </div>

                    <div className="info mt-3 text-start">
                      <h1 className="text-lg font-semibold">{e.productName}</h1>
                      {e.hasDiscount ? (
                        <div className='flex gap-3 items-end'>
                          <div className="flex justify-center  items-baseline">
                            <span className="text-red-600 font-bold">$</span>
                            <NumberTicker
                              value={
                                e?.price > 4000
                                  ? (Number(e?.price.toString().slice(0, 4)) || 0)
                                  : (Number(e?.price) || 0)
                              }
                              className="text-red-600 font-bold"
                            />
                          </div>
                          <div>
                            <span className='text-gray-400'>$</span>
                            <NumberTicker
                              value={
                                e?.price > 4000
                                  ? (Number(e?.discountPrice.toString().slice(0, 4)) || 0)
                                  : (Number(e?.discountPrice) || 0)
                              }
                              className="line-through text-gray-500"
                            />
                          </div>
                        </div>
                      ) : (
                        <p className="text-blue-600 font-bold">${e.price}</p>
                      )}
                      <p className="text-xs text-gray-400">{e.categoryName}</p>
                      <Rating
                        value={4}
                        max={5}
                        className="my-rating"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <div className='flex items-center justify-center mt-10'>
                <p className='font-bold text-2xl'>Маълумот ёфт нашуд...</p>
              </div>
            )}
          </Swiper>
        </div >
      </section >
      <section className='bg-[#000000] flex md:flex-row flex-col items-center justify-between text-white rounded-sm md:p-10 p-5'>
        <aside className='flex flex-col items-start gap-5 md:w-[50%]'>
          <p className='text-[#00FF66]'>Categories</p>
          <h1 className='text-6xl'>Enhance Your Music Experience</h1>
          <div className='text-black text-center flex gap-2'>
            <div className='bg-white rounded-full w-18 h-17 p-2'>
              <p className='font-bold'>{timeLeft.hours}</p>
              <p>Hours</p>
            </div>
            <div className='bg-white rounded-full w-18 h-17 p-2'>
              <p className='font-bold'>{timeLeft.minutes}</p>
              <p>Minutes</p>
            </div>
            <div className='bg-white rounded-full w-18 h-17 p-1'>
              <p className='font-bold'>{timeLeft.seconds}</p>
              <p>Seconds</p>
            </div>
          </div>
          <button className='bg-[#00FF66] text-black rounded-sm px-8 py-3 font-bold'>Buy Now!</button>
        </aside>
        <aside className='md:w-[50%]'>
          <img src={img1} alt="" />
        </aside>
      </section>
      <section className='my-8'>
        <div className='text-[#DB4444]  flex items-center gap-2'>
          <div className='bg-[#DB4444] rounded-lg  py-2 px-1'>O</div>
          <p className='font-bold text-xl'>Our Products</p>
        </div>
        <div className='flex md:my-0 my-5 md:items-center md:flex-row flex-col justify-between'>
          <div className='flex md:flex-row flex-col md:items-center md:gap-25'>
            <h1 className='text-4xl font-bold'>Explore Our Products</h1>
          </div>
        </div>

        <div className='my-5 grid md:grid-cols-4 grid-cols-1  justify-items-center md:gap-3'>
          {Array.isArray(data?.products) ? (
            data.products.map((e) => (
              <div key={e.id} className="product-card border rounded  w-64">
                <div className="image-container relative">
                  <img
                    src={`https://store-api.softclub.tj/images/${e.image}`}
                    alt={e.productName}
                    className="w-full object-cover h-32 mx-auto"
                  />
                  <div>
                    <button className="add-to-cart" onClick={() => handleAddCart(e.id)}>Add to Cart</button>
                  </div>
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <button
                      onClick={() => handleWishlist(e)}
                      className="bg-white rounded-full p-2 shadow hover:scale-110 transition-transform"
                    >
                      <Heart
                        size={20}
                        className={`transition-colors duration-300 ${wishlistIds.includes(e.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                          }`}
                      />
                    </button>
                    <Link to={`/productsdetail/${e.id}`} className="bg-white rounded-full p-2 shadow">
                      <Eye className="w-5 h-5 text-blue-600" />
                    </Link>
                  </div>
                </div>

                <div className="info mt-3 text-start">
                  <h1 className="text-lg font-semibold">{e.productName}</h1>
                  {e.hasDiscount ? (
                    <div className='flex gap-3 items-end'>
                      <div className="flex justify-center  items-baseline">
                        <span className="text-red-600 font-bold">$</span>
                        <NumberTicker
                          value={
                            e?.price > 4000
                              ? (Number(e?.price.toString().slice(0, 4)) || 0)
                              : (Number(e?.price) || 0)
                          }
                          className="text-red-600 font-bold"
                        />
                      </div>
                      <div>
                        <span className='text-gray-400'>$</span>
                        <NumberTicker
                          value={
                            e?.price > 4000
                              ? (Number(e?.discountPrice.toString().slice(0, 4)) || 0)
                              : (Number(e?.discountPrice) || 0)
                          }
                          className="line-through text-gray-500"
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-blue-600 font-bold">${e.price}</p>
                  )}
                  <p className="text-xs text-gray-400">{e.categoryName}</p>
                  <Rating
                    value={4}
                    max={5}
                    className="my-rating"
                  />
                </div>
              </div>
            ))
          ) : (
            <p>Маълумот ёфт нашуд...</p>
          )}
        </div>
        <div className='flex justify-center'>
          <button className='px-5 py-2 rounded-sm text-white bg-[#DB4444]' onClick={() => naviget('/products')}>View All Products</button>
        </div>
      </section>
      <section>
        <div className='text-[#DB4444]  flex items-center gap-2'>
          <div className='bg-[#DB4444] rounded-lg  py-2 px-1'>O</div>
          <p className='font-bold text-xl'>Featured</p>
        </div>
        <h1 className='text-4xl font-bold'>New Arrival</h1>
        <div className='flex md:flex-row flex-col gap-1'>
          <aside
            style={{
              backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0)), url('${img5}')`
            }}
            className='md:w-[50%] bg-black p-8 text-white bg-cover bg-center md:h-150 flex flex-col justify-end rounded-lg'>
            <div className='max-w-62.5 space-y-2'>
              <h1 className='text-3xl font-bold tracking-wider'>PlayStation 5</h1>
              <p className='text-sm text-gray-200'>
                Black and White version of the PS5 coming out on sale.
              </p>
              <button className='mt-2 font-semibold border-b-2 border-white w-fit hover:text-gray-300 hover:border-gray-300 transition-all'>
                Shop Now
              </button>
            </div>
          </aside>
          <aside className='flex flex-col gap-1 md:w-[50%]'>
            <div
              style={{
                backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0)), url('${img6}')`
              }}
              className=' bg-black p-8 text-white bg-cover bg-center md:h-75  w-full flex flex-col justify-end rounded-lg'>
              <h1 className='text-2xl font-bold'>Women’s Collections</h1>
              <p>Featured woman collections that give you another vibe.</p>
              <h1>Shop Now</h1>
            </div>
            <div className='flex md:flex-row flex-col gap-2'>
              <div style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0)), url('${img7}')` }}
                className='md:w-[50%] bg-black p-8 text-white bg-cover bg-center md:h-75 flex flex-col justify-end rounded-lg'>
                <h1 className='text-2xl font-bold'>PlayStation 5</h1>
                <p>Black and White version of the PS5 coming out on sale.</p>
                <h1>Shop Now</h1>
              </div>
              <div style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0)), url('${img8}')` }}
                className='md:w-[50%] bg-black p-8 text-white bg-cover bg-center md:h-75 w-full flex flex-col justify-end rounded-lg'>
                <h1 className='text-2xl font-bold'>PlayStation 5</h1>
                <p>Black and White version of the PS5 coming out on sale.</p>
                <h1>Shop Now</h1>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <section className='flex md:flex-row flex-col md:items-start md:gap-0 gap-15 justify-between my-20'>
        <div className='flex flex-col items-center gap-2'>
          <img src={img2} alt="" />
          <h1 className='text-2xl font-bold'>FREE AND FAST DELIVERY</h1>
          <p>Free delivery for all orders over $140</p>
        </div>
        <div className='flex flex-col items-center gap-2'>
          <img src={img3} alt="" />
          <h1 className='text-2xl font-bold'>24/7 CUSTOMER SERVICE</h1>
          <p>Friendly 24/7 customer support</p>
        </div>
        <div className='flex flex-col items-center gap-2'>
          <img src={img4} alt="" />
          <h1 className='text-2xl font-bold'>MONEY BACK GUARANTEE</h1>
          <p>We reurn money within 30 days</p>
        </div>
      </section>
    </main >
  )
}

export default Home