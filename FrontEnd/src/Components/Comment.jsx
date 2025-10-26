import React from 'react'
import { Img } from './Img';

const Comment = () => {
  return (
      <div className='p-4 bg-slate-50 rounded-xl mb-8'>
          <div className="flex items-center gap-4">
              <Img src={'userImg.jpg'} className={"w-10 h-10 rounded-full object-cover"} w={'40'}/>
              <span className='font-medium'>Jhon Doe </span>
              <span className='text-sm text-gray-500'>2 days ago</span>
              
          </div>
          <div className='mt-4'>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis tempore alias explicabo ipsam aliquam quaerat voluptates exercitationem. Incidunt, ducimus.</p>
          </div>
    </div>
  )
}

export default Comment
