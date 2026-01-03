import { Input } from "@/components/ui/input";
import { editProfile, getProfileInfo, useAuthStore } from "@/store/store";
import { GetToken } from "@/utils/axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useFormik } from "formik";

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

const Account = () => {
  const token = GetToken();
  const [profile, setProfile] = useState<any>(null);
  const logoutUser = useAuthStore((state) => state.logoutUser); // <-- get logout function

  useEffect(() => {
    if (token) {
      const fetchProfile = async () => {
        try {
          const decoded: any = jwtDecode(token);
          const userId = decoded.sid;
          console.log("Decoded userId:", userId);

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

      if (values.image) {
        formdata.append("image", values.image);
      }

      console.log("Form submitted:", values);
      editProfile(formdata);
    },
  });

  return (
    <div className="max-w-337.5 m-auto my-10 md:px-0 px-4">
      <div>
        <h1 className="text-gray-300">
          Home / <span className="text-black">My Account</span>
        </h1>
      </div>
      <br />
      <section className="flex md:flex-row flex-col items-start gap-10">
        {/* Sidebar */}
        <aside className="flex items-start gap-6 flex-col md:w-[35%]">
          <div>
            <h1 className="text-[20px] font-bold">Manage My Account</h1>
            <ul className="text-gray-400 ml-4">
              <li className="hover:text-red-600">My Profile</li>
              <li className="hover:text-red-600">Address Book</li>
              <li className="hover:text-red-600">My Payment Options</li>
            </ul>
          </div>
          <div>
            <h1 className="text-[20px] font-bold">My Orders</h1>
            <ul className="text-gray-400 ml-4 ">
              <li className="hover:text-red-600">My Returns</li>
              <li className="hover:text-red-600">My Cancellations</li>
            </ul>
          </div>
          <h1 className="text-[20px] font-bold">My WishList</h1>
        </aside>

        <aside className="md:w-[60%] shadow-sm md:px-8 px-3 py-5">
          <form onSubmit={formik.handleSubmit}>
            <label className="text-red-600 font-bold text-2xl mb-3">
              Profile
            </label>
            <br />
            <div className="flex justify-between md:gap-10 gap-2">
              <Input
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                type="text"
              />
              <Input
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                type="text"
              />
            </div>
            <div className="flex justify-between my-3 md:gap-10 gap-2">
              <Input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                type="text"
              />
              <Input
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                type="text"
              />
            </div>
            <div className="flex md:mt-5 mt-3 gap-8">
              <Input
                type="file"
                name="image"
                accept="image/*"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  formik.setFieldValue("image", file);
                }}
              />
              <Input
                name="dob"
                value={formik.values.dob}
                onChange={formik.handleChange}
                type="text"
              />
            </div>
            <div className="flex justify-end gap-8 md:my-5 my-3">
              <button type="button">Cancel</button>
              <button
                type="submit"
                className="bg-[#DB4444] font-bold text-white px-5 py-3 rounded-sm"
              >
                Save Changes
              </button>

              {/* Logout Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-[#DB4444] font-bold px-5 py-3 rounded-sm"
                  >
                    Log Out
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Are you sure you want to log out?</DialogTitle>
                    <DialogDescription>
                      This will end your current session.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                      className="bg-[#DB4444] text-white"
                      onClick={async () => {
                        await logoutUser();
                        window.location.href = "/"; 
                      }}
                    >
                      Confirm Logout
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