import React from 'react'
import CartTop from '../cartTop/cartTop'
import DocHero from '../DocHero/DocHero'
import { DocData } from '@/Data/DocData'

function MyCartMain() {
    return (
        <div className='flex-grow flex flex-col width-full h-full mr-6'>
            <CartTop/>
            <DocHero data={DocData}/>
        </div>
    )
}

export default MyCartMain
