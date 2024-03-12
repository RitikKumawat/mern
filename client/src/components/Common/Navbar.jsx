import React from 'react'
import logo from "../../assets/Images/Logo.png"
import {FaMagnifyingGlass} from "react-icons/fa6"
import {AiOutlineShoppingCart, AiOutlineMenu} from "react-icons/ai"
import { Link, matchPath, useLocation } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { ProfileDropDown } from '../core/Auth/ProfileDropDown'
import { useState } from 'react'
import { useEffect } from 'react'
import { apiconnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import {IoIosArrowDropdownCircle} from "react-icons/io"

// const subLinks = [
//     {
//         title:"python",
//         link:"/catalog/python"
//     },
//     {
//         title:"web-dev",
//         link:"/catalog/web-dev"
//     },
// ]

export const Navbar = () => {
    
    const {token}  = useSelector( (state)=> state.auth);
    const {user}  = useSelector((state)=>state.profile);
    const {totalItems} = useSelector((state)=>state.cart);
    const location =  useLocation();

    const [subLinks, setSubLinks] = useState([]);
    const [loading,setLoading] = useState(false);
    const [menuOpen,setMenuOpen] = useState(false);
    const [catalogModal,setCatalogModal] = useState(false);
    const handleClick = ()=>{
        setMenuOpen(!menuOpen);
    }
    const handleCatalog=()=>{
        setCatalogModal(!catalogModal);
    }
    
   useEffect(()=>{
    ;(async()=>{
        setLoading(true);
        try {
            const result = await apiconnector("GET",categories.CATEGORIES_API)
            // console.log("Printing sublinks result: ",result.data.data);
            setSubLinks(result.data.data);
            // console.log(subLinks.length);

        //    console.log("Fileter Results",subLinks.filter( (subLink) => subLink?.name));

        } catch (error) {
            console.log("Could not fetch category list")
        }
        setLoading(false);
    })()
   },[]) 
   useEffect(()=>{
    setMenuOpen(false);
   },[location.pathname])
     useEffect(()=>{
        setCatalogModal(false);

     },[location.pathname,menuOpen])
    const fetchSublinks = async() =>{
        setLoading(true);
        try {
            const result = await apiconnector("GET",categories.CATEGORIES_API)
            // console.log("Printing sublinks result: ",result);
            setSubLinks(result.data.data);
        } catch (error) {
            console.log("Could not fetch category list")
        }
        setLoading(false);
    }


    useEffect( () => {
           fetchSublinks(); 
    },[])
    
    
    const matchRoute = (route)=>{
        return matchPath({path:route},location.pathname)
    }
  
  
    return (
    <div>

    <div className='fixed w-full z-[40] flex h-14 items-center justify-center  bg-richblack-800 border-b-richblack-700 border-b-[1px]'>
        <div className=' w-11/12 max-w-maxContent flex flex-row justify-between items-center    '>
            {/* logo */}
            <Link to="/">
                <img src={logo} width={160} height={42}/>
            </Link>
            
            {/* tabs */}
            <nav className={`md:block hidden`}>

                <ul className='flex gap-x-6 text-richblack-25 text-base '>
                    {
                        NavbarLinks.map((link,index)=>(
                            <li key={index}> 
                                {
                                    link.title === "Catalog" ? (
                                    <div className={`flex items-center gap-1 group relative cursor-pointer ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"}`}>
                                        <p>{link.title}</p>
                                        <IoIosArrowDropdownCircle/>
                                        
                                        <div className=' invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]'>

                                        <div className='absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5'>

                                        </div>
                                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length ? (
                            <> 
                                                                              { subLinks.map((subLink, i) => (
                                                                                                                                            <Link to={`/catalog/${subLink.name.split(/[/,' ']/).join("-").toLowerCase()}`} className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"  key={i} >
                                                                                                                                                <p>{subLink.name}</p>
                                                                                                                                            </Link>
                                                                                                                                      ))
                                                                              }
                                                                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                                        </div>
                                    
                                    
                                    </div>) : (
                                        <Link to={link?.path}>
                                            <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                {link.title}
                                            </p>
                                        </Link>
                                    )
                                }
                            </li>
                        ))
                    }
                </ul>
            </nav>
            
            {/* login signup icons etc */}
            <div className='hidden md:flex gap-x-4 items-center'>
                    {
                        user && user?.accountType !=="Instructor" && (
                            <Link to="/dashboard/cart" className='relative text-richblack-5 text-2xl'>
                                <AiOutlineShoppingCart/>
                                {
                                    totalItems > 0 && (
                                        <span className=' absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100'>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token===null && (
                            <Link to="/signup">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropDown/>
                    }
            </div>
            <button className='absolute right-4 md:hidden ' onClick={()=>handleClick()}>
                    <AiOutlineMenu fontSize={24} fill='#AFB2BF'/>
            </button>
           {
             menuOpen && 
             (
                <div className='lg:hidden absolute z-[100000] top-[56px] right-0 w-full h-[60px] bg-richblack-700 transition-all duration-200 ease-in flex flex-col '>
                    <div className='pt-2 bg-richblack-700'>
                    {
                    NavbarLinks.map((link, index) => (
                        <div key={index} className=' relative '>
                            {
                                link.title === "Catalog" ? (
                                    <div className={`flex items-center gap-2 cursor-pointer p-4 ${
                                        matchRoute("/catalog/:catalogName")
                                            ? "text-yellow-25"
                                            : "text-richblack-25"
                                        }`}  onClick={()=>handleCatalog()}>
                                        <p>{link.title}</p>
                                        <IoIosArrowDropdownCircle className='absolute left-[82px]'/>
                                       
                                    </div>
                                ) : (
                                    <Link to={link.path}>
                                        <div className={`p-4 ${matchRoute(link.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                            {link.title}
                                        </div>
                                    </Link>
                                )
                            }
                        </div>
                    ))
                }

                <div className='w-full h-[1px] bg-richblack-200'></div>
                    <div className='flex gap-3 ml-3 mt-2'>

                        {
                            token === null && (
                                <Link to="/login">
                                    <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                        Log in
                                    </button>
                                </Link>
                            )
                        }
                        {
                            token===null && (
                                <Link to="/signup">
                                    <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                        Sign Up
                                    </button>
                                </Link>
                            )
                        }
                    </div>

            </div>

            </div>


             )
           }
           {
            catalogModal && (
                                                
                <div className='lg:hidden absolute rounded-lg z-[500000] bg-white top-[159px] left-[35px] w-[180px]'>
                    <div className=' -z-20 relative top-0 left-[45px] w-[20px] h-[20px] bg-white rotate-45'>
                    </div>
                    {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length ? (
                            <> 
                              { subLinks.map((subLink, i) => (
                                <Link to={`/catalog/${subLink.name.split(/[/,' ']/).join("-").toLowerCase()}`} className="rounded-lg  bg-transparent  pl-4 hover:bg-richblack-50"  key={i} >
                                <p className='px-3'>{subLink.name}</p>
                                 </Link>
                                 ))
                             }
                              </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}                              
                    
                </div>
                )
            }
            <div className='md:hidden  flex  w-[50px] mr-6'>
                {
                    token!==null && (
                        

                        <ProfileDropDown/>
                        
                    )
                }
                
                <div>

                </div>    
            </div>
           
        </div>
    </div>
    </div>
  )
}
