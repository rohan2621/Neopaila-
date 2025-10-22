import React from 'react'
import { Img } from './Img';
import { Link } from 'react-router';
import { Image } from '@imagekit/react';

export const FeaturedPost = () => {
  return (
    <div className='mt-8 flex flex-col lg:flex-row gap-8'>
      <div className='w-full lg:w-1/2 flex flex-col gap-4'>
        {/* Image */}
        <Img src={"featured.jpg"} className={"rounded-3xl object-cover"} />
        {/* details */}
        <div className='flex items-center gap-4'>
          
        <h1 className='font-semibold lg:text-lg'>01.</h1>
        <Link className='text-blue-700 lg:text-lg'> Web Design</Link>
          <span className='text-gray-400'>2 days ago</span>
          
        </div>
        <Link to={"/test"} className='text-xl lg:text-3xl font-semibold lg:font-bold'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro, quasi.</Link>
      </div>
      <div className='w-full lg:w-1/2 flex flex-col gap-4'>
        {/* Second */}
        <div className='flex justify-between gap-4 lg:h-1/3'>
          <Img src={"featured1.jpg"} className={'rounded-3xl object-cover w-1/3 aspect-video' } />
          <div className='w-2/3'>
            <div className='flex items-center gap-4 text-sm lg:text-base mb-4'>
              
        <h1 className='font-semibold '>01.</h1>
        <Link className='text-blue-700 '> Web Design</Link>
            <span className='text-gray-400'>2 days ago</span>
              </div>
            <Link to={"/test"} className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro, quasi.</Link>
            
          </div>
        </div>
        {/* third */}
        <div className='flex justify-between gap-4 lg:h-1/3'></div> 
        {/* fourth */}
        <div className='flex justify-between gap-4 lg:h-1/3'></div>
      </div>
    </div>
  )
}
