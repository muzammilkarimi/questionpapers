import React from 'react'
import Link from 'next/link'

const banner = () => {
    return (
        <>
            <div className='flex flex-col bg-back-grey rounded-b-lg rounded-t-lg items-center justify-between w-screen '>
                <form>
                <div className="hidden md:flex justify-center mt-14 ">

                    <input className='w-96 text-lg bg-back-grey outline-none h-16 rounded-l-full pl-7 shadow-[inset_-1rem_-1rem_2rem_#ffffff,inset_1rem_1rem_2rem_#9e9e9e]' type="text" placeholder="Search Any Question Papers...." />
                    <button type='submit' hidden />
                    <button className='flex justify-center items-center bg-qp-orange rounded-r-full w-24 cursor-pointer' type='submit' hidden>
                        <img className='w-8 h-8' src="/searchicon.svg" alt="" />
                    </button>

                </div>
                </form>
                <div className='flex justify-center items-center md:ml-10 ml-0'>
                    <div className='space-y-6 flex flex-col justify-center items-center p-8 md:p-0 md:items-start md:justify-start'>
                        <h1 className='text-3xl md:text-5xl font-bold'>We Provide </h1>
                        <p className='text-lg text-center md:text-xl'>
                            Subjects Wise Notes, State Boards, Universities and Entrance Exams Previous Years
                            Question Papers with Answers.
                        </p>
                        <Link href="#">
                            <div className='bg-qp-orange w-32 h-12 flex justify-center items-center rounded-xl text-center cursor-pointer'>
                                <h2 className=''>Start Reading</h2>
                            </div>
                        </Link>
                    </div>
                    <div className='hidden md:flex rounded-full'>
                        <img className='rounded-full' src="/cover.gif" alt="loading paper" />
                    </div>
                </div>

            </div>
        </>
    )
}

export default banner