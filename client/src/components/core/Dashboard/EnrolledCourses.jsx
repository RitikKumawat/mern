import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';

export const EnrolledCourses = () => {
  
    const {token} = useSelector((state)=>state.auth);
    const [enrolledCourses,setEnrolledCourses] = useState(null);
    const navigate = useNavigate();
    const getEnrolledCourses = async ()=>{
        try {
            const response = await getUserEnrolledCourses(token);
            console.log("Response enrolled courses/////////",response)
            setEnrolledCourses(response); 
            console.log("enrolled courses===",enrolledCourses);  
        } catch (error) {
            console.log("Unable to fetch enrolled courses")
        }
    }
    useEffect(()=>{
            getEnrolledCourses();
    },[]);
  
  
    return (
    <div className=' flex flex-col '>
        <div className=' p-6 font-medium text-3xl text-richblack-50'>
            Enrolled Courses
        </div>
        {
            !enrolledCourses ? (<div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
                <div className='spinner'> </div>
            </div>) : (
                !enrolledCourses.length ? (<p className='grid h-[10vh] w-full place-content-center text-richblack-5'>You have not enrolled in any course</p>) :
                (   
                    <div className='my-8 text-richblack-5'>
                        <div className='flex gap-4 rounded-t-lg bg-richblack-500 '>
                            <p className='w-[45%] px-2 py-3'>Course Name</p>
                            <p className='w-1/4 px-2 py-3'>Duration</p>
                            <p className='flex-1 px-2 py-3'>Progress</p>
                            
                        </div>
                        {/* cards are starting from here */}
                        {
                            enrolledCourses.map((course,index,arr)=>(
                                <div key={index} className={`flex gap-2 items-center border border-richblack-700 ${index === arr.length -1 ? "rounded-b-lg" : "rounded-none"}`}>
                                    
                                    <div className='flex w-[45%] gap-4 md:px-5 px-0 py-3 cursor-pointer items-center' onClick={()=>{navigate(`/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]._id}`)}}>
                                        <img src={course.thumbnail} alt='course_img' className='h-14 w-14 rounded-lg object-cover'/>
                                        <div className='flex flex-col max-w-xs gap-2'>
                                            <p className='sm:block hidden font-semibold'>{course.courseName}</p>
                                            <p className='text-xs text-richblack-300'>{course.courseDescription.length > 50 ? `${course.courseDescription.slice(0,50)}...`: course.courseDescription}</p>
                                        </div>
                                    </div>
                                    <div className='w-1/4 px-2 py-3 md:text-xs text-[12px]'>
                                        {course?.totalDuration}
                                    </div>

                                    <div className='flex flex-col w-1/5 gap-2 md:px-2 px-0 py-3'>
                                        <p className='md:text-xs text-[12px]'>Progress: {course.progressPercentage || 0}% </p>
                                        <ProgressBar 
                                            completed={course.progressPercentage || 0}
                                            height='8px'
                                            isLabelVisible={false}
                                        />
                                    </div>
                                    
                                </div>
                            ))
                        }
                    </div>
                )
            )
        }

    </div>
  )
}
