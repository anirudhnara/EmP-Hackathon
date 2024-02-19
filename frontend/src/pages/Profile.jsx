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

	axios.get("http://localhost:8080/projects/get_user_posts", { withCredentials: true })
		.then((res) => {
			setPosts(res.data);
			setLoading(false);
		})

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

	axios.get("http://localhost:8080/get_user", { withCredentials: true })
		.then((res) => {
			setUser(res.data.user);
		})

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
											<SocialMediaPost header={post.title} body={post.text} username={post.username} isVolunteer={false} isFundraiser={false} imgSrc={post.image} showVolunteer={post.isVolunteer} />
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