import { TextAnimate } from "../components/ui/text-animate"
import img1 from "../assets/portrait-two-african-females-holding-shopping-bags-while-reacting-something-their-smartphone 1.png"
import img2 from "../assets/Services (3).png"
import img3 from "../assets/Services (4).png"
import img4 from "../assets/Services (5).png"
import img5 from "../assets/Services (6).png"
import img6 from "../assets/image 46.png"
import img8 from "../assets/image 47.png"
import img9 from "../assets/image 51.png"
import img7 from "../assets/Frame 877.png"
import img10 from "../assets/Services (7).png"
import { Instagram, Link2, Linkedin, Twitter } from "lucide-react"

const About = () => {
  return (
    <div>
      <div className="flex flex-col items-center md:text-start text-center md:px-0 px-3 gap-5 md:flex-row justify-evenly md:p-10">
        <aside className="flex flex-col gap-5">
          <TextAnimate animation="blurInUp" by="character" once className="md:w-[277px] text-[54px] font-[600]">Our Story</TextAnimate>
          <p className="md:w-[525px] text-[16px] font-[400]">Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </p>
          <p className="md:w-[525px] text-[16px] font-[400]">Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
        </aside>
        <img src={img1} alt="" />
      </div>
      <div className="flex justify-evenly flex-col md:flex-row gap-5 items-center p-10">
        <article className="w-[270px] h-[230px] hover:bg-[#DB4444] hover:text-white transition-[1s] text-center border-[1px] border-[#0000004D] flex flex-col items-center justify-evenly">
          <img src={img2} alt="" />
          <TextAnimate className="w-[92px text-[32px] font-[700]" animation="slideUp" by="word">
            10.5k
          </TextAnimate>
          <TextAnimate className="w-[169px] text-[16px] font-[400]" animation="slideUp" by="word">
            Sallers active our site
          </TextAnimate>
        </article>
        <article className="w-[270px] h-[230px] hover:bg-[#DB4444] hover:text-white transition-[1s] text-center border-[1px] border-[#0000004D] flex flex-col items-center justify-evenly">
          <img src={img5} alt="" />
          <TextAnimate className="w-[92px text-[32px] font-[700]" animation="slideUp" by="word">
            33k
          </TextAnimate>
          <TextAnimate className="w-[169px] text-[16px] font-[400]" animation="slideUp" by="word">
            Mopnthly Produduct Sale
          </TextAnimate>
        </article>
        <article className="w-[270px] h-[230px] hover:bg-[#DB4444] hover:text-white transition-[1s] text-center border-[1px] border-[#0000004D] flex flex-col items-center justify-evenly">
          <img src={img3} alt="" />
          <TextAnimate className="w-[92px text-[32px] font-[700]" animation="slideUp" by="word">
            45.5k
          </TextAnimate>
          <TextAnimate className="w-[169px] text-[16px] font-[400]" animation="slideUp" by="word">
            Customer active in our site
          </TextAnimate>
        </article>
        <article className="w-[270px] h-[230px] hover:bg-[#DB4444] hover:text-white transition-[1s] text-center border-[1px] border-[#0000004D] flex flex-col items-center justify-evenly">
          <img src={img4} alt="" />
          <TextAnimate className="w-[92px text-[32px] font-[700]" animation="slideUp" by="word">
            25k
          </TextAnimate>
          <TextAnimate className="w-[169px] text-[16px] font-[400]" animation="slideUp" by="word">
            Anual gross sale in our site
          </TextAnimate>
        </article>
      </div>
      <div className="flex justify-evenly flex-col gap-15 md:flex-row items-center md:p-10">
        <article className="flex flex-col gap-2 items-start">
          <div className="md:w-[370px] w-[350px] h-[430px] bg-[#F5F5F5] dark:bg-[#1a1a1a] flex items-center justify-center">
            <img src={img6} alt="" />
          </div>
          <h1 className="font-[500] text-[32px]">Tom Cruise</h1>
          <p className="font-[400] text-[16px]">Founder & Chairman</p>
          <div className="flex gap-3">
            <Twitter />
            <Instagram />
            <Linkedin />
          </div>
        </article>
        <article className="flex flex-col gap-2 items-start">
          <div className="md:w-[370px] w-[350px] h-[430px] bg-[#F5F5F5] dark:text-white  dark:bg-[#1a1a1a] flex items-center justify-center">
            <img src={img8} alt="" />
          </div>
          <h1 className="font-[500] text-[32px]">Tom Cruise</h1>
          <p className="font-[400] text-[16px]">Founder & Chairman</p>
          <div className="flex gap-3">
            <Twitter />
            <Instagram />
            <Linkedin />
          </div>
        </article>
        <article className="flex flex-col gap-2 items-start">
          <div className="md:w-[370px] w-[350px] h-[430px] bg-[#F5F5F5]  dark:bg-[#1a1a1a] flex items-center justify-center">
            <img src={img9} alt="" />
          </div>
          <h1 className="font-[500] text-[32px]">Tom Cruise</h1>
          <p className="font-[400] text-[16px]">Founder & Chairman</p>
          <div className="flex gap-3">
            <Twitter />
            <Instagram />
            <Linkedin />
          </div>
        </article>
      </div>
      <div className="flex justify-evenly md:gap-0 gap-6 p-10 mt-20 mb-20 flex-col md:flex-row">
        <article className="flex flex-col gap-2 items-center">
          <img src={img10} alt="" />
          <TextAnimate animation="blurInUp" by="character" className="w-[272px] text-[20px] font-[600]" delay={2}>
            FREE AND FAST DELIVERY
          </TextAnimate>
          <TextAnimate animation="blurInUp" by="character" delay={2} className="font-[400] text-[14px]">
            Free delivery for all orders over $140
          </TextAnimate>
        </article>
        <article className="flex flex-col gap-2 items-center">
          <img src={img10} alt="" />
          <TextAnimate animation="blurInUp" by="character" className="w-[272px] text-[20px] font-[600]" delay={2}>
            FREE AND FAST DELIVERY
          </TextAnimate>
          <TextAnimate animation="blurInUp" by="character" delay={2} className="font-[400] text-[14px]">
            Free delivery for all orders over $140
          </TextAnimate>
        </article>
        <article className="flex flex-col gap-2 items-center">
          <img src={img10} alt="" />
          <TextAnimate animation="blurInUp" by="character" className="w-[272px] text-[20px] font-[600]" delay={2}>
            FREE AND FAST DELIVERY
          </TextAnimate>
          <TextAnimate animation="blurInUp" by="character" delay={2} className="font-[400] text-[14px]">
            Free delivery for all orders over $140
          </TextAnimate>
        </article>
      </div>
    </div>

  )
}

export default About