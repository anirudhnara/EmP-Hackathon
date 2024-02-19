import React from 'react'
import SocialMediaPost from './layouts/PostView';
import Sidebar from './layouts/Sidebar';

import axios from 'axios';
import { useState } from 'react';

const Home = () => {

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  
  axios.get("http://localhost:8080/projects/get_all_posts")
    .then((res) => {
      setPosts(res.data);
      setLoading(false);
    })
    
  return (<>{loading ? (<h1>Loading</h1>) :

    (
    <div className="flex"> 

      <Sidebar/>

      <div className='border-0 flex-grow p-4'>
        <div className="grid gap-4 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 px-[10%] py-16">
          {posts.map((post, index) => (
            <div key={index} className={index !== posts.length - 1 ? '' : ''}>
              <SocialMediaPost header={post.title} body={post.text} username={post.username} isVolunteer={post.isVolunteer} isFundraiser={post.isFundraiser} imgSrc={post.image} />
            </div>
          ))} 
        </div>
      </div>
    </div>)}
  </>
  )
}

export default Home