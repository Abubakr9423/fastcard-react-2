import { Input } from "@/components/ui/input"
import { Globe } from "lucide-react"
import { useFormik } from 'formik'
import { useNavigate } from "react-router-dom"
import { useUserStore } from "@/store/store";

function Register() {
    const { addUser } = useUserStore();


    const naviget = useNavigate()

    const formik = useFormik({
        initialValues: {
            userName: "",
            phoneNumber: "",
            email: "",
            password: "",
            confirmPassword: ""
        },

        onSubmit: async (values) => {
            const isSuccess = await addUser(values);
            if (isSuccess) {
                naviget('/');
            } else {
                alert("Хатогӣ ҳангоми сабти ном. Лутфан қайдҳоро санҷед.");
            }
        }
    })
    return (
        <div className="flex items-center justify-center py-20">
            <div className="flex flex-col w-80 gap-3">
                <h1 className="text-3xl">Create an account</h1>
                <p>Enter your details below</p>
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
                    <Input value={formik.values.userName} onChange={formik.handleChange} name="userName" className="border rounded-sm px-2 py-2" placeholder="Name" type="text" />
                    <Input value={formik.values.email} onChange={formik.handleChange} name="email" className="border rounded-sm px-2 py-2" placeholder="Email" type="text" />
                    <Input value={formik.values.phoneNumber} onChange={formik.handleChange} name="phoneNumber" className="border rounded-sm px-2 py-2" placeholder="phone number" type="text" />
                    <Input value={formik.values.password} onChange={formik.handleChange} name="password" className="border rounded-sm px-2 py-2" placeholder="Password" type="text" />
                    <Input value={formik.values.confirmPassword} onChange={formik.handleChange} name="confirmPassword" className="border rounded-sm px-2 py-2" placeholder="confirmPassword" type="text" />
                    <button className="bg-[#DB4444] text-white py-2 px-2 rounded-sm font-medium" type="submit">Create Account</button>
                    <button className="text-black py-2 px-2 rounded-sm border flex justify-center items-center gap-2"><Globe /> <span>Sign up with Google</span></button>
                </form>
                <p className="text-center">Already have account? <span className="font-bold underline" onClick={() => naviget('/')}>Log in</span></p>
            </div>
        </div>
    )
}

export default Register