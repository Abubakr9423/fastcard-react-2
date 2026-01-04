import { axiosRequest, GetToken } from "@/utils/axios";
import { Eye, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addToWishlist, toggleWishlist, useAddToCards, useProductStore } from "@/store/store";
import Rating from "@mui/material/Rating";
import { toast, ToastContainer } from "react-toastify";
import "../App.css"
import { useTheme } from "@emotion/react";
import { NumberTicker } from "@/components/ui/number-ticker";

const ProductsDetail = () => {
  const { id } = useParams();
  const [info, setInfo] = useState<any>(null);
  const { fetchProducts } = useProductStore((state) => state);
  const { theme } = useTheme()
  const data1 = useProductStore((state) => state.data);
  const errorForBuy = () => toast("Бубахшед шумо то хол худро ба кайд нагирифтаuд!");
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);


  async function getById() {
    try {
      const { data } = await axiosRequest.get(`Product/get-product-by-id?id=${id}`);

      setInfo(data.data);
    } catch (error) {
      console.error(error);
    }
  }
  const { AddToCard } = useAddToCards();

  useEffect(() => {

    fetchProducts()
    if (id) getById()
  }, [id, AddToCard]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistIds(data.map((item: any) => item.id));
  }, []);

  const handleWishlist = (product: any) => {
    toggleWishlist(product);
    const data = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistIds(data.map((item: any) => item.id));
  };

  const token = GetToken();
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistIds(data.map((item: any) => item.id));
  }, []);


  console.log(info);

  const handleAddCart = (productId: number) => {
    if (token) {
      AddToCard(productId);
    } else {
      errorForBuy();
      setTimeout(() => {
        navigate('/');
      }, 4000);
    }
  };


  const [imgidx, setimgidx] = useState(0)



  return (
    <div className="flex flex-col items-center justify-center">
      {info && (
        <div className="flex md:flex-row flex-col justify-center md:gap-10 gap-5 items-center md:p-20 p-4 w-full">
          <div className="hidden md:flex md:flex-col gap-5">
            {info.images?.map((e: any, idx: any) => (
              <div key={idx} className="md:w-42.5 md:h-34.5 rounded-lg bg-[#F5F5F5] dark:bg-[#1a1a1a] overflow-hidden cursor-pointer">
                <img
                  src={`https://store-api.softclub.tj/images/${e.images}`}
                  alt={`Product ${idx}`}
                  className="w-full h-full object-cover"
                  onClick={() => setimgidx(idx)}
                />
              </div>
            ))}
          </div>

          <div className="w-full max-w-[550px] md:w-205 md:h-150 aspect-square md:aspect-auto rounded-lg flex justify-center items-center bg-[#F5F5F5] dark:bg-[#1a1a1a] overflow-hidden">
            {info.images?.[imgidx] && (
              <img
                src={`https://store-api.softclub.tj/images/${info.images[imgidx].images}`}
                alt="Product"
                className="w-full h-full object-contain md:object-cover transform transition duration-300 md:hover:scale-105"
              />
            )}
          </div>

          <div className="flex flex-row md:hidden gap-2 overflow-x-auto w-full px-2 pb-2">
            {info.images?.map((e: any, idx: any) => (
              <div key={idx} className="min-w-[80px] h-20 rounded-md bg-[#F5F5F5] dark:bg-[black] overflow-hidden border border-gray-200">
                <img
                  src={`https://store-api.softclub.tj/images/${e.images}`}
                  alt={`Thumb ${idx}`}
                  className="w-full h-full object-cover"
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
                  <button
                    onClick={() => handleWishlist(info)}
                    className="w-11 h-11 border border-gray-300 rounded-md flex items-center justify-center"
                  >
                    <Heart
                      className={`w-5 h-5 ${wishlistIds.includes(info?.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                        }`}
                    />
                  </button>

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
            <div
              key={e.id}
              className="product-card rounded
                   bg-white dark:bg-black 
                   text-neutral-900 dark:text-neutral-100 
                   shadow-sm overflow-hidden group">
              <div className="image-container relative">
                <img
                  src={`https://store-api.softclub.tj/images/${e.image}`}
                  alt={e.productName}
                  className="w-full object-cover h-32 mx-auto rounded-t"
                />

                <button
                  className="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 
                       w-full py-2 rounded bg-black text-white 
                       hover:bg-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800 
                       transition-all duration-300"
                  onClick={() => handleAddCart(e.id)}>
                  Add to Cart
                </button>

                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <button
                    onClick={() => handleWishlist(e)}
                    className="bg-white dark:bg-neutral-900 
                         rounded-full p-2 shadow hover:scale-110 transition-transform"
                  >
                    <Heart
                      size={20}
                      className={`transition-colors duration-300 ${wishlistIds.includes(e.id)
                        ? "fill-red-500 text-red-500"
                        : "text-neutral-400 dark:text-neutral-300"
                        }`}
                    />
                  </button>
                  <Link
                    to={`/productsdetail/${e.id}`}
                    className="bg-white dark:bg-neutral-900 
                         rounded-full p-2 shadow"
                  >
                    <Eye className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />
                  </Link>
                </div>
              </div>

              <div className="info mt-3 text-start">
                <h1 className="text-lg font-semibold  dark:text-blue-800">{e.productName}</h1>

                {e.hasDiscount ? (
                  <div className="flex gap-3 items-end">
                    <div className="flex justify-center items-baseline">
                      <span className="text-red-600 dark:text-blue-800 font-bold">$</span>
                      <NumberTicker
                        value={
                          e?.price > 4000
                            ? Number(e?.price.toString().slice(0, 4)) || 0
                            : Number(e?.price) || 0
                        }
                        className="text-red-600 font-bold  dark:text-blue-800"
                      />
                    </div>
                    <div>
                      <span className="text-gray-400 dark:text-gray-500">$</span>
                      <NumberTicker
                        value={
                          e?.discountPrice > 4000
                            ? Number(e?.discountPrice.toString().slice(0, 4)) || 0
                            : Number(e?.discountPrice) || 0
                        }
                        className="line-through text-gray-500 dark:text-gray-400 opacity-80"
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-blue-600 dark:text-blue-400 font-bold">
                    ${e.price}
                  </p>
                )}

                <p className="text-xs text-gray-400 dark:text-gray-500">
                  {e.categoryName}
                </p>

                <Rating value={4} max={5} className="my-rating" />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-400">
            <h1>No products available</h1>
          </div>
        )}
      </div>
      <ToastContainer
        theme="colored"
      />
    </div >
  );
};

export default ProductsDetail;