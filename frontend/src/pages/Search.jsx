import React from 'react';
import Header from './Header';
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
	const Navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
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

    return (
        <>
            <Header name={window.location.pathname} />
            <h1>hello</h1>
        </>
    );
}




export default Search