import React from 'react';

const Sidebar = () => {
    return (<>

        <div className=" flex flex-col justify-center h-screen bg-gray-900 text-white p-4 fixed">
            <div className=" mt-auto flex flex-col items-center mb-4">
                <a href="/" className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black mb-4 ">
                    <img src="https://www.svgrepo.com/show/529026/home.svg" className="h-6 w-6" />
                </a>
                <a href="/createpost" className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black mb-4">
                    <img src="https://www.svgrepo.com/show/528985/gallery-edit.svg" className="w-6 h-6" />
                </a>
                <a href="/search" className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black mb-4">
                    <img src="https://www.svgrepo.com/show/529700/magnifer.svg" className="w-6 h-6" />
                </a>
                <a href="/profile" className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black mb-4">
                    <img src="https://www.svgrepo.com/show/529279/user-circle.svg" className="w-6 h-6" />
                </a>
            </div>
            <div className="mt-auto flex items-center">

            </div>
        </div></>
    );
}




export default Sidebar