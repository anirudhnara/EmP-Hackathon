
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Header = (props) => {
  const { name } = props
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const logout = () => {
    axios
      .delete("http://localhost:8080/logout", { withCredentials: true })
      .then((response) => {
        enqueueSnackbar("Logout Success", {
          variant: "success",
          autoHideDuration: 1000,
        });
        window.location.href = "/login";
      })
      .catch((error) => {
        enqueueSnackbar("Error", { variant: "error", autoHideDuration: 1000 });
      });
  }

  useEffect(() => {
    setLoading(true);
    setLoggedIn(false);
    let res = axios
      .get("http://localhost:8080/", { withCredentials: true })
      .then((res) => {
        if (res.data.authenticated) {
          setLoggedIn(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        enqueueSnackbar("Error", { variant: "error", autoHideDuration: 1000 });
      });
    console.log(res)
  }, []);

  function CreateHeaderLinks() {
    if (loggedIn) {
      return (
        <div className='flex items-center gap-10'>
          <a href="./profile" className={` ${window.location.pathname === '/profile' ? 'text-[gray]' : 'text-[blue]'}`}>
            <p className='text-lg'>profile</p>
          </a>
          <a  href="javascript:void(0);" onClick={logout} className="text-[blue]">
            <p className='text-lg'>logout</p>
          </a>
        </div>
      );
    } else {
      return (
        <div className='flex items-center gap-10'>
          <a href="./login" className={` ${window.location.pathname === '/login' ? 'text-[gray]' : 'text-[blue]'}`}>
            <p className='text-lg'>Log In</p>
          </a>
          <a href="./register" className={` ${window.location.pathname === '/register' ? 'text-[gray]' : 'text-[blue]'}`}>
            <p className='text-lg'>Register</p>
          </a>
        </div>
      )
    }
  }
  return (<>
    <div className="sticky top-0 z-10">
      <div className='sticky top-0 w-[100%] bg-tahiti-200 h-[75px] px-10 flex items-center justify-between z-10'>
        <a href="/">
          <div className='flex items-center'>
            <img src={"/images/logo.png"} alt='Logo' className='h-[50px] w-[50px] mr-5 mt-2'/>
            <h1 className='text-2xl font-bold'>EcoCollab</h1>
          </div></a>
        {loading ? (<h1 className="text-xl">Loading...</h1>) : (CreateHeaderLinks())}
      </div>
    </div>
  </>
  )
}

export default Header