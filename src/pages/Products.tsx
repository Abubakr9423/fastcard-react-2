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
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const Products = () => {
  const { AddToCard } = useAddToCards();
  const [min, setMin] = useState(1000);
  const [max, setMax] = useState(3000);
  const { data, fetchProducts, setFilters, resetFilters } = useProductStore();
  const navigate = useNavigate();
  const { isCategoria, getCategory } = useCategory();
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const token = GetToken();

  const { t } = useTranslation();

  const errorForBuy = () => toast("Бубахшед шумо то хол худро ба кайд нагирифтаuд!");

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

  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );



  const handleWishlist = (product: any) => {
    toggleWishlist(product);
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

  const [slice2, setslice2] = useState(6);
  const handleSeeMore = () => setslice2(prev => prev + 6);

  useEffect(() => {
    fetchProducts();
    getCategory();
  }, [fetchProducts, getCategory]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDarkMode(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistIds(data.map((item: any) => item.id));
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full px-4 md:px-8">
      {/* Filters Sidebar */}
      <div className="md:w-[300px] flex flex-col gap-6">

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={darkMode ? "dark" : "light"} // works now
        />


        {/* Clear Filters Button */}
        <Button
          onClick={() => {
            resetFilters();
            fetchProducts();
          }}
          className="bg-black text-white hover:bg-neutral-800"
        >
          {t("clearFilters")}
        </Button>

        {/* CATEGORY */}
        <div className="p-4 border rounded-lg bg-white dark:bg-black">
          <h2 className="text-lg font-semibold mb-3">{t("category")}</h2>
          {Array.isArray(isCategoria) ? (
            isCategoria.slice(0, slice2).map((e) => (
              <p
                key={e.id}
                onClick={() => {
                  setFilters({ categoryId: e.id });
                  fetchProducts();
                }}
                className="cursor-pointer py-1 px-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                {e.subCategoryName}
              </p>
            ))
          ) : (
            <p className="text-center text-gray-400">{t("noData")}</p>
          )}
          <button onClick={handleSeeMore} className="mt-2 text-sm underline">
            {t("seeMore")}
          </button>
        </div>

        {/* BRANDS */}
        <div className="p-4 border rounded-lg bg-white dark:bg-black">
          <h2 className="text-lg font-semibold mb-3">{t("brands")}</h2>
          {["samsung", "apple", "huawei", "pocco", "lenovo"].map((brand, idx) => (
            <label key={brand} className="flex gap-2">
              <input
                type="checkbox"
                onChange={(e) => {
                  setFilters({ brandId: e.target.checked ? idx + 1 : undefined });
                  fetchProducts();
                }}
              />
              {t(brand)}
            </label>
          ))}
          <button className="mt-2 text-sm underline">{t("seeAll")}</button>
        </div>

        {/* FEATURES */}
        <div className="p-4 border rounded-lg bg-white dark:bg-black">
          <h2 className="text-lg font-semibold mb-3">{t("features")}</h2>
          {["metallic", "plasticCover", "ram8gb", "superPower", "largeMemory"].map((feature, idx) => (
            <label key={feature} className="flex gap-2">
              <input
                type="checkbox"
                onChange={(e) => {
                  setFilters({ featureId: e.target.checked ? idx + 1 : undefined });
                  fetchProducts();
                }}
              />
              {t(feature)}
            </label>
          ))}
        </div>

        {/* PRICE */}
        <div className="p-4 border rounded-lg bg-white dark:bg-black shadow-md">
          <h2 className="text-lg font-semibold mb-4">{t("priceRange")}</h2>

          {/* Slider */}
          <div className="relative h-6 mb-6">
            <div className="absolute w-full h-1 bg-neutral-200 dark:bg-neutral-800 rounded top-1/2 -translate-y-1/2" />
            <div
              className="absolute h-1 bg-black dark:bg-neutral-900 rounded top-1/2 -translate-y-1/2"
              style={{ left: `${(min / 5000) * 100}%`, width: `${((max - min) / 5000) * 100}%` }}
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

          {/* Values */}
          <div className="flex justify-between mb-4 gap-2">
            <input
              type="text"
              readOnly
              value={min}
              className="w-1/2 border rounded px-2 py-1 text-center bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-200"
            />
            <input
              type="text"
              readOnly
              value={max}
              className="w-1/2 border rounded px-2 py-1 text-center bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-200"
            />
          </div>

          <button
            onClick={applyPriceFilter}
            className="w-full bg-black text-white py-2 rounded hover:bg-neutral-800 transition"
          >
            {t("apply")}
          </button>
        </div>

        {/* CONDITION */}
        <div className="p-4 border rounded-lg bg-white dark:bg-black">
          <h2 className="text-lg font-semibold mb-3">{t("condition")}</h2>
          {["refurbished", "brandNew", "oldItems"].map((c, idx) => (
            <label key={c} className="flex gap-2">
              <input
                type="radio"
                name="condition"
                onChange={() => {
                  setFilters({ conditionId: idx + 1 });
                  fetchProducts();
                }}
              />
              {t(c)}
            </label>
          ))}
        </div>

        {/* RATINGS */}
        <div className="p-4 border rounded-lg bg-white dark:bg-black">
          <h2 className="text-lg font-semibold mb-3">{t("ratings")}</h2>
          {[1, 2, 3, 4, 5].map((rating) => (
            <label key={rating} className="flex gap-2">
              <input type="checkbox" />
              {rating} {t("stars")}
            </label>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
          {Array.isArray(data?.products) ? (
            data.products.map((e) => (
              <div
                key={e.id}
                className="product-card rounded bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 shadow-sm overflow-hidden group"
              >
                <div className="image-container dark:bg-[#1a1a1a] relative">
                  <img
                    src={`https://store-api.softclub.tj/images/${e.image}`}
                    alt={e.productName}
                    className="w-full object-cover h-32 mx-auto rounded-t"
                  />
                  <button
                    className="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 w-full py-2 rounded bg-black text-white hover:bg-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800 transition-all duration-300"
                    onClick={() => handleAddCart(e.id)}
                  >
                    Add to Cart
                  </button>
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <button
                      onClick={() => handleWishlist(e)}
                      className="bg-white dark:bg-neutral-900 rounded-full p-2 shadow hover:scale-110 transition-transform"
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
                      className="bg-white dark:bg-neutral-900 rounded-full p-2 shadow"
                    >
                      <Eye className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />
                    </Link>
                  </div>
                </div>
                <div className="info mt-3 text-start">
                  <h1 className="text-lg font-semibold dark:text-blue-800">{e.productName}</h1>
                  {e.hasDiscount ? (
                    <div className="flex gap-3 items-end">
                      <div className="flex justify-center items-baseline">
                        <span className="text-red-600 dark:text-blue-800 font-bold">$</span>
                        <NumberTicker
                          value={e?.price > 4000 ? Number(e?.price.toString().slice(0, 4)) : Number(e?.price.toString().split(",")[0])}
                          className="text-red-600 font-bold dark:text-blue-800"
                        />
                      </div>
                      <div>
                        <span className="text-gray-400 dark:text-gray-500">$</span>
                        <NumberTicker
                          value={e?.discountPrice > 4000 ? Number(e?.discountPrice.toString().slice(0, 4)) : Number(e?.discountPrice.toString().split(",")[0])}
                          className="line-through text-gray-500 dark:text-gray-400 opacity-80"
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-blue-600 dark:text-blue-400 font-bold">${e.price}</p>
                  )}
                  <p className="text-xs text-gray-400 dark:text-gray-500">{e.categoryName}</p>
                  <Rating value={4} max={5} className="my-rating" />
                </div>
              </div>
            ))
          ) : (
            <div className="h-[60vh] w-full flex items-center justify-center">
              <MorphingText texts={["No product is Available", "Please Change your filter"]} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
