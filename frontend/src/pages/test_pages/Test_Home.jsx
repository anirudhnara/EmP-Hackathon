import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
const TestHome = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const Navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(true);
	useEffect(() => {
        setLoading(true);
		axios
			.get("http://localhost:8080/", { withCredentials: true })
			.then((res) => {
				if (res.data.authenticated) {
					Navigate("/dashboard");
				} else {
                    Navigate("/login");
                }
                setLoading(false);
			})
			.catch((error) => {
				enqueueSnackbar("Error", { variant: "error", autoHideDuration: 1000 });
			});
	}, []);

	
};

export default TestHome;
