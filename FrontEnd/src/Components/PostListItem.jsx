import React from 'react'
import { Img } from './Img'
import { Link } from 'react-router'

const PostListItem = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-6 xl:gap-8">
      {/* Image */}
      <div className="w-full xl:w-1/3">
        <Img
          src="featured1.jpg"
          alt="Post thumbnail"
          className="w-full h-64 sm:h-80 xl:h-full rounded-2xl object-cover"
              />
              
      </div>

      {/* Details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link
          to="/test"
          className="text-lg sm:text-xl md:text-2xl font-semibold hover:underline"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit nulla
          adipisci totam cupiditate laboriosam quibusdam reiciendis cum beatae
          aperiam!
        </Link>

        <div className="flex flex-wrap items-center gap-1 text-gray-500 text-xs sm:text-sm">
          <span>Written by</span>
          <Link className="text-blue-800 hover:underline">John Doe</Link>
          <span>on</span>
          <Link className="text-blue-800 hover:underline">Web Design</Link>
          <span>· 2 days ago</span>
        </div>

        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
          doloribus necessitatibus nihil rerum quaerat velit mollitia
          repellendus veniam recusandae delectus rem ab tempora provident,
          voluptatum harum placeat iusto aspernatur quia.
        </p>

        <Link
          to="/test"
          className="underline text-blue-800 text-sm hover:text-blue-600"
        >
          Read More
        </Link>
      </div>
    </div>
  )
}

export default PostListItem
