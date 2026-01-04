import { Input } from "@/components/ui/input";
import { editProfile, getProfileInfo, useAuthStore } from "@/store/store";
import { GetToken } from "@/utils/axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { jwtDecode } from 'jwt-decode';

const Account = () => {
  const { t } = useTranslation();
  const token = GetToken();
  const [profile, setProfile] = useState<any>(null);
  const logoutUser = useAuthStore((state) => state.logoutUser);

  useEffect(() => {
    if (token) {
      const fetchProfile = async () => {
        try {
          const decoded: any = jwtDecode(token);
          const userId = decoded.sid;

          const data = await getProfileInfo(userId);
          setProfile(data);
        } catch (error) {
          console.error("Invalid token or failed request", error);
        }
      };
      fetchProfile();
    }
  }, [token]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      email: profile?.email || "",
      phoneNumber: profile?.phoneNumber || "",
      dob: profile?.dob || "",
      image: null,
    },
    onSubmit: (values) => {
      const formdata = new FormData();
      formdata.append("lastName", values.lastName);
      formdata.append("firstName", values.firstName);
      formdata.append("email", values.email);
      formdata.append("phoneNumber", values.phoneNumber);
      formdata.append("dob", values.dob);

      if (values.image) formdata.append("image", values.image);

      editProfile(formdata);
    },
  });

  return (
    <div className="max-w-337.5 m-auto my-10 md:px-0 px-4">
      <div>
        <h1 className="text-gray-300">
          {t("link1")} /{" "}
          <span className="text-black dark:text-white font-bold">{t("welcome")}</span>
        </h1>
      </div>
      <br />
      <section className="flex md:flex-row flex-col items-start gap-10">
        <aside className="flex items-start gap-6 flex-col md:w-[35%]">
          <div>
            <h1 className="text-[20px] font-bold">{t("welcome")}</h1>
            <ul className="text-gray-400 ml-4">
              <li className="hover:text-red-600">{t("buttonlog")}</li>
              <li className="hover:text-red-600">{t("buttonreg")}</li>
              <li className="hover:text-red-600">{t("checkout")}</li>
            </ul>
          </div>
          <div>
            <h1 className="text-[20px] font-bold">{t("link2")}</h1>
            <ul className="text-gray-400 ml-4 ">
              <li className="hover:text-red-600">{t("link3")}</li>
              <li className="hover:text-red-600">{t("link4")}</li>
            </ul>
          </div>
          <h1 className="text-[20px] font-bold">{t("link5")}</h1>
        </aside>

        <aside className="md:w-[60%] shadow-sm md:px-8 px-3 py-5">
          <form onSubmit={formik.handleSubmit}>
            <label className="text-red-600 font-bold text-2xl mb-3">
              {t("contactTitle")}
            </label>
            <br />
            <div className="flex justify-between md:gap-5 gap-2">
              <Input
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                placeholder={t("firstName")}
              />
              <Input
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                placeholder={t("lastName")}
              />
            </div>
            <div className="flex justify-between my-3 md:gap-5 gap-2">
              <Input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder={t("email")}
              />
              <Input
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                placeholder={t("phoneField")}
              />
            </div>
            <div className="flex md:mt-4 mt-3 md:gap-5 gap-2">
              <Input
                type="file"
                name="image"
                accept="image/*"
                onChange={(event) =>
                  formik.setFieldValue("image", event.currentTarget.files?.[0])
                }
              />
              <Input
                name="dob"
                value={formik.values.dob}
                onChange={formik.handleChange}
                placeholder={t("dob")}
              />
            </div>
            <div className="flex justify-end gap-2 md:my-5 my-3">
              <button
                type="button"
                className="border rounded-sm px-6.5 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 duration-200"
              >
                {t("cancel")}
              </button>
              <button
                type="submit"
                className="bg-[#DB4444] hover:bg-[#db4444d5] duration-200  text-white px-3 py-1.5 rounded-sm"
              >
                {t("saveChanges")}
              </button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-[#DB4444] font-bold px-5 py-3 rounded-sm"
                  >
                    {t("buttonlog")}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{t("pageNotFound")}</DialogTitle>
                    <DialogDescription>
                      {t("callDesc")}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">{t("cancel")}</Button>
                    </DialogClose>
                    <Button
                      className="bg-[#DB4444] text-white"
                      onClick={async () => {
                        await logoutUser();
                        window.location.href = "/";
                      }}
                    >
                      {t("buttonlog")}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </form>
        </aside>
      </section>
    </div>
  );
};

export default Account;
