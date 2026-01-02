import { Input } from "@/components/ui/input"
import { api, useCards,  useDeleteToCardAll } from "@/store/store";
import { GetToken } from "@/utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/Frame 834.png";
import confetti from "canvas-confetti";

const Checkout = () => {
  const { isCards, getCategory } = useCards();
  const { DeleteToCardAll } = useDeleteToCardAll()
  const [Truee, setTruee] = useState(false);
  const naviget = useNavigate();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const token = GetToken();
    if (!token) {
      naviget("/");
      return;
    }
    getCategory();
  }, []);

  const handleClick = () => {
    const end = Date.now() + 3 * 1000 // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"]
    const frame = () => {
      if (Date.now() > end) return
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      })
      requestAnimationFrame(frame)
    }
    frame()
  }

  const totalPrice = Array.isArray(isCards)
    ? isCards.reduce((acc, e) => {
      const qty = quantities[e.id] ?? 1;
      return acc + e.product.price * qty;
    }, 0)
    : 0;

  return (
    <main className="max-w-337.5 m-auto my-8 md:px-0 px-4">

      <div >
        <h1>Product / View Cart / <span className="font-bold">CheckOut</span></h1>
      </div>
      <section className="my-3 flex md:flex-row flex-col md:gap-0 gap-3 items-start justify-between">
        <aside>
          <h1 className="text-3xl ">Billing Details</h1>
          <div className="flex shadow-md px-4 py-4 rounded-sm flex-col gap-2 mt-3">
            <Input placeholder="First name" type="text" />
            <Input type="text" placeholder="First name" className='md:block hidden' />
            <Input placeholder="Last name" type="text" />
            <Input placeholder="Street address" type="text" />
            <Input placeholder="Apartment, floor, etc. (optional)" type="text" />
            <Input placeholder="Town/City" type="text" />
            <Input placeholder="Phone number" type="text" />
            <Input placeholder="Email address" type="text" />
            <div className="flex items-center gap-1">
              <input type="checkbox" />
              <p className="font-semibold">Save this information for faster check-out next time</p>
            </div>
          </div>
        </aside>
        <aside className="md:w-[35%] w-full">
          {Array.isArray(isCards) && isCards.length > 0 ? (
            isCards.map((e) => {
              return (
                <div key={e.id} className="rounded-sm flex  w-full py-3 px-3 justify-between items-center">
                  <div className="flex items-center gap-3  px-2">
                    <img
                      className="w-15 h-15 rounded-full"
                      src={`${api}/images/${e?.product?.image}`}
                      alt=""
                    />
                    <span className="font-bold">{e?.product?.productName}</span>
                  </div>
                  <span className="font-bold">${e?.product?.price}</span>
                </div>
              );
            })
          ) : (
            <div className="text-center w-full shadow-sm rounded-sm">
              <p className="font-bold py-5 text-2xl">
                Маълумот ёфт нашуд...
              </p>
            </div>
          )}
          <div className="px-5 mt-3">
            <div className="flex items-center justify-between font-semibold">
              <p>Subtotal:</p>
              <p>${totalPrice}</p>
            </div>
            <div className="flex items-center justify-between font-semibold">
              <p>Shipping:</p>
              <p>Free</p>
            </div>
            <div className="flex items-center my-2 justify-between font-bold">
              <p className="text-2xl">Total:</p>
              <p>$1750</p>
            </div>
            <div className=" font-semibold">
              <div className="flex justify-between items-center">
                <div className="flex gap-1 items-center">
                  <input checked={Truee} onChange={() => setTruee(!Truee)} type="radio" />
                  <span>Bank</span>
                </div>
                <img src={img} alt="" />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-1 items-center">
                  <input checked={!Truee} onChange={() => setTruee(!Truee)} type="radio" />
                  <span>Cash on delivery</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-2 mt-3">
              <Input placeholder="Coupon Code" type="text" />
              <button className="border-2 text-red-500 border-red-500 rounded-sm px-5 py-1">Apply</button>
            </div>
            <div className="relative">
              <button className="border-2 my-3 text-white bg-red-500 rounded-sm px-5 py-2" onClick={() => {
                handleClick()
                DeleteToCardAll()
                naviget('/products')
              }}>Place Order</button>
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default Checkout