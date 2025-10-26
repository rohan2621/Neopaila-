import React from 'react'
import { FaBookmark } from "react-icons/fa";
import { Link } from 'react-router';
import { RiDeleteBin6Line } from 'react-icons/ri';
export const PostMenuAction = () => {
  return (
      <div>
          <h1 className='mb-4 mt-8 text-sm font-medium'>Action</h1>
          <div className='flex items-center gap-2 py-2 text-sm cursor-pointer'>
              <FaBookmark />
              <span>Save this Post</span>
          </div>
          <div className='flex items-center gap-2 py-2 text-sm cursor-pointer'>
              <RiDeleteBin6Line size="1.22em" color='red' />
              <span>Delete this Post</span>
          </div>
    </div>
  )
}
