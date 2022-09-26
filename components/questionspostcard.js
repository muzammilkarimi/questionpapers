import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const questionspostcard = () => {
  return (
    <Link href='/questionpost/biharboard_10_2020_science'>
      <div className='w-48 h-64 rounded-3xl flex items-center justify-center shadow-[-1rem_-1rem_2rem_#ffffff,1rem_1rem_2rem_#9e9e9e] m-4 md:m-6 lg:m-10 cursor-pointer'>
        <div className='flex flex-col justify-center items-center space-y-2'>
          <div className='rounded-full'>
            <Image
              height={80}
              width={80}
              src={'/BSEB-logo.png'}
            />
          </div>
          <div>2020</div>
          <div className='font-bold'>Bihar Board</div>
          <div className='bg-[#C2C2C2] rounded-full text-center w-20'>Science</div>
        </div>
      </div>
    </Link>
  )
}

export default questionspostcard