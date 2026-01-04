import { Link, Outlet, useNavigate } from 'react-router-dom'
import img1 from "../assets/Group 1116606595 (1).png"
import img4 from "../assets/Frame 741.png"
import { Input } from '@/components/ui/input'
import { Heart, Menu, Moon, ShoppingCart, Sun, User } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { GetToken } from '@/utils/axios'
import { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTranslation } from 'react-i18next'

const Layout = () => {
  const [token, setToken] = useState(GetToken());
  const { setTheme } = useTheme()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setToken(GetToken());
    if (!token) {
      navigate('/')
    }
  }, []);

  const langLabel: Record<string, string> = {
    en: "EN",
    ru: "RU",
  };

  return (
    <>
      <header className='border'>
        <nav className='flex items-center max-w-337.5 m-auto md:px-0 px-3 justify-between py-2'>
          {/* Mobile menu */}
          <div className='md:hidden flex items-center gap-5'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline"><Menu /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuItem>
                  <Link to="/home">{t("link1")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/products">{t("link2")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/contact">{t("link3")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/about">{t("link4")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {!token && <Link to="/register">{t("link5")}</Link>}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/account">{t("profile")}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <h1 className='text-2xl font-bold'>Exclusive</h1>
          </div>

          {/* Логотип сайта */}
          <img className='md:block hidden' src={img1} alt="Logo" />

          {/* Desktop menu */}
          <div className='md:flex gap-6 hidden font-medium'>
            <Link to="/home">{t("link1")}</Link>
            <Link to="/products">{t("link2")}</Link>
            <Link to="/contact">{t("link3")}</Link>
            <Link to="/about">{t("link4")}</Link>
            <Link to="/notfound">{t("link6")}</Link>
            {!token && <Link to="/register">{t("link5")}</Link>}
          </div>

          {/* Right side */}
          <div className='flex gap-10 items-center'>
            <Input type="search" placeholder={t("search")} className='md:block w-70 hidden' />
            <div className="flex gap-5 items-center">
              <Link to={'/wishlist'}>
                <Heart className="w-5 h-5 text-red-500" />
              </Link>
              <Link to={'/cart'}>
                <ShoppingCart className="w-5 h-5 text-blue-600" />
              </Link>
              <Link to={'/account'}>
                <User className='md:block hidden' />
              </Link>

              {/* Theme switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all dark:scale-100 dark:rotate-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Language switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {langLabel[i18n.language] ?? "EN"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  <DropdownMenuItem>
                    <button onClick={() => i18n.changeLanguage("en")}>English</button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button onClick={() => i18n.changeLanguage("ru")}>Русский</button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className='bg-[#000000] text-[#FAFAFA] md:p-20 p-3'>
        <section className='max-w-337.5 m-auto flex md:flex-row flex-col justify-between'>
          <div className='flex flex-col gap-5'>
            <h1 className='md:text-[24px] text-3xl font-bold'>Exclusive</h1>
            <h1>Subscribe</h1>
            <p>Get 10% off your first order</p>
            <Input type="search" placeholder={t("search")} className='w-[243px]' /><br />
          </div>
          <div className='flex flex-col gap-5'>
            <h1 className='md:text-[20px] md:font-black text-3xl'>Support</h1>
            <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
            <p>exclusive@gmail.com</p>
            <p>+88015-88888-9999</p>
          </div><br />
          <div className='flex md:gap-25 gap-25 flex-row'>
            <ul className='flex flex-col gap-5'>
              <li className='text-[20px] font-bold'>Account</li>
              <li>{t("account")}</li>
              <li>{t("cart")}</li>
              <li>{t("wishlist")}</li>
              <li>Shop</li>
            </ul>
            <ul className='flex flex-col gap-5'>
              <li className='text-[20px] font-bold'>Quick Link</li>
              <li>Privacy Policy</li>
              <li>Terms Of Use</li>
              <li>FAQ</li>
              <li>{t("contact")}</li>
            </ul>
          </div>
          <div className='flex flex-col gap-5 md:mt-0 mt-10'>
            <h1 className='text-[20px]'>Social</h1>
            <img className='md:w-auto w-50' src={img4} alt="Social links" />
          </div>
        </section>
      </footer>
    </>
  )
}

export default Layout