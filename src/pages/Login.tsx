import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MorphingText } from '@/components/ui/morphing-text'
import { useFormik } from "formik";
import { useBeras } from '@/store/store';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()

    const loginUser = useBeras((state: any) => state.loginUser);
    const loading = useBeras((state: any) => state.loading);
    const error = useBeras((state: any) => state.error);

    const { handleSubmit, handleChange, resetForm, values } = useFormik({
        initialValues: { email: "", password: "" },
        onSubmit: (values) => {
            loginUser({ userName: values.email, password: values.password });
            resetForm();
            navigate("/home")
        }
    });

    return (
        <div className='flex flex-col gap-5 items-center p-30'>
            <MorphingText className='font-serif-[Inter]' texts={["Welcome", "Please Log in"]} />
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 items-center'>
                <Input name='email' onChange={handleChange} value={values.email} className='w-[420px] border-gray-600' type="text" placeholder='rimel1111@gmail.com' />
                <Input name='password' onChange={handleChange} value={values.password} className='w-[420px] border-gray-600' type="password" placeholder='**********' />
                <Button disabled={loading}>Log in</Button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    )
}

export default Login;