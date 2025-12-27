import { Input } from '@/components/ui/input'
import React from 'react'

const Login = () => {
    return (
        <div>
            <h1>Log in </h1>
            <form>
                <Input className='w-[420px]' type="text" />
                <Input className='w-[420px]' type="text" />
                <button>Log in </button>
            </form>
        </div>
    )
}

export default Login