import imgIphone from '../assets/hero_endframe__cvklg0xk3w6e_large 2.png'
import LogoIphone from '../assets/1200px-Apple_gray_logo 1.png'
import img1 from '../assets/Frame 694.png'
import img2 from '../assets/Services.png'
import img3 from '../assets/Services (1).png'
import img4 from '../assets/Services (2).png'
import img5 from '../assets/ps5-slim-goedkope-playstation_large 1.png'
import img6 from '../assets/attractive-woman-wearing-hat-posing-black-background 1.png'
import img7 from '../assets/Frame 707.png'
import img8 from '../assets/652e82cd70aa6522dd785109a455904c.png'
import { MoveLeft, MoveRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useEffect } from 'react'
import Rating from '@/components/Rating'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../swiper.css';

import { Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom'
import { axiosRequest, GetToken } from '@/utils/axios'
import { useCategory, useProductStore } from '@/store/store'

const Home = () => {
  const { data, fetchProducts } = useProductStore();
  const { isCategoria, getCategory } = useCategory();

  const naviget = useNavigate()

  useEffect(() => {
    const token = GetToken();
    if (!token) {
      naviget('/');
      return;
    }
    fetchProducts();
    getCategory();
  }, [fetchProducts, getCategory, naviget]);

  return (
    <main className='max-w-337.5 m-auto my-2 md:px-0 px-3'>
      <section className='flex mt-5 mb-8 md:flex-row flex-col'>
        <aside className='md:flex hidden flex-col font-bold items-start gap-3 w-[20%]'>
          <select name="" id="">
            <option value="">Woman’s Fashion</option>
          </select>
          <select name="" id="">
            <option value="">Woman’s Fashion</option>
          </select>
          <p>Electronics</p>
          <p>Home & Lifestyle</p>
          <p>Medicine</p>
          <p>Sports & Outdoor</p>
          <p>Baby’s & Toys</p>
          <p>Groceries & Pets</p>
          <p>Health & Beauty</p>
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

        <aside className='bg-black text-white md:w-[80%] rounded-sm flex md:flex-row flex-col md:gap-0 gap-3  md:px-20 md:py-0 py-10  items-center justify-between'>
          <div className='flex flex-col justify-between gap-5'>
            <div className='flex items-center gap-2'>
              <img src={LogoIphone} alt="" />
              <h1 >iPhone 14 Series</h1>
            </div>
            <div>
              <h1 className='md:text-6xl text-2xl font-bold'>Up to 10% off Voucher</h1>
            </div>
            <div>
              <p className='text-2xl'>Shop Now {'->'}</p>
            </div>
          </div>
          <div className='md:w-140'>
            <img className='w-full' src={imgIphone} alt="" />
          </div>
        </aside>
      </section>
      <section className='my-5'>
        <div className='text-[#DB4444]  flex items-center gap-2'>
          <div className='bg-[#DB4444] rounded-[4px]  py-2 px-1'>O</div>
          <p className='font-bold text-xl'>Today’s</p>
        </div>
        <div className='flex md:my-0 my-5 md:items-center md:flex-row flex-col justify-between'>
          <div className='flex md:flex-row flex-col md:items-center md:gap-25'>
            <h1 className='text-5xl font-bold'>Flash Sales</h1>
            <div className='flex items-center gap-2'>
              <div>
                <p className='font-bold'>Days</p>
                <h1 className='text-5xl font-bold'>03</h1>
              </div>
              <span className='text-3xl font-bold mt-5 text-[#DB4444]'>:</span>
              <div>
                <p className='font-bold'>Hours</p>
                <h1 className='text-5xl font-bold'>23</h1>
              </div>
              <span className='text-3xl font-bold mt-5 text-[#DB4444]'>:</span>
              <div>
                <p className='font-bold'>Minutes</p>
                <h1 className='text-5xl font-bold'>19</h1>
              </div>
              <span className='text-3xl font-bold mt-5 text-[#DB4444]'>:</span>
              <div>
                <p className='font-bold'>Seconds</p>
                <h1 className='text-5xl font-bold'>19</h1>
              </div>
            </div>
          </div>
          <div className='md:flex hidden items-center gap-2'>
            <button className='bg-[#F5F5F5] rounded-full p-4'><MoveLeft /></button>
            <button className='bg-[#F5F5F5] rounded-full p-4'><MoveRight /></button>
          </div>
        </div>
        <div className='my-5'>
          <Swiper
            slidesPerView={4}
            spaceBetween={10}
            // pagination={{
            //   clickable: true,
            // }}
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
                slidesPerView: 5,
                spaceBetween: 60,
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {Array.isArray(data?.products) ? (
              data.products.map((e) => (
                <SwiperSlide>
                  <div key={e.id} className="product-card">
                    <div className="image-container">
                      <img src={`${axiosRequest}images/${e.image}`} alt={e.productName} />
                      <button className="add-to-cart">Add to Cart</button>
                    </div>
                    <div className="info">
                      <h1>{e.productName}</h1>
                      <p className="color">Color: {e.color}</p>
                      <div className='flex gap-2'>
                        <p className="price ">${e.price}</p>
                        <p className="line-through text-gray-400">${e.discountPrice}</p>
                      </div>
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
              <p>Маълумот ёфт нашуд...</p>
            )}
          </Swiper>
        </div>
        <div className='flex py-5 justify-center'>
          <button className='bg-[#DB4444] rounded-sm px-3 py-2 text-white' onClick={() => naviget('/products')}>View All Products</button>
        </div>
      </section>
      <section className='my-8'>
        <div className='text-[#DB4444]  flex items-center gap-2'>
          <div className='bg-[#DB4444] rounded-[4px]  py-2 px-1'>O</div>
          <p className='font-bold text-xl'>Categories</p>
        </div>
        <div className='flex md:my-0 my-5 md:items-center md:flex-row flex-col justify-between'>
          <div className='flex md:flex-row flex-col md:items-center md:gap-25'>
            <h1 className='text-4xl font-bold'>Browse By Category</h1>
          </div>
          <div className='md:flex hidden items-center gap-2'>
            <button className='bg-[#F5F5F5] rounded-full p-4'><MoveLeft /></button>
            <button className='bg-[#F5F5F5] rounded-full p-4'><MoveRight /></button>
          </div>
        </div>
        <div className='my-5'>
          <Swiper
            slidesPerView={7}
            spaceBetween={10}
            // pagination={{
            //   clickable: true,
            // }}
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
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {Array.isArray(isCategoria) ? (
              isCategoria.map((e) => (
                <SwiperSlide>
                  <div
                    key={e.id}
                    className='border hover:bg-[#DB4444] transition-colors duration-500 hover:text-white rounded-sm py-5 px-3 w-40 h-30 flex flex-col items-center justify-center'
                  >
                    <span className='text-[17px] font-bold text-center'>
                      {e.subCategoryName}
                    </span>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <p>Маълумот ёфт нашуд...</p>
            )}
          </Swiper>
        </div>
        <div className='flex md:my-0 my-5 md:items-center md:flex-row flex-col justify-between'>
          <h1 className='text-4xl font-bold'>Best Selling Products</h1>
          <button className='bg-[#DB4444] px-3 py-2 rounded-sm text-white'>View All</button>
        </div>
        <div className='my-5'>
          <Swiper
            slidesPerView={4}
            spaceBetween={10}
            // pagination={{
            //   clickable: true,
            // }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 60,
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {Array.isArray(data?.products) ? (
              data.products.map((e) => (
                <SwiperSlide>
                  <div key={e.id} className="product-card">
                    <div className="image-container">
                      <img src={`${api}images/${e.image}`} alt={e.productName} />
                      <button className="add-to-cart">Add to Cart</button>
                    </div>
                    <div className="info">
                      <h1>{e.productName}</h1>
                      <p className="color">Color: {e.color}</p>
                      <div className='flex gap-2'>
                        <p className="price ">${e.price}</p>
                        <p className="line-through text-gray-400">${e.discountPrice}</p>
                      </div>
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
              <p>Маълумот ёфт нашуд...</p>
            )}
          </Swiper>
        </div>
      </section>
      <section className='bg-[#000000] flex md:flex-row flex-col items-center justify-between text-white rounded-sm md:p-10 p-5'>
        <aside className='flex flex-col items-start gap-5 md:w-[50%]'>
          <p className='text-[#00FF66]'>Categories</p>
          <h1 className='text-6xl'>Enhance Your Music Experience</h1>
          <div className='text-black text-center flex gap-2'>
            <div className='bg-white rounded-full w-15 h-15 p-1'>
              <p className='font-bold'>23</p>
              <p>Hours</p>
            </div>
            <div className='bg-white rounded-full w-15 h-15 p-1'>
              <p className='font-bold'>23</p>
              <p>Hours</p>
            </div>
            <div className='bg-white rounded-full w-15 h-15 p-1'>
              <p className='font-bold'>23</p>
              <p>Hours</p>
            </div>
          </div>
          <button className='bg-[#00FF66] text-black rounded-sm px-5 py-2'>Buy Now!</button>
        </aside>
        <aside className='md:w-[50%]'>
          <img src={img1} alt="" />
        </aside>
      </section>
      <section className='my-8'>
        <div className='text-[#DB4444]  flex items-center gap-2'>
          <div className='bg-[#DB4444] rounded-[4px]  py-2 px-1'>O</div>
          <p className='font-bold text-xl'>Our Products</p>
        </div>
        <div className='flex md:my-0 my-5 md:items-center md:flex-row flex-col justify-between'>
          <div className='flex md:flex-row flex-col md:items-center md:gap-25'>
            <h1 className='text-4xl font-bold'>Explore Our Products</h1>
          </div>
        </div>

        <div className='my-5 grid md:grid-cols-4 grid-cols-1 gap-3'>
          {Array.isArray(data?.products) ? (
            data.products.map((e) => (
              <div key={e.id} className="product-card">
                <div className="image-container">
                  <img src={`${api}images/${e.image}`} alt={e.productName} />
                  <button className="add-to-cart">Add to Cart</button>
                </div>
                <div className="info">
                  <h1>{e.productName}</h1>
                  <p className="color">Color: {e.color}</p>
                  <div className='flex gap-2'>
                    <p className="price ">${e.price}</p>
                    <p className="line-through text-gray-400">${e.discountPrice}</p>
                  </div>
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
          <button className='px-5 py-2 rounded-sm text-white bg-[#DB4444]'>View All Products</button>
        </div>
      </section>
      <section>
        <div className='text-[#DB4444]  flex items-center gap-2'>
          <div className='bg-[#DB4444] rounded-[4px]  py-2 px-1'>O</div>
          <p className='font-bold text-xl'>Featured</p>
        </div>
        <h1 className='text-4xl font-bold'>New Arrival</h1>
        <div className='flex gap-1'>
          <aside
            style={{
              backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0)), url('${img5}')`
            }}
            className='w-[50%] bg-black p-8 text-white bg-cover bg-center h-[600px] flex flex-col justify-end rounded-lg'>
            <div className='max-w-[250px] space-y-2'>
              <h1 className='text-3xl font-bold tracking-wider'>PlayStation 5</h1>
              <p className='text-sm text-gray-200'>
                Black and White version of the PS5 coming out on sale.
              </p>
              <button className='mt-2 font-semibold border-b-2 border-white w-fit hover:text-gray-300 hover:border-gray-300 transition-all'>
                Shop Now
              </button>
            </div>
          </aside>
          <aside className='flex flex-col gap-1 w-[50%]'>
            <div
              style={{
                backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0)), url('${img6}')`
              }}
              className='w-[50%] bg-black p-8 text-white bg-cover bg-center h-75  w-full flex flex-col justify-end rounded-lg'>
              <h1 className='text-2xl font-bold'>Women’s Collections</h1>
              <p>Featured woman collections that give you another vibe.</p>
              <h1>Shop Now</h1>
            </div>
            <div className='flex gap-2'>
              <div style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0)), url('${img7}')` }}
                className='w-[50%] bg-black p-8 text-white bg-cover bg-center h-75 w-full flex flex-col justify-end rounded-lg'>
                <h1 className='text-2xl font-bold'>PlayStation 5</h1>
                <p>Black and White version of the PS5 coming out on sale.</p>
                <h1>Shop Now</h1>
              </div>
              <div style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0)), url('${img8}')` }}
                className='w-[50%] bg-black p-8 text-white bg-cover bg-center h-75 w-full flex flex-col justify-end rounded-lg'>
                <h1 className='text-2xl font-bold'>PlayStation 5</h1>
                <p>Black and White version of the PS5 coming out on sale.</p>
                <h1>Shop Now</h1>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <section className='flex items-start justify-between my-20'>
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
    </main>
  )
}

export default Home