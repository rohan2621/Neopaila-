import React from 'react'
import { Search } from './Search';
import { Link } from 'react-router';

const SideMenu = () => {
  return (
    <div className='px-4 h-max sticky'>
      <h1 className='mb-4 text-sm font-medium'>Search</h1>
      <Search/>
      <h1 className='mb-4 text-sm font-medium'>Filter</h1>
      <div className="flex flex-col gap-2 text-sm">
        <label htmlFor="" className='flex items-center gap-2 cursor-pointer'></label>
      </div>
      <h1 className='mb-4 text-sm font-medium'>Categories</h1>
      <div className='flex flex-col gap-2 text-sm'>
        <Link className='underline' to={'/posts'}>All</Link>
        <Link className='underline' to={'/posts?cat=web-design'}>Web Design</Link>
        <Link className='underline' to={'/posts?cat=development'}>Development</Link>
        <Link className='underline' to={'/posts?cat=databases'}>Databases</Link>
        <Link className='underline' to={'/posts?cat=seo'}>Search Engine</Link>
        <Link className='underline' to={'/posts?cat=marketing'}>Marketing</Link>
        
      </div>
    </div>
  )
}

export default SideMenu