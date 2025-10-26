import React from 'react'
import { useUser } from "@clerk/clerk-react";

export const Write = () => {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) {
    return (<div>Loading .....</div>)
  }
  if (isLoaded && !isSignedIn) {
    return <div>You should loged In</div>
  }
  return (
    <div>
      <h1>Create a New Post 
        <form action="">
          <button>Add a cover image</button>
          <input type="text" placeholder='My Awesome Story ' />
          <div className="">
            <label htmlFor="">Choose a category: </label>
              <select name="cat" id="">
                <option value="general">General</option>
                <option value="web-desgin">Web Design</option>
                <option value="development">Development</option>
                <option value="databases">Databases</option>
                <option value="seo">Seo</option>
                <option value="marketing">Marketing</option>
              </select>
            
          </div>
          <textarea name="" placeholder='A Short Description' id=""/>
      </form>
      </h1>
    </div>
  )
}
