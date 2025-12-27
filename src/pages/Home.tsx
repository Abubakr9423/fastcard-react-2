import imgIphone from '../assets/hero_endframe__cvklg0xk3w6e_large 2.png'
import LogoIphone from '../assets/1200px-Apple_gray_logo 1.png'
import { MoveLeft, MoveRight, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

const Home = () => {
  return (
    <main className='max-w-337.5 m-auto my-2 md:px-0 px-3'>
      <section className='flex md:flex-row flex-col'>
        <aside className='md:flex hidden flex-col items-start gap-3 w-[20%]'>
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
      </section>
    </main>
  )
}

export default Home