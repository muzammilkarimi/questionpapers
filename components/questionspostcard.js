import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PropTypes from 'prop-types';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { FiExternalLink } from 'react-icons/fi';

const questionspostcard = ({
  saved = false,
  id = '',
  year='',
  board = { name: '' , logo_url: '' },
  subject='',
  onClickSaved = () => null,
}) => {
  const { name = '', logo_url = '' } = board || {};

  return (
    <div className='w-full'>
      <Link href={`/questionpost/${id}`}>
        <div className='relative group h-full bg-white rounded-2xl sm:rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 active:scale-[0.98] cursor-pointer overflow-hidden flex flex-col'>
          
          {/* Top Section with Badge and Bookmark */}
          <div className='p-3 sm:p-5 flex justify-between items-start'>
            {year ? (
              <span className='bg-orange-50 text-qp-orange text-[8px] sm:text-[10px] font-black px-2 py-0.5 rounded-full border border-orange-100 uppercase tracking-tighter'>
                {year}
              </span>
            ) : <div />}
            <button
              type="button"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                if (typeof onClickSaved === 'function') {
                  onClickSaved(id);
                }
              }}
              className="z-20 p-1.5 rounded-full hover:bg-gray-50 transition-colors"
            >
              {saved ? (
                <BsBookmarkFill className="text-qp-orange w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <BsBookmark className="text-gray-300 group-hover:text-qp-orange transition-colors w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>

          {/* Logo Section */}
          <div className='flex justify-center px-4'>
            <div className='relative w-14 h-14 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-gray-50 flex items-center justify-center p-2 sm:p-3 shadow-inner group-hover:scale-105 transition-transform duration-500'>
              {logo_url ? (
                <Image 
                  src={logo_url} 
                  alt={name} 
                  layout="fill"
                  objectFit="contain"
                  className='p-2 sm:p-3'
                />
              ) : (
                <div className='text-xl sm:text-2xl font-black text-qp-orange opacity-40'>{name?.[0] || '?'}</div>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className='p-3 sm:p-6 flex flex-col flex-grow text-center space-y-1 sm:space-y-2'>
            <p className='text-[8px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest truncate w-full'>
              {name || 'Board'}
            </p>
            <h3 className='text-xs sm:text-lg font-extrabold text-gray-900 leading-tight group-hover:text-qp-orange transition-colors line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]'>
              {subject}
            </h3>
          </div>

          {/* Decorative Footer */}
          <div className='px-4 pb-3 sm:pb-6'>
            <div className='h-1 w-full bg-gray-50 rounded-full overflow-hidden'>
               <div className='h-full w-0 group-hover:w-full bg-qp-orange transition-all duration-500 rounded-full' />
            </div>
            <div className='mt-2 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0'>
               <span className='text-[8px] sm:text-xs font-bold text-qp-orange uppercase tracking-wide'>Open Paper</span>
               <FiExternalLink className='text-qp-orange text-[8px] sm:text-xs' />
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

questionspostcard.propTypes = {
  id: PropTypes.string.isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  subject: PropTypes.string,
  board: PropTypes.shape({
    name: PropTypes.string,
    logo_url: PropTypes.string
  }),
  onClickSaved: PropTypes.func,
  saved: PropTypes.bool
};

export default questionspostcard