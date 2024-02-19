import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import Sidebar from './layouts/Sidebar';

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:8080/projects/get_post',
                    { post_title: id },
                    { withCredentials: true }
                );
                setPost(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData()
    }, [id]);
    console.log(post);
    return (
        <>
            <Sidebar />
            <Header name={window.location.pathname} />


            { /*<div className="fixed inset-0 flex justify-center items-center bg-gray-100">
                <div className="w-full max-w-lg bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 relative">
                            <img className="h- w-full object-cover md:h-full md:w-48" src={post.image} alt="post image" />
                        </div>
                        <div className="p-4 md:w-2/3">
                            <a href="/PostPage" className="font-bold block text-lg leading-tight font-large text-black hover:underline">{post.title}</a>
                            <a href="#" className="block mt-1 text-md leading-tight font-medium text-black hover:underline min-h-[1rem]"><p>{post.username}</p></a>
                            <p className="mt-2 text-gray-500">{post.text}</p>

                            <div className="absolute bottom-4 md:bottom-auto right-4 md:right-auto">
                                {/* get if user is volunteer 
			{post.isVolunteered ? <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 rounded-md">Unvolunteer</button> : <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 rounded-md">Volunteer</button>}
			<h1></h1>
			{/* get if user is funraiser 
			{post.isFundraiser ? <button className=" mt-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 rounded-md">Refund</button> : <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 rounded-md">Donate</button>}

		</div >
                        </div >
                    </div >
                </div >
            </div >

    */ }
            < div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center" >
                <div className="max-w-lg w-full bg-white shadow-md rounded-md overflow-hidden">
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
                        <p className="text-gray-500 mb-2">Posted by {post.username}</p>
						{post.image != undefined ?
                        <img src={post.image} alt="Post" className="w-full h-auto mb-4" /> 
						: 
						<img src="/images/logo.png" alt="Post" className="w-full h-auto mb-4" />}
                        <p className="text-gray-700 mb-4">{post.text}</p>
                        <div className="flex justify-between">
                            {post.isVolunteered ? (
                                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 rounded-md">Unvolunteer</button>
                            ) : (
                                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 rounded-md">Volunteer</button>
                            )}
                            {post.isFundraiser ? (
                                <button className="mt-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 rounded-md">Refund</button>
                            ) : (
                                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 rounded-md">Donate</button>
                            )}
                        </div>
                    </div>
                </div>
            </div >

        </>
    );
};

export default PostPage;
