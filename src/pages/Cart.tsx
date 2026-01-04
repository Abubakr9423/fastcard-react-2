import { Input } from "@/components/ui/input";
import { api, useCards, useDeleteToCard, useDeleteToCardAll } from "@/store/store";
import { GetToken } from "@/utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


const Cart = () => {
  const { isCards, getCategory } = useCards();
  const { DeleteToCard } = useDeleteToCard();
  const { DeleteToCardAll } = useDeleteToCardAll()
  const naviget = useNavigate();

  const notify = () => toast("Wow so easy!");
  const notifyError = () => toast("Лутфан аввал бояд худро ба кайд гиред");

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const handleQuantityChange = (id: string, val: number) => {
    if (val > 0 && val <= 1000) {
      setQuantities((prev) => ({
        ...prev,
        [id]: val,
      }));
    }
  };

  useEffect(() => {
    const token = GetToken();
    if (!token) {
      naviget("/");
      notifyError()
      return;
    }
    getCategory();
  }, []);

  const totalPrice = Array.isArray(isCards)
    ? isCards.reduce((acc, e) => {
      const qty = quantities[e.id] ?? 1;
      return acc + e.product.price * qty;
    }, 0)
    : 0;

  return (
    <main className="max-w-337.5 m-auto my-10 md:px-0 px-3">
      <div>
        <h1>
          Home / <span className="font-bold">Cart</span>
        </h1>
      </div>
      <div className="w-full overflow-x-auto my-10 border rounded-sm">
        <table className="w-full min-w-[600px] text-center">
          <thead>
            <tr>
              <th className="text-start py-2 px-3">Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(isCards) && isCards.length > 0 ? (
              isCards.map((e) => {
                const qty = quantities[e.id] ?? 1;
                return (
                  <tr key={e.id} className="shadow-sm rounded-sm">
                    <td className="flex items-center gap-3 py-3 px-2">
                      <img
                        className="w-15 h-15 rounded-full"
                        src={`${api}/images/${e?.product?.image}`}
                        alt=""
                      />
                      <span className="font-bold">{e?.product?.productName}</span>
                    </td>
                    <td className="font-bold">${e?.product?.price}</td>
                    <td>
                      <input
                        className="w-20 px-2 py-1.5 border"
                        type="number"
                        min={1}
                        max={1000}
                        value={qty}
                        onChange={(ev) =>
                          handleQuantityChange(e.id, Number(ev.target.value))
                        }
                      />
                    </td>
                    <td>
                      <div className="flex gap-5 justify-center items-center">
                        <span className="font-bold">
                          ${e?.product?.price * qty}
                        </span>
                        <span onClick={() => DeleteToCard(e?.id)}>🗑️</span>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="text-center w-full shadow-sm rounded-sm">
                <td colSpan={4}>
                  <p className="font-bold py-5 text-2xl">
                    Маълумот ёфт нашуд...
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center md:my-8 my-3">
        <button className="border border-black rounded-sm md:px-4 px-2 py-2">
          Return To Shop
        </button>
        <div className="flex gap-2">
          <button className="border border-black rounded-sm md:px-4 px-2 py-2">
            Update Cart
          </button>
          <div>
            <button onClick={() => {
              DeleteToCardAll()
              notify()
            }} className="border-red-600 border-2 rounded-sm px-4 py-2 text-red-600">
              Remove all
              <ToastContainer />
            </button>
          </div>
        </div>
      </div>
      <div className="flex md:flex-row  flex-col justify-between items-start">
        <div className="flex gap-1">
          <Input
            type="text"
            className="md:w-50 w-69 border border-black"
            placeholder="Coupon Code"
          />
          <button className="border border-black rounded-sm px-4 py-1">
            Apply
          </button>
        </div>
        <div className="flex flex-col my-2 rounded-sm border-black border w-90 px-5 py-3 gap-2">
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
            <button className="rounded-sm px-5 py-2 bg-red-600 text-white" onClick={() => naviget('/checkout')}>Procees to checkout</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;