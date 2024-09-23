import React, { useEffect } from 'react'
// import ReportHero from '../ReportHero/ReportHero'
import ReportTop from '../reportTop/ReportTop'
import { ReportsData } from '@/Data/ReportsData'
import ReportHero from '../ReportHero/ReportHero'
import VitalsTop from '../vitalsTop/VitalsTop'
import VitalsHero from '../vitalsHero/VitalsHero'
import { useRouter } from 'next/navigation'
import axios from '@/utils/axios'
import { BACKEND_URI } from '@/CONSTANTS'
import { logout } from '@/Helpers/logout'
// import CartHero from '../cartHero/cartHero'


interface Props {}

function VitalsMain(props: Props) {
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

    return (
        <div className='flex-grow flex flex-col width-full h-full mr-6'>
            <VitalsTop/>
            <VitalsHero />
        </div>
    )
}

export default VitalsMain
