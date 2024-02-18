import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Outlet,useLocation,matchPath,useNavigate} from 'react-router-dom';
import { SideBar } from '../components/core/Dashboard/SideBar';
import { logout } from '../services/operations/authAPI';
import { ConfirmationModal } from '../components/Common/ConfirmationModal';
import { SideBarLink1 } from '../components/core/Dashboard/SideBarLink1';
import { VscSignOut } from 'react-icons/vsc';
import { sidebarLinks } from '../data/dashboard-links';



export const Dashboard = () => {
  const {loading: authLoading} = useSelector( (state)=>state.auth);
  const {loading: profileLoading} = useSelector( (state)=>state.profile);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);
  
  const {user} = useSelector((state)=>state.profile);
  
  const matchRoute = (route)=>{
    return matchPath({path:route}, location.pathname);
  }
  
 
  if(profileLoading || authLoading){
    return (
        <div className='mt-10 '>
            Loading.....
        </div>
    )
  }
    return (
    <div className='relative mt-4 flex min-h-[calc(100vh-3.5rem)]'>
        
        <div className='md:block hidden'>
          <SideBar/>
        </div>
        <div className='md:hidden flex min-w-[22px] flex-col border-r-[1px] border-r-richblack-700
        h-[calc(100vh-3.5rem)] bg-richblack-800 py-10 '>
            <div className='flex flex-col text-richblack-300'>
                {
                    
                    sidebarLinks.map((link)=>{
                        if(link.type && user?.accountType !== link.type) return null;
                        return (
                            <SideBarLink1 key={link.id} link={link} iconName={link.icon}/>
                        )

                    })
                }

            </div>
            <div className='mx-auto mt-[30px] mb-6 h-[1px] w-full bg-richblack-600'>

            <div className='flex flex-col text-richblack-300'>
                <SideBarLink1
                    link={{name:"Settings",path:"dashboard/settings"}}
                    iconName="VscSettingsGear"
                />
                <button onClick={()=>{
                   setConfirmationModal({
                    text1:"Are you Sure ?",
                    text2:"You will be logged out of your Account",
                    btn1Text:"Logout",
                    btn2Text:"Cancel",
                    btn1Handler: ()=> dispatch(logout(navigate)),
                    btn2Handler: ()=> setConfirmationModal(null),
                   })
                }}
                className=' text-sm font-medium text-richblack-300 relative px-8 py-2  block'>
                <div className='flex items-center gap-x-2'>
                    <VscSignOut className='text-lg'/>
                    
                </div>
                
                
                </button>
            </div>

            </div>

        </div>  

        <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
            <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                <Outlet/>
            </div>
        </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}
