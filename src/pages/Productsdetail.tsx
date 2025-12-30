import { axiosRequest, GetToken } from "@/utils/axios";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import img1 from "../assets/Frame 911.png"
import { useAddToCards } from "@/store/store";


const ProductsDetail = () => {
  const { id } = useParams();
  const [info, setInfo] = useState<any>(null);

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
    if (id) getById();
  }, [id, AddToCard]);

  console.log(info);


  const [imgidx, setimgidx] = useState(0)



  return (
    <div>
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
                <button className="w-[40px] h-[44px] border-[#00000080] border-[1px] flex justify-center items-center">-</button>
                <button className="h-[44px] w-[80px] border-[1px] border-[#00000080] flex justify-center items-center">0</button>
                <button className="w-[40px] h-[44px] border-[#00000080] border-[1px] flex justify-center items-center">+</button>
              </div>
              <div className="flex gap-2 items-center">
                <button onClick={() => AddToCard(info.id)} className="w-[165px] h-[44px] bg-[#DB4444] pt-[10px] pb-[10px] pl-[48px] pr-[48px] text-white">Buy now</button>
                <button className="w-[40px] h-[40px] border-[1px] border-[#00000080] rounded-[4px] flex items-center justify-center"><Heart></Heart></button>
              </div>
            </div>
            <img src={img1} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsDetail;