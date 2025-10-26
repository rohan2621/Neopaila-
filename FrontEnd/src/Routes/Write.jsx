import React from 'react'
import { useUser } from "@clerk/clerk-react";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export const Write = () => {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) {
    return (<div>Loading .....</div>)
  }
  if (isLoaded && !isSignedIn) {
    return <div>You should loged In</div>
  }
  return (
    <div className='h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6'>
      <h1 className='text-xl font-light'>Create a New Post </h1>
        <form action="" className='flex flex-col gap-6 flex-1 mb-6'>
          <button className='p-2 w-max shadow-md rounded-xl text-sm text-gray-500 bg-white'>Add a cover image</button>
          <input className='text-4xl font-semibold bg-transparent outline-none' type="text" placeholder='My Awesome Story ' />
          <div className="flex items-center gap-4">
            <label htmlFor="" className='text-sm'>Choose a category: </label>
              <select name="cat" id="" className='p-2 rounded-xl bg-white shadow-md'>
                <option value="general">General</option>
                <option value="web-desgin">Web Design</option>
                <option value="development">Development</option>
                <option value="databases">Databases</option>
                <option value="seo">Seo</option>
                <option value="marketing">Marketing</option>
              </select>
            
          </div>
          <textarea className='p-4 rounded-xl bg-white shadow-md' name="" placeholder='A Short Description' id="" />
          <ReactQuill className='flex-1  rounded-xl bg-white shadow-md' theme="snow" />
          <button className='bg-[#540000] mt-4 p-2 w-36 text-white font-medium rounded-xl'>Send</button>
      </form>
    </div>
  )
}
