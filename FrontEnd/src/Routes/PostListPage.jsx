import React, { useState } from 'react'
import PostList from '../Components/PostList'
import SideMenu from '../Components/SideMenu'

export const PostListPage = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className='px-5'>
      <h1 className="mb-8 text-2xl "> Development Blog</h1>
      <button onClick={()=>setOpen((preVal)=>!preVal)} className='md:hidden bg-[#540000] text-sm mb-4 text-white px-4 py-2 rounded-2xl'>{ open?'Close':'Filter or Search'}</button>
      <div className="flex flex-col-reverse md:flex-row gap-8">
        <div className="">
            <PostList/>
        </div>
        <div className={`${open?"bloc":'hidden'} md:block`} >
          <SideMenu/>
        </div>
    </div>
    </div>
  )
}
