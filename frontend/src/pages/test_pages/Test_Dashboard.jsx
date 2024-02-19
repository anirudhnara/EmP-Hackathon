import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const TestDashboard = () => {
	const Navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const [loading, setLoading] = useState(true);
	

	useEffect(() => {
		setLoading(true);
		axios
			.get("http://localhost:8080/", { withCredentials: true })
			.then((res) => {
				if (!res.data.authenticated) {
					Navigate("/login");
				}
			})
			.catch((error) => {
				enqueueSnackbar("Error", { variant: "error", autoHideDuration: 1000 });
			});
	}, []);
	const handleLogout = () => {
		axios
			.delete("http://localhost:8080/logout", { withCredentials: true })
			.then((response) => {
				enqueueSnackbar("Logout Success", {
					variant: "success",
					autoHideDuration: 1000,
				});
				Navigate("/login");
			})
			.catch((error) => {
				enqueueSnackbar("Error", { variant: "error", autoHideDuration: 1000 });
			});
	};
	return (
		<>
			{loading ? (
				<h1 className="text-xl">Loading...</h1>
			) : (
				<div className="p-4">
					<h1 className="text-3xl my-4 text-center">Dashboard</h1>
					<div className="flex flex-col content-center rounded-xl w-[600px] p-4 mx-auto">
						<button
							className="self-center p-2 bg-sky-400 w-[30vw] rounded-xl border-solid border-2 border-sky-400 hover:border-sky-600"
							onClick={handleLogout}
						>
							Logout
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default TestDashboard;
