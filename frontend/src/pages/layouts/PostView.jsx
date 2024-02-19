import React from 'react';
import { useState } from 'react';

const Popup = ({ onClose, volunteers }) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 border border-gray-300 shadow-md rounded">
      <h2 className="text-lg font-semibold mb-4">Volunteers</h2>
      <ul className="list-disc pl-6">
        {volunteers.map((volunteer, index) => (
          <li key={index}>{volunteer}</li>
        ))}
      </ul>
      <button onClick={onClose} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4">Close</button>
    </div>
  );
};



const SocialMediaPost = ({ header, body, isVolunteer, isFundraiser, imgSrc, username, showVolunteer, numVolunteers, numDonors}) => {
  if (imgSrc == null) {
    imgSrc = "/images/logo.png"
  }

  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="relative max-w-md mx-auto h-[25rem] 2xl:h-[275px] bg-gray-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-4">
      <div className="2xl:flex h-[275px]">
        <div className="2xl:flex-shrink-0">
          <img className="h-48 w-full object-cover 2xl:h-full 2xl:w-48" src={imgSrc} alt="post image" />
        </div>
        <div className="p-4 w-[100%]">
          <a href={"/postpage/"+header} className="font-bold block text-lg leading-tight font-large text-black hover:underline">{header}</a>
          <a href="#" className="block mt-1 text-md leading-tight font-medium text-black hover:underline min-h-[1rem]"><p>{username}</p></a>
          <p className="mt-2 text-gray-500 h-[60%] 2xl:h-[60%] overflow-auto">{body}</p>
          
          <div className="absolute bottom-[10px] flex flex-col gap-y-[10px] items-end right-[10px]">
            {isFundraiser && (
              <>
                <p>{numDonors}</p>
                <a className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded-md">
                  Donate!
                </a>
              </>
            )}
            {isVolunteer && (
              <>
                <p>{numVolunteers}</p>
                <a className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 rounded-md">
                  Volunteer!
                </a>
              </>
            )}
            {showVolunteer && (
              <a className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 rounded-md" onClick={togglePopup}>
                See Volunteers
              </a>

            ) }

          </div>
        </div>
      </div>
      {showPopup && <Popup onClose={togglePopup} volunteers={volunteers} />}
    </div>

  );
};

export default SocialMediaPost;