import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PropTypes from 'prop-types';
import { BsBookmarkFill } from 'react-icons/bs'
const questionspostcard = ({
  saved = false,
  id = '',
  year='',
  board: { name = '' ,logo_url=''},
  subject='',
  onClickSaved = () => null,
}) => {
  return (
    <Link href={`/questionpost/${id}`} target="_blank">
      <div className='w-48 h-64 rounded-3xl flex items-center justify-center shadow-[-1rem_-1rem_2rem_#ffffff,1rem_1rem_2rem_#9e9e9e] m-4 md:m-6 lg:m-10 cursor-pointer overflow-hidden relative hover:bg-black/[0.05] duration-200'>
        <div className='flex flex-col justify-center items-center space-y-2'>
          <div className=''>
            <div className='overflow-hidden flex items-center justify-center h-28 w-28 rounded-full'>
            {logo_url?<img className='h-26 w-26' src={logo_url} alt="board logo" />:<img className='h-26 w-26' src='/QP logo.png' alt="board logo" />}
            </div>
            <button
              type="button"
              onClick={e => {
                e.preventDefault();
                if (typeof onClickSaved === 'function') {
                  onClickSaved(id);
                }
              }}
              className="absolute top-4 right-4"
            >
              <BsBookmarkFill
                className={`hover:text-qp-orange w-6 h-6 drop-shadow-xl transition ${saved ? 'text-qp-orange' : 'text-white'
                  }`}
              />
            </button>
          </div>
          <div>{year}</div>
          <div className='font-bold'>{name}</div>
          <div className='bg-[#C2C2C2] rounded-full text-center pl-2 pr-2 w-40 overflow-hidden'>{subject}</div>
        </div>
      </div>
    </Link>
  )
}
questionspostcard.propTypes = {
  id: PropTypes.string.isRequired,
  author: PropTypes.string,
  
  pdf_url: PropTypes.string.isRequired,
  year:PropTypes.number.isRequired,
  subject:PropTypes.string.isRequired,
  onClickSaved:PropTypes.func
};
export default questionspostcard