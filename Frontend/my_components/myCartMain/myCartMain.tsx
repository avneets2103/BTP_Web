import React from 'react'
import CartTop from '../cartTop/cartTop'
import DocHero from '../DocHero/DocHero'
import { DocData } from '@/Data/DocData'
// import CartHero from '../cartHero/cartHero'


interface Props {}

function MyCartMain(props: Props) {
    const {} = props

    return (
        <div className='flex-grow flex flex-col width-full h-full mr-6'>
            <CartTop/>
            {/* <CartHero/> */}
            <DocHero data={DocData}/>
        </div>
    )
}

export default MyCartMain
