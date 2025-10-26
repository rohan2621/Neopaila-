import React from 'react'
import { Img } from './../Components/Img';
import { Link } from 'react-router';
import { Image } from '@imagekit/react';
import { PostMenuAction } from '../Components/PostMenuAction';
import { MainCateValues } from '../utils/Resource';
import { Search } from './../Components/Search';
import Comment from '../Components/Comment';
import Comments from '../Components/Comments';

export const SinglePostPage = () => {
  return (
    <div className='flex flex-col gap-8'>
      {/* details */}
      <div className='flex gap-8' > 
        <div className='lg:w-3/5 flex flex-col gap-8'>
          <h1 className='text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold '>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere, impedit!</h1>
          <div className=" flex items-center gap-2 text-gray-400 text-sm">

          <span>Written by</span>
          <Link className='text-blue-800'> Jhon Doe</Link>
          <span>on</span>
          <Link className='text-blue-800'>Web Design</Link>
          <span>2 days ago</span>
          </div>
          <p className='text-gray-500 font-medium'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem harum sequi, nesciunt itaque ex, non doloremque labore, nulla quibusdam ab perferendis cumque soluta iure eos! Voluptates, placeat. Vitae, voluptas sequi.</p>
        </div>
        <div className='hidden lg:block w-2/5'>
          <Img src={"featured.jpg"} w="600" className={'rounded-2xl'}/>
        </div>
      </div>
      {/* content */}
      <div className='flex flex-col md:flex-row gap-12'>
        {/* text */}
        <div className='lg:text-lg flex flex-col gap-6 text-justify'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis aliquam non nulla voluptatibus deserunt exercitationem qui recusandae nisi enim ab quaerat similique, accusamus nihil voluptatum soluta doloribus, earum deleniti maxime placeat laboriosam facilis laudantium fuga error? Illum, dolorum repellendus, maxime, velit qui rerum eaque sapiente quasi tempora unde atque blanditiis voluptates libero dignissimos harum laborum expedita impedit repellat? Modi blanditiis voluptatem repellendus officiis omnis sequi beatae quia nostrum vero qui temporibus iste deserunt et, officia, iusto, laboriosam unde aut enim!</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis aliquam non nulla voluptatibus deserunt exercitationem qui recusandae nisi enim ab quaerat similique, accusamus nihil voluptatum soluta doloribus, earum deleniti maxime placeat laboriosam facilis laudantium fuga error? Illum, dolorum repellendus, maxime, velit qui rerum eaque sapiente quasi tempora unde atque blanditiis voluptates libero dignissimos harum laborum expedita impedit repellat? Modi blanditiis voluptatem repellendus officiis omnis sequi beatae quia nostrum vero qui temporibus iste deserunt et, officia, iusto, laboriosam unde aut enim!</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis aliquam non nulla voluptatibus deserunt exercitationem qui recusandae nisi enim ab quaerat similique, accusamus nihil voluptatum soluta doloribus, earum deleniti maxime placeat laboriosam facilis laudantium fuga error? Illum, dolorum repellendus, maxime, velit qui rerum eaque sapiente quasi tempora unde atque blanditiis voluptates libero dignissimos harum laborum expedita impedit repellat? Modi blanditiis voluptatem repellendus officiis omnis sequi beatae quia nostrum vero qui temporibus iste deserunt et, officia, iusto, laboriosam unde aut enim!</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis aliquam non nulla voluptatibus deserunt exercitationem qui recusandae nisi enim ab quaerat similique, accusamus nihil voluptatum soluta doloribus, earum deleniti maxime placeat laboriosam facilis laudantium fuga error? Illum, dolorum repellendus, maxime, velit qui rerum eaque sapiente quasi tempora unde atque blanditiis voluptates libero dignissimos harum laborum expedita impedit repellat? Modi blanditiis voluptatem repellendus officiis omnis sequi beatae quia nostrum vero qui temporibus iste deserunt et, officia, iusto, laboriosam unde aut enim!</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis aliquam non nulla voluptatibus deserunt exercitationem qui recusandae nisi enim ab quaerat similique, accusamus nihil voluptatum soluta doloribus, earum deleniti maxime placeat laboriosam facilis laudantium fuga error? Illum, dolorum repellendus, maxime, velit qui rerum eaque sapiente quasi tempora unde atque blanditiis voluptates libero dignissimos harum laborum expedita impedit repellat? Modi blanditiis voluptatem repellendus officiis omnis sequi beatae quia nostrum vero qui temporibus iste deserunt et, officia, iusto, laboriosam unde aut enim!</p>
        </div>
        {/* menu */}
        <div className='px-5 h-max sticky top-8'>
          <h1 className=' mb-4 text-sm font-medium'>Author</h1>
          <div className=' flex flex-col gap-4'>

          <div className='flex items-center gap-8'>
            <Img src={"userImg.jpg"} className={'w-12 h-12 rounded-full object-cover'} w={'48'} h={'48'}/>
            <Link>Jhon Doe</Link>
          </div>
            <p className='text-sm  text-gray-500'>Lorem ipsum dolor sit amet consectetur.</p>
            <div className='flex gap-2'>
              <Link>
                <Img w={'20'} src={'facebook.svg'}/>
              </Link>
              <Link>
              <Img w={'20'}  src={'instagram.svg'}/>
              </Link>
          </div>
            </div>
          <PostMenuAction />
          <h1 className='mt-8 mb-4 text-sm font-medium'>Categories</h1>
          <div className='flex flex-col gap-2 text-sm'>
             {MainCateValues.map((link, i) => (
                      <Link
                        key={i}
                        to={link.path}
                    
                        className={`underline`}
                      >
                        {link.name}
                      </Link>
                    ))}

          </div>
          <h1 className='mt-8 mb-4 text-sm font-medium'>Search</h1>
          <Search />
        </div>
      </div>
      <Comments/>
    </div>
  )
}
