import { Link, Outlet } from 'react-router-dom'
import img1 from "../assets/Group 1116606595 (1).png"
import { Input } from '@/components/ui/input'
import img2 from "../assets/Wishlist (1).png"
import img3 from "../assets/Cart1 (1).png"
import img4 from "../assets/Frame 741.png"

const Layout = () => {
  return (
    <>
      <header>
        <nav className='flex items-center justify-evenly'>
          <img src={img1} alt="" />
          <div className='flex gap-5'>
            <Link to="/home">Home</Link>
            <Link to="/products">Product</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About</Link>
            <Link to="/sign">Sign Up</Link>
          </div>
          <div className='flex gap-5 items-center'>
            <Input type="search" placeholder='search' className='w-[243px]' />
            <img src={img2} alt="" />
            <img src={img3} alt="" />
          </div>
        </nav>
      </header>
      <div>
        <Outlet />
      </div>
      <footer className='bg-[#000000] text-[#FAFAFA] flex justify-evenly p-20 '>
        <div className='flex flex-col gap-5'>
          <h1 className='text-[24px]'>Exclusive</h1>
          <h1>Subscribe</h1>
          <p>Get 10% off your first order</p>
          <Input type="search" placeholder='search' className='w-[243px]' />
        </div>
        <div className='flex flex-col gap-5'>
          <h1 className='text-[20px]'>Support</h1>
          <p>111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</p>
          <p>exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
        </div>
        <ul className='flex flex-col gap-5'>
          <li className='text-[20px]'>Account</li>
          <li>My Account</li>
          <li>Cart</li>
          <li>Wishlist</li>
          <li>Shop</li>
        </ul>
        <ul className='flex flex-col gap-5'>
          <li className='text-[20px]'>Quick Link</li>
          <li>Privacy Policy</li>
          <li>Terms Of Use</li>
          <li>FAQ</li>
          <li>Contact</li>
        </ul>
        <div className='flex flex-col gap-5'>
          <h1 className='text-[20px]'>Social </h1>
          <img src={img4} alt="" />
        </div>
      </footer>
    </>
  )
}

export default Layout