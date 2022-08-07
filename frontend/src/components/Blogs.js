import React, { useEffect, useState } from 'react';
import axious from 'axios';
import Blog from './Blog';


const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async ()=>{
    const res= await axious.get("http://localhost:5000/api/blog")
    .catch(errr=> console.log(errr));

    const data = await res.data;
    return data;
  }
  useEffect(()=> {
    sendRequest().then(data=> setBlogs(data.blogs));
  }, [])
  console.log(blogs); 
  return (
    <div>
      {blogs && blogs.map((blog, index)=>
        <Blog
          id ={blog._id}
          isUser = {localStorage.getItem("userId")===blog.user._id}
          title={blog.title}
          description={blog.description}
          imageURL={blog.image}
          userName ={blog.user.name}
         />
      )}
    </div>
  )
}

export default Blogs