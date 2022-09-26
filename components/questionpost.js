import React from 'react'
import Image from 'next/image'
const questionpost = () => {
    return (
        <>
            <div className='flex flex-col bg-back-grey rounded-b-lg rounded-t-lg items-center justify-between w-screen '>
                <div className='image pt-10'>
                    <Image src={'/BSEB-logo.png'} height={100} width={100}/>
                </div>
                <div className='text-center md:space-y-3 '>
                    <h1 className='text-3xl font-bold'>Bihar Board</h1>
                    <h3 className='font-bold'>10th | 2020</h3>
                    <h2 className='font-bold'>Science</h2>
                </div>
                <div className='pdf'></div>
            </div>
        </>
    )
}

export default questionpost