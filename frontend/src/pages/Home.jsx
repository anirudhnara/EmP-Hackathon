import React from 'react'
import SocialMediaPost from './layouts/PostView';
import Sidebar from './layouts/Sidebar';
import { Link, useNavigate } from "react-router-dom";
import Header from './Header';
import { useSnackbar } from "notistack";
import { useEffect } from 'react';

import axios from 'axios';
import { useState } from 'react';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const Navigate = useNavigate();
  let volunteers = {}
  let donors = {}

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/", { withCredentials: true })
      .then((res) => {
        if (!res.data.authenticated) {
          Navigate("/login");
        }
        setLoading(false);
      })
      .catch((error) => {
        enqueueSnackbar("Error", { variant: "error", autoHideDuration: 1000 });
      });
  }, []);

  axios.get("http://localhost:8080/projects/get_all_posts")
    .then((res) => {
      setPosts(res.data);
      setLoading(false);
    })


  return (
    <>
      <Header name={window.location.pathname} />
      {loading ? (<h1>Loading</h1>) :

        (
          <div className="flex">

            <Sidebar />

            <div className='border-0 flex-grow p-4'>
              <div className="grid gap-4 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 px-[10%] py-16">
                {posts.map((post, index) => (
                  <div key={index} className={index !== posts.length - 1 ? '' : ''}>
                    <SocialMediaPost
                      header={post.title}
                      body={post.text}
                      username={post.username}
                      isVolunteer={post.isVolunteer}
                      isFundraiser={post.isFundraiser}
                      imgSrc={post.image}
                      showVolunteer={false}
                      numVolunteers={post.numVolunteers}
                      numDonors={post.numDonors}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>)}
    </>
  )
}
export default Home