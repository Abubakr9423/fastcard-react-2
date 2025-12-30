import { Input } from "@/components/ui/input";
import { api, useCards, useDeleteToCard } from "@/store/store";
import { useEffect, useState } from "react";

const Cart = () => {
  const { isCards, getCategory } = useCards();
  const { DeleteToCard } = useDeleteToCard();
  const [Value, setValue] = useState(1)

  useEffect(() => {
    getCategory()
  }, [])

  const totalPrice = isCards.reduce((acc, e) => acc + e.product.price, 0);
  return (
    <main className="max-w-337.5 m-auto my-10">
      <div>
        <h1>Home / <span className="font-bold">Cart</span></h1>
      </div>
      <table className="my-10 w-full text-center  rounded-sm">
        <thead className=" ">
          <tr>
            <th className="text-start py-2 px-3">Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(isCards) && isCards.length > 0 ? (
            isCards?.map((e) => (
              <tr key={e.id} className="shadow-sm rounded-sm ">

                <td className="flex items-center gap-3 py-3 px-2">
                  <img className="w-15 h-15 rounded-full" src={`${api}/images/${e?.product?.image}`} alt="" />
                  <span className="font-bold">{e?.product?.productName}</span>
                </td>
                <td className="font-bold">${e?.product?.price}</td>
                <td>
                  <input className="w-20 px-2 py-1.5 border" value={Value} min={1} max={1000} onChange={(e) => {
                    const val = Number(e.target.value)
                    if (Number(e.target.value) > 0 && Number(e.target.value) <= 1000) {
                      setValue(val)
                    }
                  }} type="number" />
                </td>
                <td>
                  <div className="flex gap-5  justify-center items-center">
                    <span className="font-bold">${`${e?.product?.price * Value}`}</span>
                    <span onClick={() => DeleteToCard(e?.id)}>🗑️</span>
                  </div>
                </td>
              </tr>
            ))) : (
            <tr className='text-end  w-full shadow-sm rounded-sm'>
              <p className='font-bold py-5 text-2xl'>Маълумот ёфт нашуд...</p>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-between items-center my-8">
        <button className=" border border-black rounded-sm px-4 py-2">Return To Shop</button>
        <div className="flex gap-2">
          <button className="border border-black rounded-sm px-4 py-2">Update Cart</button>
          <button className="border-red-600 border-2 rounded-sm px-4 py-2 text-red-600">Remove all</button>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div className="flex gap-1">
          <Input type="text" className="w-50 border border-black" placeholder="Coupon Code" />
          <button className=" border border-black rounded-sm px-4 py-1">Apply</button>
        </div>
        <div className="flex flex-col rounded-sm border-black border w-90 px-5 py-3 gap-2">
          <h1 className="font-semibold text-2xl">Cart Total</h1>
          <div className="flex justify-between items-center">
            <p className="font-mono">Subtotal:</p>
            <p className="font-mono">${totalPrice}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-mono">Shipping:</p>
            <p className="font-mono">Free</p>
          </div>
          <div className="flex justify-between border-t-2 py-2 items-center">
            <p className="font-bold text-2xl">Total:</p>
            <p className="font-mono text-2xl">${totalPrice}</p>
          </div>
          <div>
            <button className="rounded-sm px-5 py-2">Procees to checkout</button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Cart