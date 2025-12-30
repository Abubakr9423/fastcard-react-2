import { useEffect, useState } from "react";
import { useProductStore } from "../store/store";
import "../App.css";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { MorphingText } from "@/components/ui/morphing-text";
import { GetToken } from "@/utils/axios";

const Products = () => {
  const { data, fetchProducts, setFilters } = useProductStore((state) => state);

  const [min, setMin] = useState(1000);
  const [max, setMax] = useState(3000);
  const naviget = useNavigate()


  useEffect(() => {
    const token = GetToken();
    if (!token) {
      naviget('/');
      return;
    }
    fetchProducts();

  }, [fetchProducts]);

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

  return (
    <>
      <div className="flex md:flex-row flex-col justify-center p-10 gap-25 items-start">
        <div className="flex flex-col gap-6 w-[300px] mx-auto">
          <div className="p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-lg font-semibold mb-3">Category</h2>
            {[
              { id: undefined, name: "All products" },
              { id: 1, name: "Electronics" },
              { id: 2, name: "Home & Lifestyle" },
              { id: 3, name: "Medicine" },
              { id: 4, name: "Sports & Outdoor" },
              
            ].map((cat) => (
              <p
                key={cat.id ?? "all"}
                onClick={() => {
                  setFilters({ categoryId: cat.id });
                  fetchProducts();
                }}
                className="cursor-pointer py-1 px-2 rounded hover:bg-blue-50 hover:text-blue-600 transition"
              >
                {cat.name}
              </p>
            ))}
          </div>

          <div className="p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-lg font-semibold mb-3">Brands</h2>
            {["Samsung", "Apple", "Huawei", "Pocco", "Lenovo"].map((brand, idx) => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setFilters({ brandId: e.target.checked ? idx + 1 : undefined });
                    fetchProducts();
                  }}
                  className="accent-blue-600"
                />
                <span className="text-gray-700">{brand}</span>
              </label>
            ))}
            <button className="mt-2 text-sm text-blue-600 hover:underline">See all</button>
          </div>
          <div className="p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-lg font-semibold mb-3">Features</h2>
            {["Metallic", "Plastic cover", "8GB Ram", "Super power", "Large Memory"].map(
              (feature, idx) => (
                <label key={feature} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      setFilters({ subcategoryId: e.target.checked ? idx + 1 : undefined });
                      fetchProducts();
                    }}
                    className="accent-blue-600"
                  />
                  <span className="text-gray-700">{feature}</span>
                </label>
              )
            )}
            <button className="mt-2 text-sm text-blue-600 hover:underline">See all</button>
          </div>

          <div className="p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-lg font-semibold mb-4">Price Range</h2>
            <div className="relative h-6 mb-6">
              <div className="absolute w-full h-1 bg-gray-200 rounded top-1/2 -translate-y-1/2" />
              <div
                className="absolute h-1 bg-blue-600 rounded top-1/2 -translate-y-1/2"
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
                className="absolute w-full appearance-none bg-transparent pointer-events-auto accent-blue-600"
                style={{ zIndex: 3 }}
              />
              <input
                type="range"
                min="0"
                max="5000"
                step="50"
                value={max}
                onChange={handleMaxChange}
                className="absolute w-full appearance-none bg-transparent pointer-events-auto accent-blue-600"
                style={{ zIndex: 4 }}
              />
            </div>
            <div className="flex justify-between mb-4">
              <input
                type="text"
                value={min}
                readOnly
                className="w-1/2 mr-2 border rounded px-2 py-1 text-center bg-gray-50"
              />
              <input
                type="text"
                value={max}
                readOnly
                className="w-1/2 ml-2 border rounded px-2 py-1 text-center bg-gray-50"
              />
            </div>
            <button
              onClick={applyPriceFilter}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Apply
            </button>
          </div>

          <div className="p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-lg font-semibold mb-3">Condition</h2>
            {["Refurbished", "Brand new", "Old items"].map((condition, idx) => (
              <label key={condition} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="condition"
                  onChange={() => {
                    setFilters({ subcategoryId: idx + 10 });
                    fetchProducts();
                  }}
                  className="accent-blue-600"
                />
                <span className="text-gray-700">{condition}</span>
              </label>
            ))}
          </div>

          <div className="p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-lg font-semibold mb-3">Ratings</h2>
            {[1, 2, 3, 4, 5].map((rating) => (
              <label key={rating} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setFilters({ colorId: e.target.checked ? rating : undefined });
                    fetchProducts();
                  }}
                  className="accent-blue-600"
                />
                <span className="text-gray-700">{rating} Stars</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap md:w-[1000px]">
          {Array.isArray(data?.products) ? (
            data.products.map((e) => (
              <div key={e.id} className="product-card border rounded  w-64">
                <div className="image-container relative">
                  <img
                    src={`https://store-api.softclub.tj/images/${e.image}`}
                    alt={e.productName}
                    className="w-full object-cover h-32 mx-auto"
                  />
                  <button className="add-to-cart">Add to Cart</button>
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <button className="bg-white rounded-full p-2 shadow">
                      <Heart className="w-5 h-5 text-red-500" />
                    </button>
                    <Link to={`/productsdetail/${e.id}`} className="bg-white rounded-full p-2 shadow">
                      <Eye className="w-5 h-5 text-blue-600" />
                    </Link>
                  </div>
                </div>

                <div className="info mt-3 text-center">
                  <h1 className="text-lg font-semibold">{e.productName}</h1>
                  <p className="text-sm text-gray-600">Color: {e.color}</p>

                  {e.hasDiscount ? (
                    <div className="flex justify-center gap-2 items-baseline">
                      <p className="text-red-600 font-bold">${e.price}</p>
                      <p className="line-through text-gray-500">${e.discountPrice}</p>
                    </div>
                  ) : (
                    <p className="text-blue-600 font-bold">${e.price}</p>
                  )}

                  <p className="text-xs text-gray-500 mt-1">
                    {e.quantity > 0 ? `In stock: ${e.quantity}` : "Out of stock"}
                  </p>
                  <p className="text-xs text-gray-400">{e.categoryName}</p>
                </div>
              </div>
            ))
          ) : (
            <MorphingText className='font-serif-[Inter]' texts={["No product is Availabel", "Please Cahnge your filter"]} />

          )}
        </div>
      </div>
    </>
  );
};

export default Products;