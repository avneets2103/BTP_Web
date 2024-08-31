import React from 'react'
// import ReportHero from '../ReportHero/ReportHero'
import ReportTop from '../reportTop/ReportTop'
import { ReportsData } from '@/Data/ReportsData'
import ReportHero from '../ReportHero/ReportHero'
// import CartHero from '../cartHero/cartHero'


interface Props {}

function ReportMain(props: Props) {
    const {} = props

    return (
        <div className='flex-grow flex flex-col width-full h-full mr-6'>
            <ReportTop/>
            <ReportHero data={ReportsData}/>
        </div>
    )
}

export default ReportMain
