import React from 'react'
import { SignUp } from '@clerk/clerk-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export const RegisterPage = () => {
  useGSAP(() => {
    gsap.from(".register", {
      scale: 0,
      opacity: 0,
    
    
      duration: 0.7,
      ease: "power1.inOut"
      
    })
  },[])
  return (
    <div className='flex register items-center justify-center h-[calc(100vh-80px)]  hide-scrollbar'>
      <div className='min-h-[600px] w-full flex justify-center items-center'>
        <SignUp signInUrl='/login' className="w-20"  appearance={{
    elements: {
      formButtonPrimary: 'bg-slate-500 hover:bg-slate-400 text-sm w-[50vw]]',
    },
  }}/>
      </div>
    </div>
  )
}
