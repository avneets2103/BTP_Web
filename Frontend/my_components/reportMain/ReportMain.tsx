import React, { useEffect, useState } from 'react'
// import ReportHero from '../ReportHero/ReportHero'
import ReportTop from '../reportTop/ReportTop'

import ReportHero from '../ReportHero/ReportHero'
import axios from '@/utils/axios'
import { BACKEND_URI } from '@/CONSTANTS'
import { useRouter } from 'next/navigation'
import { logout } from '@/Helpers/logout'
import { ReportsSchema } from '@/Interfaces'
import { ReportsData } from '@/Data/ReportsData'
// import CartHero from '../cartHero/cartHero'


interface Props {}

function ReportMain(props: Props) {
    const Router = useRouter();
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
    }, [Router])
    const {} = props
    const [reportData, setReportData] = useState(ReportsData);
    useEffect(()=> {
        const getReports = async () => {
            try {
                let newReportData:ReportsSchema[] = [];
                const reportsRes = await axios.post(`${BACKEND_URI}/patient/getReportList`, {
                })
                const reports = reportsRes.data.data;
                reports.forEach((report: any) => {
                    newReportData.push({
                        id: report._id,
                        previewImgLink: "/images/rep1.png",
                        reportName: report.reportName,
                        reportDate: report.reportDate,
                        location: report.location,
                        reportPDFLink: report.reportPDFLink,
                    })
                })
                setReportData(newReportData);
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        }
        getReports();
    })

    return (
        <div className='flex-grow flex flex-col width-full h-full mr-6'>
            <ReportTop/>
            <ReportHero data={reportData}/>
        </div>
    )
}

export default ReportMain
