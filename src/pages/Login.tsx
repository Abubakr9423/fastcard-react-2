import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MorphingText } from '@/components/ui/morphing-text'
import { useFormik } from "formik";
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MagicCard } from '@/components/ui/magic-card';
import { useTheme } from '@/components/theme-provider';
import { useAuthStore } from '@/store/store';
import { useEffect } from 'react';
import { GetToken } from '@/utils/axios';
import { useTranslation } from 'react-i18next';


const Login = () => {

    const navigate = useNavigate()
    const { t, i18n } = useTranslation();


    const { theme } = useTheme()

    const loginUser = useAuthStore((state: any) => state.loginUser);
    const loading = useAuthStore((state: any) => state.loading);
    const error = useAuthStore((state: any) => state.error);

    const { handleSubmit, handleChange, resetForm, values } = useFormik({
        initialValues: { email: "", password: "" },
        onSubmit: (values) => {
            loginUser({ userName: values.email, password: values.password });
            localStorage.setItem('user', values.email);
            resetForm();
            navigate("/home");
        }
    });
    useEffect(() => {
        const token = GetToken()
        if (token) {
            navigate('/home')
        }
    })


    return (
        <>
            <Card className='m-auto flex items-center border-none shadow-none'>

                <MagicCard
                    gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
                    className="p-0 w-[350px] md:w-full h-[400px] md:h-[650px] gap-12  flex flex-col justify-evenly "
                >
                    <CardHeader className="">
                        <CardTitle className='mb-25'>
                            <MorphingText className='font-serif-[Inter]' texts={[t("welcome"), t("welcome1")]} />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <form onSubmit={handleSubmit} className='flex flex-col gap-5 items-center'>
                            <Input name='email' onChange={handleChange} value={values.email} className='md:w-[420px] mt-10 md:mt-0 border-gray-600' type="text" placeholder='rimel1111@gmail.com' />
                            <Input name='password' onChange={handleChange} value={values.password} className='md:w-[420px] border-gray-600' type="password" placeholder='**********' />
                            <div className='flex gap-5'>
                                <Button disabled={loading} type='submit'>{[t("buttonlog")]}</Button>
                                <Link to='/register'>
                                    <Button>{[t("buttonreg")]}</Button>
                                </Link>
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                        </form>
                    </CardContent>
                    <CardFooter className="">
                    </CardFooter>
                </MagicCard>
            </Card>
        </>
    )
}

export default Login;