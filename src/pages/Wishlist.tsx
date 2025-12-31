import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Trash2, Eye, Heart } from "lucide-react"; // Барои зебоӣ
import { addToWishlist, useAddToCards, useProductStore } from "@/store/store";
import { NumberTicker } from "@/components/ui/number-ticker";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import "../App.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Wishlist = () => {
  const [items, setItems] = useState<any[]>([]);
  const { AddToCard } = useAddToCards();
  const { data, fetchProducts } = useProductStore();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setItems(data);
    fetchProducts()
  }, []);

  const removeFromWishlist = (id: number) => {
    const filtered = items.filter(item => item.id !== id);
    setItems(filtered);
    localStorage.setItem('wishlist', JSON.stringify(filtered));
    toast.info("Маҳсулот нест карда шуд");
  };

  const handleAddToCart = async (product: any) => {
    await AddToCard(product.id);
    toast.success("Ба сабад илова шуд!");
    removeFromWishlist(product.id);
  };

  return (
    <main className="max-w-337.5 m-auto my-10 px-4">
      <ToastContainer position="bottom-right" autoClose={2000} />

      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-bold">Wishlist ({items.length})</h1>
        {items.length > 0 && (
          <button
            onClick={() => {
              items.forEach(item => AddToCard(item.id));
              setItems([]);
              localStorage.removeItem('wishlist');
            }}
            className="border border-black px-5 py-2 rounded-sm hover:bg-black hover:text-white transition-all"
          >
            Move All To Bag
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-xl text-gray-500">Рӯйхати хоҳишҳои шумо холӣ аст.</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="product-card border rounded  w-64">
              <div className="image-container relative">
                <img
                  src={`https://store-api.softclub.tj/images/${item.image}`}
                  alt={item.productName}
                  className="w-full object-cover h-32 mx-auto"
                />
                <button className="add-to-cart" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <Link to={`/productsdetail/${item.id}`} className="bg-white rounded-full p-2 shadow">
                    <Eye className="w-5 h-5 text-blue-600" />
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className=" bg-white shadow-md rounded-full p-2 hover:bg-red-50 transition-all z-10"
                  >
                    <Trash2 className="w-5 h-5 text-black hover:text-red-500" />
                  </button>
                </div>
              </div>

              <div className="info mt-3 text-start">
                <h1 className="text-lg font-semibold">{item.productName}</h1>
                {item.hasDiscount ? (
                  <div className='flex gap-3 items-end'>
                    <div className="flex justify-center  items-baseline">
                      <span className="text-red-600 font-bold">$</span>
                      <NumberTicker
                        value={
                          item?.price > 4000
                            ? (Number(item?.price.toString().slice(0, 4)) || 0)
                            : (Number(item?.price) || 0)
                        }
                        className="text-red-600 font-bold"
                      />
                    </div>
                    <div>
                      <span className='text-gray-400'>$</span>
                      <NumberTicker
                        value={
                          item?.price > 4000
                            ? (Number(item?.discountPrice.toString().slice(0, 4)) || 0)
                            : (Number(item?.discountPrice) || 0)
                        }
                        className="line-through text-gray-500"
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-blue-600 font-bold">${item.price}</p>
                )}
                <p className="text-xs text-gray-400">{item.categoryName}</p>
                <Rating
                  value={4}
                  max={5}
                  className="my-rating"
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-bold">Just For You</h1>
        {items.length > 0 && (
          <button
            onClick={() => {
              items.forEach(item => AddToCard(item.id));
              setItems([]);
              localStorage.removeItem('wishlist');
            }}
            className="border border-black px-5 py-2 rounded-sm hover:bg-black hover:text-white transition-all"
          >
            See All
          </button>
        )}
      </div>
      <div className='my-5'>
        <Swiper
          slidesPerView={1}
          spaceBetween={5}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 60,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {Array.isArray(data?.products) ? (
            data.products.map((e) => (
              <SwiperSlide>
                <div key={e.id} className="product-card border rounded  w-64">
                  <div className="image-container relative">
                    <img
                      src={`https://store-api.softclub.tj/images/${e.image}`}
                      alt={e.productName}
                      className="w-full object-cover h-32 mx-auto"
                    />
                    <button className="add-to-cart" onClick={() => {
                      AddToCard(e.id)
                    }
                    }>Add to Cart</button>
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                      <button
                        onClick={() => addToWishlist(e)}
                        className="bg-white rounded-full p-2 shadow"
                      >
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
              </SwiperSlide>
            ))
          ) : (
            <div className='flex items-center justify-center mt-10'>
              <p className='font-bold text-2xl'>Маълумот ёфт нашуд...</p>
            </div>
          )}
        </Swiper>
      </div>
    </main >
  );
};

export default Wishlist;