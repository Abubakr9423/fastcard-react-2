import { useEffect, useState } from "react";
import { toggleWishlist, useAddToCards, useCategory, useProductStore } from "../store/store";
import "../App.css";
import { Eye, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { MorphingText } from "@/components/ui/morphing-text";
import { GetToken } from "@/utils/axios";
import Rating from "@/components/Rating";
import { NumberTicker } from "@/components/ui/number-ticker";
import { toast, ToastContainer } from "react-toastify";
import { Button } from '@/components/ui/button';

const Products = () => {
  const { AddToCard } = useAddToCards();
  const [min, setMin] = useState(1000);
  const [max, setMax] = useState(3000);
  const { data, fetchProducts, setFilters, resetFilters } = useProductStore();
  const naviget = useNavigate()
  const { isCategoria, getCategory } = useCategory();
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const errorForBuy = () => toast("Бубахшед шумо то хол худро ба кайд нагирифтаuд!");
  const token = GetToken()

  const handleAddCart = (productId: number) => {
    if (token) {
      AddToCard(productId);
    } else {
      errorForBuy();
      setTimeout(() => {
        naviget('/');
      }, 4000);
    }
  };


  useEffect(() => {
    // const token = GetToken();
    // if (!token) {
    //   naviget('/');
    //   return;
    // }
    fetchProducts();
    getCategory()
  }, [fetchProducts]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistIds(data.map((item: any) => item.id));
  }, []);

  const handleWishlist = (product: any) => {
    toggleWishlist(product);
    // Навсозии State барои дидани ранг
    const data = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistIds(data.map((item: any) => item.id));
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value <= max) setMin(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= min) setMax(value);
  };

  const applyPriceFilter = () => {
    setFilters({ minPrice: min, maxPrice: max });
    fetchProducts();
  };


  const [slice2, setslice2] = useState(6)

  const handleSeeMore = () => {
    setslice2(prev => prev + 6);
  };



  return (
    <>
      <div className="flex justify-evenly flex-col items-center md:flex-row md:items-start w-[800px]">
        <ToastContainer />
        <div className="flex flex-col gap-6 md:w-[300px] mx-auto">
          <Button
            onClick={() => {
              resetFilters();
              fetchProducts();
            }}
            className="bg-black text-white hover:bg-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          >
            Clear all Filters
          </Button>

          <div className="p-4 border border-neutral-200 dark:border-neutral-800 
                    rounded-lg shadow-sm bg-white dark:bg-black">
            <h2 className="text-lg font-semibold mb-3 text-neutral-900 dark:text-neutral-100">Category</h2>
            {Array?.isArray(isCategoria) ? (
              isCategoria.slice(0, slice2).map((e) => (
                <div key={e.id}>
                  <h1
                    onClick={() => {
                      setFilters({ categoryId: e.id });
                      fetchProducts();
                    }}
                    className="cursor-pointer py-1 px-2 rounded 
                         hover:bg-neutral-100 hover:text-neutral-900 
                         dark:hover:bg-neutral-800 dark:hover:text-neutral-200 
                         transition text-neutral-700 dark:text-neutral-300"
                  >
                    {e.subCategoryName}
                  </h1>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center mt-10">
                <p className="font-bold text-2xl text-neutral-700 dark:text-neutral-400">
                  Маълумот ёфт нашуд...
                </p>
              </div>
            )}
            <button
              onClick={handleSeeMore}
              className="cursor-pointer py-1 px-2 rounded 
                   hover:bg-neutral-100 hover:text-neutral-900 
                   dark:hover:bg-neutral-800 dark:hover:text-neutral-200 
                   transition text-neutral-700 dark:text-neutral-300"
            >
              See more
            </button>
          </div>

          <div className="p-4 border border-neutral-200 dark:border-neutral-800 
                    rounded-lg shadow-sm bg-white dark:bg-black">
            <h2 className="text-lg font-semibold mb-3 text-neutral-900 dark:text-neutral-100">Brands</h2>
            {["Samsung", "Apple", "Huawei", "Pocco", "Lenovo"].map((brand, idx) => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setFilters({ brandId: e.target.checked ? idx + 1 : undefined });
                    fetchProducts();
                  }}
                  className="accent-black dark:accent-neutral-900"
                />
                <span className="text-neutral-700 dark:text-neutral-300">{brand}</span>
              </label>
            ))}
            <button className="mt-2 text-sm text-neutral-900 dark:text-neutral-200 hover:underline">
              See all
            </button>
          </div>

          <div className="p-4 border border-neutral-200 dark:border-neutral-800 
                    rounded-lg shadow-sm bg-white dark:bg-black">
            <h2 className="text-lg font-semibold mb-3 text-neutral-900 dark:text-neutral-100">Features</h2>
            {["Metallic", "Plastic cover", "8GB Ram", "Super power", "Large Memory"].map((feature, idx) => (
              <label key={feature} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setFilters({ subcategoryId: e.target.checked ? idx + 1 : undefined });
                    fetchProducts();
                  }}
                  className="accent-black dark:accent-neutral-900"
                />
                <span className="text-neutral-700 dark:text-neutral-300">{feature}</span>
              </label>
            ))}
            <button className="mt-2 text-sm text-neutral-900 dark:text-neutral-200 hover:underline">
              See all
            </button>
          </div>

          <div className="p-4 border border-neutral-200 dark:border-neutral-800 
                    rounded-lg shadow-md bg-white dark:bg-black">
            <h2 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100">Price Range</h2>
            <div className="relative h-6 mb-6">
              <div className="absolute w-full h-1 bg-neutral-200 dark:bg-neutral-800 rounded top-1/2 -translate-y-1/2" />
              <div
                className="absolute h-1 bg-black dark:bg-neutral-900 rounded top-1/2 -translate-y-1/2"
                style={{
                  left: `${(min / 5000) * 100}%`,
                  width: `${((max - min) / 5000) * 100}%`,
                }}
              />
              <input
                type="range"
                min="0"
                max="5000"
                step="50"
                value={min}
                onChange={handleMinChange}
                className="absolute w-full appearance-none bg-transparent pointer-events-auto accent-black dark:accent-blue-900"
                style={{ zIndex: 3 }}
              />
              <input
                type="range"
                min="0"
                max="5000"
                step="50"
                value={max}
                onChange={handleMaxChange}
                className="absolute w-full appearance-none bg-transparent pointer-events-auto accent-black dark:accent-blue-900"
                style={{ zIndex: 4 }}
              />
            </div>
            <div className="flex justify-between mb-4">
              <input
                type="text"
                value={min}
                readOnly
                className="w-1/2 mr-2 border rounded px-2 py-1 text-center 
                     bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-200"
              />
              <input
                type="text"
                value={max}
                readOnly
                className="w-1/2 ml-2 border rounded px-2 py-1 text-center 
                     bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-200"
              />
            </div>
            <button
              onClick={applyPriceFilter}
              className="w-full bg-black text-white py-2 rounded 
                   hover:bg-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800 transition"
            >
              Apply
            </button>
          </div>

          <div className="p-4 border border-neutral-200 dark:border-neutral-800 
                    rounded-lg shadow-sm bg-white dark:bg-black">
            <h2 className="text-lg font-semibold mb-3 text-neutral-900 dark:text-neutral-100">Condition</h2>
            {["Refurbished", "Brand new", "Old items"].map((condition, idx) => (
              <label key={condition} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="condition"
                  onChange={() => {
                    setFilters({ subcategoryId: idx + 10 });
                    fetchProducts();
                  }}
                  className="accent-black dark:accent-neutral-900"
                />
                <span className="text-neutral-700 dark:text-neutral-300">{condition}</span>
              </label>
            ))}
          </div>

          <div className="p-4 border border-neutral-200 dark:border-neutral-800 
                    rounded-lg shadow-sm bg-white dark:bg-black">
            <h2 className="text-lg font-semibold mb-3 text-neutral-900 dark:text-neutral-100">Ratings</h2>
            {[1, 2, 3, 4, 5].map((rating) => (
              <label key={rating} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setFilters({ colorId: e.target.checked ? rating : undefined });
                    fetchProducts();
                  }}
                  className="accent-black dark:accent-neutral-900"
                />
                <span className="text-neutral-700 dark:text-neutral-300">{rating} Stars</span>
              </label>
            ))}
          </div>
        </div>
        <ToastContainer />
        <div>
          {Array.isArray(data?.products) ? (
            data.products.map((e) => (
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
                    onClick={() => handleAddCart(e.id)}
                  >
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
            <MorphingText
              // className="font-serif-[Inter] text-neutral-700 dark:text-neutral-300"
              texts={["No product is Available", "Please Change your filter"]}
            />
          )}
        </div>
      </div >
    </>
  );
};

export default Products;


