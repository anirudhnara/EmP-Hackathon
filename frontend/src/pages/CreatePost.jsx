import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Sidebar from './layouts/Sidebar';
import Header from './Header';

const CreatePost = () => {

	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [isVolunteer, setisVolunteer] = useState(false);
	const [isFundraiser, setisFundraiser] = useState(false);
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);
	const [imagelink, setImageLink] = useState(null);

	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		axios
			.get("http://localhost:8080/", { withCredentials: true })
			.then((res) => {
				if (!res.data.authenticated) {
					navigate("/login");
				}
			})
			.catch((error) => {
				enqueueSnackbar("Error", { variant: "error", autoHideDuration: 1000 });
			});
	}, []);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setImage(file);
		const url = URL.createObjectURL(file);
		setImageUrl(url);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (image) {
			onImageSubmit(image);
		}
	};

	const onImageSubmit = async (image) => {
		const formData = new FormData();
		formData.append("file", image);
		setLoading(true);

		try {
			const response = await axios.post(
				"https://cdn.tennisbowling.com/upload",
				formData
			);
			setImageLink(response.data.location);

		} catch (error) {
			console.error("buns", error);
		}
	};

	const handleSavePost = () => {
		console.log(imagelink)
		let post = {
			title,
			text,
			isVolunteer,
			isFundraiser,
		};

		if (imagelink != null) {
			post.image = imagelink
		}
		setLoading(true);
		axios
			.post('http://localhost:8080/projects/create_post', { post }, { withCredentials: true })
			.then(() => {
				setLoading(false);
				enqueueSnackbar('Post created successfully', { variant: 'success' });
				navigate('/');
			})
			.catch((error) => {
				setLoading(false);
				enqueueSnackbar('Error', { variant: 'error' });
				console.log(error);
			});
	}
	return (
		<>
			<Header name={window.location.pathname} />
			<Sidebar />
			<div className=' p-4 items-center justify-center'>
				<h1 className=' flex items-center justify-center text-3xl my-4'>Create Post</h1>

				<div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
					<div className='my-4'>
						<label className='text-xl mr-4 text-gray-500'>Title</label>
						<input
							type='text'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className='border-2 border-gray-500 px-4 py-2 w-full'

						/>
					</div>
					<div className='my-4'>
						<label className='text-xl mr-4 text-gray-500'>Text</label>
						<input
							type='text'
							value={text}
							onChange={(e) => setText(e.target.value)}
							className='border-2 border-gray-500 px-4 py-2 w-full'

						/>
					</div>
					<form onSubmit={handleSubmit} className="mt-4">
						<input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="w-full py-2 px-4 mb-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring focus:border-blue-300"
						/>
						{imageUrl && (
							<div>
								<button
									type="submit"
									className="block w-full py-2 px-4 mb-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring focus:border-blue-300"
								>
									Submit
								</button>
								<p className="text-lg font-semibold mb-2">
									Preview:
								</p>
								<img
									src={imageUrl}
									alt="Uploaded"
									className="mx-auto rounded-lg max-h-80 mb-4"
								/>
							</div>
						)}
					</form>
					<div className='my-4'>
						<label className='text-xl mr-4 text-gray-500'>Volunteer</label>
						<input
							type='checkbox'
							value={isVolunteer}
							onChange={(e) => setisVolunteer(e.target.value)}
							className='border-2 border-gray-500 px-4 py-2 '

						/>
					</div>
					<div className='my-4'>
						<label className='text-xl mr-4 text-gray-500'>Fundraiser</label>
						<input
							type='checkbox'
							value={isFundraiser}
							onChange={(e) => setisFundraiser(e.target.value)}
							className='border-2 border-gray-500 px-4 py-2 '

						/>
					</div>
					<button className='p-2 bg-sky-800 m-8' onClick={handleSavePost}>
						Save
					</button>
				</div>
			</div>
		</>
	)
}



export default CreatePost