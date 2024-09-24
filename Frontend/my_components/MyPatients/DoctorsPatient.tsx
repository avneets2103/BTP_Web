import React, { useEffect } from 'react'
import DocViewTop from './DocViewTop'
import { PatientData } from '@/Data/PatientData'
import DocViewHero from './DocViewHero'
import { useRouter } from 'next/navigation';
import { BACKEND_URI } from '@/CONSTANTS';
import axios from '@/utils/axios';
import { logout } from '@/Helpers/logout';

function DoctorsPatient() {
    const Router = useRouter();
    const [searchPat, setSearchPat] = React.useState<string>("");
    useEffect(() => {
        const checkTokens = async () => {
            try {
              const accessTokenResponse = await axios.post(
                `${BACKEND_URI}/auth/verifyAccessToken`,
              );
              if (accessTokenResponse.status !== 200) {
                Router.push("/login");
                logout();
                return;
              }
              if(!accessTokenResponse.data.data.isDoctor){
                  Router.push("/sections/myDoctors");
              }
            } catch (error) {
              Router.push("/login");
              logout()
              console.log("Access token invalid, trying refresh token...");
            }
        };
        checkTokens();
    }, [Router])

    return (
        <div className='flex-grow flex flex-col width-full h-full mr-6'>
            <DocViewTop searchPat = {searchPat} setSearchPat = {setSearchPat}/>
            <DocViewHero data={PatientData} searchPat = {searchPat}/>
        </div>
    )
}

export default DoctorsPatient
