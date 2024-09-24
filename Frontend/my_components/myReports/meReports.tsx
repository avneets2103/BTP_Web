import React, { useEffect, useState } from 'react'
import ReportTop from './ReportTop'
import ReportHero from './ReportHero'
import axios from '@/utils/axios'
import { BACKEND_URI } from '@/CONSTANTS'
import { useRouter } from 'next/navigation'
import { logout } from '@/Helpers/logout'
import { ReportsSchema } from '@/Interfaces'
import { ReportsData } from '@/Data/ReportsData'

interface Props {}

function ReportMain(props: Props) {
    const Router = useRouter();
    const [reportSearch, setReportSearch] = React.useState<string>("");
    useEffect(() => {
        const checkTokens = async () => {
            try {
              const accessTokenResponse = await axios.post(
                `${BACKEND_URI}/auth/verifyAccessToken`,
              );
              if (accessTokenResponse.status !== 200) {
                Router.push("/login");
                logout() 
                return;
              }
              if(accessTokenResponse.data.data.isDoctor){
                  Router.push("sections/myPatients");
              }
            } catch (error) {
              Router.push("/login");
              logout()
              console.log("Access token invalid, trying refresh token...");
            }
        };
        checkTokens();
    }, [Router]);

    return (
        <div className='flex-grow flex flex-col width-full h-full mr-6'>
            <ReportTop reportSearch = {reportSearch} setReportSearch = {setReportSearch}/>
            <ReportHero data={ReportsData} reportSearch = {reportSearch}/>
        </div>
    )
}

export default ReportMain
