import React, { useEffect } from 'react'
import MyDocTop from '../cartTop/myDocTop'
import DocHero from '../DocHero/DocHero'
import { DocData } from '@/Data/DocData'
import axios from '@/utils/axios'
import { BACKEND_URI } from '@/CONSTANTS'
import { useRouter } from 'next/navigation'
import { logout } from '@/Helpers/logout'

function MyDoctors() {
    const Router = useRouter();
    const [searchDoc, setSearchDoc] = React.useState<string>("");
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
              if(accessTokenResponse.data.data.isDoctor){
                  Router.push("sections/myPatients");
              }
            } catch (error) {
              Router.push("/login");
              logout();
              console.log("Access token invalid, trying refresh token...");
            }
        };
        checkTokens();
    }, [Router])
    return (
        <div className='flex-grow flex flex-col width-full h-full mr-6'>
            <MyDocTop searchDoc = {searchDoc} setSearchDoc = {setSearchDoc}/>
            <DocHero data={DocData} searchDoc = {searchDoc}/>
        </div>
    )
}

export default MyDoctors
