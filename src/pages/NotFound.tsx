import { MorphingText } from '@/components/ui/morphing-text'
import React from 'react'

const NotFound = () => {
    return (
        <div className='m-auto md:py-70 py-70'>
            <MorphingText className='font-serif-[Inter]' texts={["404", "Page Not Found"]} />
        </div>
    )
}

export default NotFound