import React from 'react';

const Sidebar = () => {
    return (<>
        <div className="w-[60px] -top-0 -left-0 flex flex-col justify-center h-screen bg-gray-900 text-white p-4  -z-10"> </div>
        <div className=" flex flex-col justify-center h-screen bg-gray-900 text-white p-4 fixed -z-10">
            <div className=" mt-auto flex flex-col items-center mb-4">
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black mb-4 ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L2 7v10a2 2 0 002 2h16a2 2 0 002-2V7l-10-5z" />
                    </svg>

                </button>
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>

                </button>
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>

                </button>
            </div>
            <div className="mt-auto flex items-center">
                
            </div>
        </div></>
    );
}




export default Sidebar