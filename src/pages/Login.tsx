import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MorphingText } from '@/components/ui/morphing-text'

const Login = () => {
    return (
        <div className='flex flex-col gap-5 items-center p-30'>
            <MorphingText className='font-serif-[Inter]' texts={["Welcome", "Please Log in"]} />
            <form className='flex flex-col gap-5 items-center'>
                <Input className='w-[420px] border-gray-600' type="email" placeholder='rimel1111@gmail.com' />
                <Input className='w-[420px] border-gray-600' type="password" placeholder='**********' />
                <Button>Log in</Button>
            </form>
        </div>
    )
}

export default Login