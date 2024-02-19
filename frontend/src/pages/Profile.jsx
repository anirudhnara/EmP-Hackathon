import React from 'react'
import SocialMediaPost from './layouts/PostView';
import Sidebar from './layouts/Sidebar';
import { Link, useNavigate } from "react-router-dom";
import Header from './Header';
import { useSnackbar } from "notistack";
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const Profile = () => {
	const Navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState({});
	const [posts, setPosts] = useState([]);
	const [deletePost, setDeletePost] = useState("");

	// Check if user is logged in
	useEffect(() => {
		setLoading(true);
		axios
			.get("https://ecocollab.tennisbowling.com:444/", { withCredentials: true })
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

	// See the user's own posts
	useEffect(() => {
		axios.get("https://ecocollab.tennisbowling.com:444/projects/get_user_posts", { withCredentials: true })
			.then((res) => {
				setPosts(res.data);
				setLoading(false);
			})
	}, [])

	// Get information on the user
	useEffect(() => {
		axios.get("https://ecocollab.tennisbowling.com:444/get_user", { withCredentials: true })
			.then((res) => {
				setUser(res.data.user);
			})
	}, [])

	// Delete the post
	const handleDeletePost = (post_title) => {
		axios.post(`https://ecocollab.tennisbowling.com:444/projects/delete_post`, { post_title: post_title }, { withCredentials: true })
			.then((res) => {
				setPosts(posts.filter((post) => post.title !== post_title));
				enqueueSnackbar("Post Deleted", { variant: "success", autoHideDuration: 1000 });
			})
			.catch((error) => {
				// Handle error
				enqueueSnackbar("Error deleting post", { variant: "error", autoHideDuration: 1000 });
			});
	};

	return (
		<>
			<Header name={window.location.pathname} />
			<Sidebar />
			{loading ? (<h1>Loading</h1>) :

				(
					<>
						<div className="p-4">
							<h1 className="text-3xl my-4 text-center">{user.username}</h1>
							<div className="flex flex-col content-center rounded-xl w-[600px] p-4 mx-auto">

							</div>
						</div>
						<div className="flex">

							{/* <Sidebar /> */}

							<div className='border-0 flex-grow p-4'>
								<div className="grid gap-4 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 px-[10%] py-16">
									{posts.map((post, index) => (
										<div key={index} className={index !== posts.length - 1 ? '' : ''}>
											<SocialMediaPost
												header={post.title}
												body={post.text}
												username={post.username}
												isVolunteer={false}
												isFundraiser={false}
												imgSrc={post.image}
												showVolunteer={post.isVolunteer}
												listVolunteers={post.volunteers}
												onDelete={() => handleDeletePost(post.title)} />
										</div>)
									)}
								</div>
							</div>
						</div>
					</>)}
		</>
	);
};

export default Profile;
