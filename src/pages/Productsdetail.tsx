import { axiosRequest, GetToken } from "@/utils/axios";
import { Eye, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addToWishlist, useAddToCards, useProductStore } from "@/store/store";
import Rating from "@mui/material/Rating";
import { toast, ToastContainer } from "react-toastify";
import "../App.css"

const ProductsDetail = () => {
  const { id } = useParams();
  const [info, setInfo] = useState<any>(null);
  const { fetchProducts } = useProductStore((state) => state);
  const data1 = useProductStore((state) => state.data);

  async function getById() {
    try {
      const { data } = await axiosRequest.get(`Product/get-product-by-id?id=${id}`);

      setInfo(data.data);
    } catch (error) {
      console.error(error);
    }
  }
  const { AddToCard } = useAddToCards();
  const naviget = useNavigate()

  useEffect(() => {
    const token = GetToken();
    if (!token) {
      naviget('/');
      return;
    }
    fetchProducts()
    if (id) getById()
  }, [id, AddToCard]);

  console.log(info);


  const [imgidx, setimgidx] = useState(0)



  return (
    <div className="flex flex-col items-center justify-center">
      {info && (
        <div className="flex md:flex-row flex-col justify-center md:gap-10 gap-5 items-center md:p-20 p-4 w-full">
          <div className="hidden md:flex md:flex-col gap-5">
            {info.images?.map((e: any, idx: any) => (
              <div key={idx} className="md:w-42.5 md:h-34.5 rounded-lg bg-[#F5F5F5] overflow-hidden cursor-pointer">
                <img
                  src={`https://store-api.softclub.tj/images/${e.images}`}
                  alt={`Product ${idx}`}
                  className="w-full h-full object-cover"
                  onClick={() => setimgidx(idx)}
                />
              </div>
            ))}
          </div>

          <div className="w-full max-w-[550px] md:w-205 md:h-150 aspect-square md:aspect-auto rounded-lg flex justify-center items-center bg-[#F5F5F5] overflow-hidden">
            {info.images?.[imgidx] && (
              <img
                src={`https://store-api.softclub.tj/images/${info.images[imgidx].images}`}
                alt="Product"
                className="w-full h-full  object-cover transform transition duration-300 md:hover:scale-105"
              />
            )}
          </div>

          <div className="flex flex-row md:hidden gap-2 overflow-x-auto w-full px-2 pb-2">
            {info.images?.map((e: any, idx: any) => (
              <div key={idx} className="min-w-[80px] h-20 rounded-md bg-[#F5F5F5] overflow-hidden border border-gray-200">
                <img
                  src={`https://store-api.softclub.tj/images/${e.images}`}
                  alt={`Thumb ${idx}`}
                  className="w-full h-full  object-cover"
                  onClick={() => setimgidx(idx)}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 w-full md:w-auto px-2">
            <h1 className="text-[20px] md:text-[24px] font-semibold">{info?.productName}</h1>
            <h1 className="font-normal text-[14px] text-gray-600 md:w-93.25">{info?.description}</h1>
            <h1 className="font-bold text-[22px] md:text-[24px] text-[#DB4444]">${info?.price}</h1>

            <div className="text-sm font-medium">
              {info.quantity > 0 ? (
                <span className="text-green-600 font-semibold text-[14px]">Дар анбор: {info?.quantity}</span>
              ) : (
                <span className="text-red-600 font-semibold">Тамом шудааст</span>
              )}
            </div>

            <div className="flex gap-4 items-center">
              <h1 className="font-medium">Colors:</h1>
              <div
                className="w-6 h-6 rounded-full border border-gray-300 shadow-sm"
                style={{ backgroundColor: info?.color }}
              ></div>
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="font-medium text-[14px]">Size:</h1>
              <div className="flex gap-2">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <div key={size} className="w-10 h-9 rounded-md border border-gray-300 flex justify-center items-center hover:bg-[#DB4444] hover:text-white transition-all cursor-pointer text-sm">
                    {size}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-2">
              <div className="flex items-center">
                <button className="rounded-l-md w-12 h-11 border border-gray-300 flex justify-center items-center hover:bg-gray-100">-</button>
                <div className="w-14 h-11 border-t border-b border-gray-300 flex justify-center items-center font-bold text-[16px]">0</div>
                <button className="rounded-r-md w-12 h-11 border border-gray-300 flex justify-center items-center hover:bg-gray-100">+</button>
              </div>

              <div className="flex gap-2 w-full">
                <button
                  onClick={() => AddToCard(info?.id)}
                  className="flex-1 md:w-[165px] h-[44px] bg-[#DB4444] rounded-md text-white font-medium hover:bg-[#c13e3e] transition-colors active:scale-95"
                >
                  Buy now
                </button>
                <button onClick={() => {
                  addToWishlist(info)
                }} className="w-11 h-11 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 active:scale-90">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )
      }

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 w-full max-w-[1200px]">
        {Array.isArray(data1?.products) ? (
          data1.products.map((e) => (
            <div key={e.id} className="group border rounded-xl overflow-hidden bg-white dark:bg-[#1a1a1a] shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-square bg-[#F5F5F5] flex items-center justify-center">
                <img
                  src={`https://store-api.softclub.tj/images/${e.image}`}
                  alt={e.productName}
                  className="w-full h-full object-cover"
                />
                <button
                  className="absolute bottom-0 left-0 w-full bg-black text-white py-2 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium"
                  onClick={() => { AddToCard(e.id) }}
                >
                  Add to Cart
                </button>
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <button onClick={() => addToWishlist(info)} className="bg-white rounded-full p-2 shadow-sm hover:bg-gray-100">
                    <Heart className="w-4 h-4 text-red-500" />
                  </button>
                  <Link to={`/productsdetail/${e.id}`} className="bg-white rounded-full p-2 shadow-sm hover:bg-gray-100">
                    <Eye className="w-4 h-4 text-blue-600" />
                  </Link>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h1 className="text-[16px] font-semibold truncate">{e.productName}</h1>
                <div className="flex items-center gap-2">
                  {e.hasDiscount ? (
                    <>
                      <span className="text-[#DB4444] font-bold text-lg">${e.price}</span>
                      <span className="text-gray-400 line-through text-sm">${e.discountPrice}</span>
                    </>
                  ) : (
                    <span className="text-[#DB4444] font-bold text-lg">${e.price}</span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{e.categoryName}</p>
                  <Rating value={4} max={5} className="scale-75 origin-right" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-400">
            <h1>No products available</h1>
          </div>
        )}
      </div>
      <ToastContainer />
    </div >
  );
};

export default ProductsDetail;