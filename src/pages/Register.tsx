import { Input } from "@/components/ui/input"
import { Globe } from "lucide-react"

function Register() {
    return (
        <div className="flex items-center justify-center py-30">
            <div className="flex flex-col w-80 gap-3">
                <h1 className="text-3xl">Create an account</h1>
                <p>Enter your details below</p>
                <Input className="border rounded-sm px-2 py-2" placeholder="Name" type="text" />
                <Input className="border rounded-sm px-2 py-2" placeholder="Email or phone number" type="text" />
                <Input className="border rounded-sm px-2 py-2" placeholder="Password" type="text" />
                <button className="bg-[#DB4444] text-white py-2 px-2 rounded-sm font-medium">Create Account</button>
                <button className="text-black py-2 px-2 rounded-sm border flex justify-center items-center gap-2"><Globe /> <span>Sign up with Google</span></button>
                <p className="text-center">Already have account? <span className="font-bold underline">Log in</span></p>
            </div>
        </div>
    )
}

export default Register