import { axiosRequest, GetToken } from "@/utils/axios";
import { Eye, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import img1 from "../assets/Frame 911.png"
import { useAddToCards, useProductStore } from "@/store/store";
import { MorphingText } from "@/components/ui/morphing-text";
import Rating from "@mui/material/Rating";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ToastContainer } from "react-toastify";
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
        <div className="flex justify-center gap-10 items-center p-20">
          <div className="flex flex-col justify-evenly gap-5">
            {info.images?.map((e: any, idx: any) => (
              <div key={idx} className="w-[170px] object-cover h-[138px] rounded-[4px] bg-[#F5F5F5]">
                <img
                  src={`https://store-api.softclub.tj/images/${e.images}`}
                  alt={`Product ${idx}`}
                  className="w-full h-full object-cover"
                  onClick={() => setimgidx(idx)}
                />
              </div>
            ))}
            {/* <h1 className="w-[170px] h-[138px] rounded-[4px] bg-[#F5F5F5]"></h1>
            <h1 className="w-[170px] h-[138px] rounded-[4px] bg-[#F5F5F5]"></h1>
            <h1 className="w-[170px] h-[138px] rounded-[4px] bg-[#F5F5F5]"></h1>
            <h1 className="w-[170px] h-[138px] rounded-[4px] bg-[#F5F5F5]"></h1> */}
          </div>
          <div className="w-[500px] h-[600px] object-cover rounded-[4px] flex justify-center items-center bg-[#F5F5F5]">
            {info.images?.[imgidx] && (
              <img
                src={`https://store-api.softclub.tj/images/${info.images[imgidx].images}`}
                alt="Product"
                className="w-full h-full transform transition duration-300 hover:scale-105"
              />
            )}
          </div>
          <div className="flex flex-col justify-evenly gap-5">
            <h1 className="w-[302px] text-[24px] font-[500]">{info.productName}</h1>
            <h1 className="font-[400] text-[14px] w-[373px]">{info.description}</h1>
            <h1 className="font=[700] text-[24px]">{info.price}$</h1>
            {info.quantity > 0 ? `In stock: ${info.quantity}` : "Out of stock"}
            <div className="flex gap-5 items-center">
              <h1>Colors :</h1>
              <div className={`w-[20px] h-[20px] rounded-[50%] bg-[${info.color}]`}>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <h1>Size:</h1>
              <div className="w-[40px] h-[32px] rounded-[4px] border-[1px] border-[#00000080] flex justify-center items-center hover:bg-[#DB4444] hover:text-white transition-[1s]">
                XS
              </div>
              <div className="w-[40px] h-[32px] rounded-[4px] border-[1px] border-[#00000080] flex justify-center items-center hover:bg-[#DB4444] hover:text-white transition-[1s]">
                S
              </div>
              <div className="w-[40px] h-[32px] rounded-[4px] border-[1px] border-[#00000080] flex justify-center items-center hover:bg-[#DB4444] hover:text-white transition-[1s]">
                M
              </div>
              <div className="w-[40px] h-[32px] rounded-[4px] border-[1px] border-[#00000080] flex justify-center items-center hover:bg-[#DB4444] hover:text-white transition-[1s]">
                L
              </div>
              <div className="w-[40px] h-[32px] rounded-[4px] border-[1px] border-[#00000080] flex justify-center items-center hover:bg-[#DB4444] hover:text-white transition-[1s]">
                XL
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex">
                <button className="rounded-[4px] w-[40px] h-[44px] border-[#00000080] border-[1px] flex justify-center items-center">-</button>
                <button className="rounded-[4px] h-[44px] w-[80px] border-[1px] border-[#00000080] flex justify-center items-center">0</button>
                <button className="rounded-[4px]  w-[40px] h-[44px] border-[#00000080] border-[1px] flex justify-center items-center">+</button>
              </div>
              <div className="flex gap-2 items-center">
                <button onClick={() => AddToCard(info.id)} className="rounded-[4px] w-[165px] h-[44px] bg-[#DB4444] pt-[10px] pb-[10px] pl-[48px] pr-[48px] text-white">Buy now</button>
                <button className="w-[40px] h-[40px] border-[1px] border-[#00000080] rounded-[4px] flex items-center justify-center"><Heart></Heart></button>
              </div>
            </div>
            <img src={img1} alt="" />
          </div>
        </div>
      )}
      <div className="flex flex-wrap m-auto items-center ml-30">
        {Array.isArray(data1?.products) ? (
          data1.products.map((e) => (
            <div key={e.id} className="product-card border rounded  w-64">
              <div className="image-container relative">
                <img
                  src={`https://store-api.softclub.tj/images/${e.image}`}
                  alt={e.productName}
                  className="w-full object-cover h-32 mx-auto"
                />
                <div>
                  <button className="add-to-cart" onClick={() => { AddToCard(e.id) }}>Add to Cart</button>
                  <ToastContainer />
                </div>
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <button className="bg-white rounded-full p-2 shadow">
                    <Heart className="w-5 h-5 text-red-500" />
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
          <h1>no product</h1>
        )}
      </div>
    </div>
  );
};

export default ProductsDetail;