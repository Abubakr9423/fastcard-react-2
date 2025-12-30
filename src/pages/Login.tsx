import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MorphingText } from '@/components/ui/morphing-text'
import { useFormik } from "formik";
import { useBeras } from '@/store/store';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MagicCard } from '@/components/ui/magic-card';
import { Label } from '@radix-ui/react-label';
import { useTheme } from '@/components/theme-provider';


const Login = () => {

    const navigate = useNavigate()
    const { theme } = useTheme()


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
        <>
            {/* <MorphingText className='font-serif-[Inter]' texts={["Welcome", "Please Log in"]} />
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 items-center'>
                <Input name='email' onChange={handleChange} value={values.email} className='w-[420px] border-gray-600' type="text" placeholder='rimel1111@gmail.com' />
                <Input name='password' onChange={handleChange} value={values.password} className='w-[420px] border-gray-600' type="password" placeholder='**********' />
                <div className='flex gap-5'>
                    <Button disabled={loading}>Log in</Button>
                    <Link to='/register'>
                        <Button>Registrate</Button>
                    </Link>
                </div>
                {error && <p className="text-red-500">{error}</p>}
            </form> */}
            {/* <div className='m-auto flex items-center justify-center'> */}
                <Card className='m-auto flex items-center p-30'>
                    <MagicCard
                        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
                        className="p-0 w-[1000px] h-[500px] flex flex-col justify-evenly"
                    >
                        <CardHeader className="">
                            <CardTitle>
                                <MorphingText className='font-serif-[Inter]' texts={["Welcome", "Please Log in"]} />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            <form onSubmit={handleSubmit} className='flex flex-col gap-5 items-center'>
                                <Input name='email' onChange={handleChange} value={values.email} className='w-[420px] border-gray-600' type="text" placeholder='rimel1111@gmail.com' />
                                <Input name='password' onChange={handleChange} value={values.password} className='w-[420px] border-gray-600' type="password" placeholder='**********' />
                                <div className='flex gap-5'>
                                    <Button disabled={loading}>Log in</Button>
                                    <Link to='/register'>
                                        <Button>Registrate</Button>
                                    </Link>
                                </div>
                                {error && <p className="text-red-500">{error}</p>}
                            </form>
                        </CardContent>
                        <CardFooter className="">
                        </CardFooter>
                    </MagicCard>
                </Card>
            {/* </div> */}
        </>
    )
}

export default Login;