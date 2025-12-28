import { useEffect, useState } from "react";
import { useProductStore } from "../store/store";
import "../App.css";

const Products = () => {
  const { data, fetchProducts, setFilters } = useProductStore((state) => state);

  const [min, setMin] = useState(1000);
  const [max, setMax] = useState(3000);

  useEffect(() => {
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
      <h2>Products</h2>
      <div className="flex justify-evenly p-10 gap-25">
        <div className="flex flex-col gap-5">
          <div>
            <h1>Category</h1>
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
                className="cursor-pointer hover:text-blue-600"
              >
                {cat.name}
              </p>
            ))}
          </div>

          <div>
            <h1>Brands</h1>
            {["Samsung", "Apple", "Huawei", "Pocco", "Lenovo"].map((brand, idx) => (
              <div key={brand} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setFilters({ brandId: e.target.checked ? idx + 1 : undefined });
                    fetchProducts();
                  }}
                />
                <h1>{brand}</h1>
              </div>
            ))}
            <h1>See all</h1>
          </div>

          <div>
            <h1>Features</h1>
            {["Metallic", "Plastic cover", "8GB Ram", "Super power", "Large Memory"].map(
              (feature, idx) => (
                <div key={feature} className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      setFilters({ subcategoryId: e.target.checked ? idx + 1 : undefined });
                      fetchProducts();
                    }}
                  />
                  <h1>{feature}</h1>
                </div>
              )
            )}
            <h1>See all</h1>
          </div>

          <div className="w-80 p-4 border rounded-lg shadow-md bg-white">
            <h1 className="text-lg font-semibold mb-4">Price range</h1>

            <div className="relative h-6 mb-6">
              <div className="absolute w-full h-1 bg-gray-300 rounded top-1/2 -translate-y-1/2" />

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
                className="absolute w-full appearance-none bg-transparent pointer-events-auto"
                style={{ zIndex: 3 }}
              />

              <input
                type="range"
                min="0"
                max="5000"
                step="50"
                value={max}
                onChange={handleMaxChange}
                className="absolute w-full appearance-none bg-transparent pointer-events-auto"
                style={{ zIndex: 4 }}
              />
            </div>

            <div className="flex justify-between mb-4">
              <input
                type="text"
                value={min}
                readOnly
                className="w-1/2 mr-2 border rounded px-2 py-1 text-center"
              />
              <input
                type="text"
                value={max}
                readOnly
                className="w-1/2 ml-2 border rounded px-2 py-1 text-center"
              />
            </div>

            <button
              onClick={applyPriceFilter}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Apply
            </button>
          </div>

          <div>
            <h1>Condition</h1>
            {["Refurbished", "Brand new", "Old items"].map((condition, idx) => (
              <div key={condition} className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="condition"
                  onChange={() => {
                    setFilters({ subcategoryId: idx + 10 }); 
                    fetchProducts();
                  }}
                />
                <h1>{condition}</h1>
              </div>
            ))}
          </div>

          <div>
            <h1>Ratings</h1>
            {[1, 2, 3, 4, 5].map((rating) => (
              <div key={rating} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setFilters({ colorId: e.target.checked ? rating : undefined });
                    fetchProducts();
                  }}
                />
                <h1>{rating} Stars</h1>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-10">
          {Array.isArray(data?.products) ? (
            data.products.map((e) => (
              <div key={e.id} className="product-card">
                <div className="image-container">
                  <img src={e.image} alt={e.productName} />
                  <button className="add-to-cart">Add to Cart</button>
                </div>
                <div className="info">
                  <h1>{e.productName}</h1>
                  <p className="color">Color: {e.color}</p>
                  <p className="price">${e.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;