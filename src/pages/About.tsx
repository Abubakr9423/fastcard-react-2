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
import { Instagram, Linkedin, Twitter } from "lucide-react"
import { useTranslation } from "react-i18next"

const About = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* Story section */}
      <div className="flex flex-col items-center md:text-start text-center md:px-0 px-3 gap-5 md:flex-row justify-evenly md:p-10">
        <aside className="flex flex-col gap-5">
          <TextAnimate animation="blurInUp" by="character" once className="md:w-[277px] text-[54px] font-[600]">
            {t("ourStory")}
          </TextAnimate>
          <p className="md:w-[525px] text-[16px] font-[400]">{t("storyText1")}</p>
          <p className="md:w-[525px] text-[16px] font-[400]">{t("storyText2")}</p>
        </aside>
        <img src={img1} alt="Our Story" />
      </div>

      {/* Stats section */}
      <div className="flex justify-evenly flex-col md:flex-row gap-5 items-center p-10">
        <article className="w-[270px] h-[230px] hover:bg-[#DB4444] hover:text-white transition-[1s] text-center border flex flex-col items-center justify-evenly">
          <img src={img2} alt="" />
          <TextAnimate className="text-[32px] font-[700]" animation="slideUp" by="word">10.5k</TextAnimate>
          <TextAnimate className="text-[16px] font-[400]" animation="slideUp" by="word">{t("sellersActive")}</TextAnimate>
        </article>
        <article className="w-[270px] h-[230px] hover:bg-[#DB4444] hover:text-white transition-[1s] text-center border flex flex-col items-center justify-evenly">
          <img src={img5} alt="" />
          <TextAnimate className="text-[32px] font-[700]" animation="slideUp" by="word">33k</TextAnimate>
          <TextAnimate className="text-[16px] font-[400]" animation="slideUp" by="word">{t("monthlySale")}</TextAnimate>
        </article>
        <article className="w-[270px] h-[230px] hover:bg-[#DB4444] hover:text-white transition-[1s] text-center border flex flex-col items-center justify-evenly">
          <img src={img3} alt="" />
          <TextAnimate className="text-[32px] font-[700]" animation="slideUp" by="word">45.5k</TextAnimate>
          <TextAnimate className="text-[16px] font-[400]" animation="slideUp" by="word">{t("customersActive")}</TextAnimate>
        </article>
        <article className="w-[270px] h-[230px] hover:bg-[#DB4444] hover:text-white transition-[1s] text-center border flex flex-col items-center justify-evenly">
          <img src={img4} alt="" />
          <TextAnimate className="text-[32px] font-[700]" animation="slideUp" by="word">25k</TextAnimate>
          <TextAnimate className="text-[16px] font-[400]" animation="slideUp" by="word">{t("annualGross")}</TextAnimate>
        </article>
      </div>

      {/* Team section */}
      <div className="flex justify-evenly flex-col gap-15 md:flex-row items-center md:p-10">
        {[img6, img8, img9].map((img, idx) => (
          <article key={idx} className="flex flex-col gap-2 items-start">
            <div className="md:w-[370px] w-[350px] h-[430px] bg-[#F5F5F5] dark:bg-[#1a1a1a] flex items-center justify-center">
              <img src={img} alt="Team member" />
            </div>
            <h1 className="font-[500] text-[32px]">Tom Cruise</h1>
            <p className="font-[400] text-[16px]">{t("founder")}</p>
            <div className="flex gap-3">
              <Twitter />
              <Instagram />
              <Linkedin />
            </div>
          </article>
        ))}
      </div>

      {/* Services section */}
      <div className="flex justify-evenly md:gap-0 gap-6 p-10 mt-20 mb-20 flex-col md:flex-row">
        {[1, 2, 3].map((i) => (
          <article key={i} className="flex flex-col gap-2 items-center">
            <img src={img10} alt="Service" />
            <TextAnimate animation="blurInUp" by="character" className="text-[20px] font-[600]" delay={2}>
              {t("freeDeliveryTitle")}
            </TextAnimate>
            <TextAnimate animation="blurInUp" by="character" delay={2} className="font-[400] text-[14px]">
              {t("freeDeliveryText")}
            </TextAnimate>
          </article>
        ))}
      </div>
    </div>
  )
}

export default About