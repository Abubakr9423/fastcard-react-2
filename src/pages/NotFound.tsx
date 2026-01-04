import { MorphingText } from '@/components/ui/morphing-text'
import React from 'react'
import { useTranslation } from 'react-i18next'

const NotFound = () => {
    const { t } = useTranslation();

    return (
        <div className='m-auto md:py-70 py-70'>
            <MorphingText
                className='font-serif-[Inter]'
                texts={["404", t("pageNotFound")]} // переводится через i18n
            />
        </div>
    )
}

export default NotFound