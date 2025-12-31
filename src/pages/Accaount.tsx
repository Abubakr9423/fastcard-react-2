import { Input } from "@/components/ui/input";
import { editProfile, getProfileInfo } from "@/store/store";
import { GetToken } from "@/utils/axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useFormik } from "formik";

const Account = () => {
  const token = GetToken();
  const [profile, setProfile] = useState<any>(null);

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
      dob:profile?.dob || "0001-01-01",
      image: profile?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb-NGEQDekk2BwsllLjk4tcIM_BPIzXECdsg&s",
    },
    onSubmit: (values) => {

      const formdata = new FormData()
      formdata.append("lastname",values.lastName)
      formdata.append("firstName",values.firstName)
      formdata.append("email",values.email)
      formdata.append("phoneNumber",values.phoneNumber)
      formdata.append("dob",values.dob)
      formdata.append("image",values.image)


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

        {/* Profile Form */}
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
                name="phoneNumber" // ✅ fixed typo
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                type="text"
              />
            </div>
            <div className="md:mt-10 mt-5">
              <label className="font-bold">Password Changes</label>
              <Input name="oldPassword" onChange={formik.handleChange} type="password" />
              <div className="flex md:mt-5 mt-3 gap-8">
                <Input name="newPassword" onChange={formik.handleChange} type="password" />
                <Input name="confirmPassword" onChange={formik.handleChange} type="password" />
              </div>
            </div>
            <div className="flex justify-end gap-8 md:my-5 my-3">
              <button type="button">Cancel</button>
              <button
                type="submit"
                className="bg-[#DB4444] font-bold text-white px-5 py-3 rounded-sm"
              >
                Save Changes
              </button>
            </div>
          </form>
        </aside>
      </section>
    </div>
  );
};

export default Account;