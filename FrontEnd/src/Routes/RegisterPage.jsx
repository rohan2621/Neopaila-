import React from 'react'
import { SignUp } from '@clerk/clerk-react'

export const RegisterPage = () => {
  return (
    <div className='flex items-center justify-center h-[calc(100vh-80px)] overflow-auto hide-scrollbar'>
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
