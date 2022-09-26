import React from 'react'
import Image from 'next/image'
const questionpost = () => {
    return (
        <>
            <div className='flex flex-col bg-back-grey rounded-b-lg rounded-t-lg items-center justify-between w-screen '>
                <div className=' mt-10 mb-3 h-28 w-28 '>
                    <img className='' src="/BSEB-logo.png" alt="board logo" />
                </div>
                <div className='text-center md:space-y-3 '>
                    <h1 className='text-3xl font-bold'>Bihar Board</h1>
                    <h3 className='font-bold'>10th | 2020</h3>
                    <h2 className='font-bold'>Science</h2>
                </div>
                <div className='mt-10 '>
                    {/* <iframe
                        src='/Export Report.pdf'
                        className='w-[30rem] h-[40rem] md:w-[50rem] md:h-[50rem] rounded-xl'
                    >

                    </iframe> */}
                    <object data="/Export Report.pdf" type="application/pdf" className='w-[23rem] h-[40rem] md:w-[50rem] md:h-[50rem] rounded-xl'>
                        <p><b>Example fallback content</b>: This browser does not support PDFs. Please download the PDF to view it: <a href="/Export Report.pdf">Download PDF</a>.</p>
                    </object>
                </div>
                <div className='mt-6 p-14 bg-[#D9D9D9] rounded-lg items-center justify-between h-24 w-[23rem] md:w-[50rem] flex'>
                    <a href="/Export Report.pdf">
                        <div className="bg-qp-orange flex h-10 w-36 items-center justify-evenly rounded-xl drop-shadow-neo cursor-pointer">
                            <img src="/download.svg" alt="" />
                            <h3>Download</h3>
                        </div>
                    </a>
                    <div>
                        <img src="/save.svg" alt="save in list icon" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default questionpost