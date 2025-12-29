import { Link, Outlet } from 'react-router-dom'
import img1 from "../assets/Group 1116606595 (1).png"
import { Input } from '@/components/ui/input'
import img2 from "../assets/Wishlist (1).png"
import img3 from "../assets/Cart1 (1).png"
import img4 from "../assets/Frame 741.png"
import { Menu, User } from 'lucide-react'

const Layout = () => {
  return (
    <>
      <header className='border'>
        <nav className='flex items-center max-w-337.5 m-auto md:px-0 px-3  justify-between py-2'>
          <div className='md:hidden flex items-center gap-5'>
            <Menu />
            <h1 className='text-2xl font-bold'>Exclusive</h1>
          </div>
          <img className='md:block hidden' src={img1} alt="" />
          <div className='md:flex gap-6  hidden font-medium'>
            <Link to="/home">Home</Link>
            <Link to="/products">Product</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About</Link>
            <Link to="/register">Sign Up</Link>
          </div>
          <div className='flex gap-5 items-center'>
            <Input type="search" placeholder='search' className='md:block w-70 hidden' />
            <img className='md:block hidden' src={img2} alt="" />
            <img src={img3} alt="" />
            <Link to={'/account'}>
              <User className='md:block hidden' />
            </Link>
          </div>
        </nav>
      </header >
      <div>
        <Outlet />
      </div>
      <footer className='bg-[#000000] text-[#FAFAFA]  md:p-20 p-3'>
        <section className='max-w-337.5 m-auto  flex md:flex-row flex-col justify-between'>
          <div className='flex flex-col gap-5'>
            <h1 className='md:text-[24px] text-3xl font-bold'>Exclusive</h1>
            <h1>Subscribe</h1>
            <p>Get 10% off your first order</p>
            <Input type="search" placeholder='search' className='w-[243px]' /><br />
          </div>
          <div className='flex flex-col gap-5'>
            <h1 className='md:text-[20px] md:font-black text-3xl'>Support</h1>
            <p className='md:w-auto w-50'>111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</p>
            <p>exclusive@gmail.com</p>
            <p>+88015-88888-9999</p>
          </div><br />
          <div className='flex md:gap-25 gap-25 flex-row '>
            <ul className='flex flex-col gap-5'>
              <li className='text-[20px] font-bold'>Account</li>
              <li>My Account</li>
              <li>Cart</li>
              <li>Wishlist</li>
              <li>Shop</li>
            </ul>
            <ul className='flex flex-col gap-5'>
              <li className='text-[20px] font-bold'>Quick Link</li>
              <li>Privacy Policy</li>
              <li>Terms Of Use</li>
              <li>FAQ</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className='flex flex-col gap-5 md:mt-0 mt-10'>
            <h1 className='text-[20px]'>Social </h1>
            <img className='md:w-auto w-50' src={img4} alt="" />
          </div>
        </section>

      </footer>
    </>
  )
}

export default Layout