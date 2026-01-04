import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import img from "../assets/icons-phone.png";
import img2 from "../assets/icons-mail.png";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-337.5 m-auto my-10 md:px-0 px-4">
      <div>
        <h1 className="text-gray-300">
          {t("link1")} / <span className="text-black dark:text-white font-bold">{t("contactTitle")}</span>
        </h1>
      </div>
      <br />
      <section className="flex md:flex-row flex-col items-start gap-10">
        {/* LEFT SIDE */}
        <aside className="flex items-start gap-6 flex-col md:w-[35%]">
          {/* Call To Us */}
          <div>
            <div className="flex items-center gap-3">
              <img src={img} alt="Phone icon" />
              <h1 className="text-[20px] font-bold">{t("callToUs")}</h1>
            </div>
            <ul className="text-gray-400 ml-4">
              <li className="hover:text-red-600">{t("callDesc")}</li>
              <li className="hover:text-red-600">
                {t("phone")}: +8801611112222
              </li>
            </ul>
          </div>

          {/* Write To Us */}
          <div>
            <div className="flex items-center gap-3">
              <img src={img2} alt="Mail icon" />
              <h1 className="text-[20px] font-bold">{t("writeToUs")}</h1>
            </div>
            <ul className="text-gray-400 ml-4 mt-5">
              <li className="hover:text-red-600">{t("writeDesc")}</li>
              <li className="hover:text-red-600">
                {t("emails")}: customer@exclusive.com
              </li>
            </ul>
          </div>

          <h1 className="text-[18px] font-bold">
            {t("emails")}: {t("supportEmail")}
          </h1>
        </aside>

        {/* RIGHT SIDE FORM */}
        <aside className="md:w-[60%] dark:border rounded-sm shadow-sm md:px-8 px-3 py-5">
          <form action="">
            <div className="flex justify-between md:gap-10 gap-2">
              <Input placeholder={t("name")} type="text" />
              <Input placeholder={t("email")} type="text" />
              <Input placeholder={t("phoneField")} type="text" />
            </div>
            <div className="md:mt-5 mt-5">
              <Input
                className="h-50 py-0"
                placeholder={t("yourMessage")}
                type="text"
              />
            </div>
            <div className="flex justify-end gap-8 md:my-5 my-3">
              <button type="button">{t("cancel")}</button>
              <button
                type="submit"
                className="bg-[#DB4444] font-bold text-white px-5 py-3 rounded-sm"
              >
                {t("saveChanges")}
              </button>
            </div>
          </form>
        </aside>
      </section>
    </div>
  );
};

export default Contact;
