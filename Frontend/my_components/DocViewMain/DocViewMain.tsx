import React from 'react'
import DocViewTop from '../DocViewTop/DocViewTop'
import DocViewHero from '../DocViewHero/DocViewhero'
import { PatientData } from '@/Data/PatientData'

interface Props {}

function DocViewMain(props: Props) {
    const {} = props

    return (
        <div className='flex-grow flex flex-col width-full h-full mr-6'>
            <DocViewTop/>
            <DocViewHero data={PatientData}/>
        </div>
    )
}

export default DocViewMain
