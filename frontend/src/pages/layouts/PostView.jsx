import React from 'react';

const SocialMediaPost = ({ header, body, isVolunteer, isFundraiser, imgSrc, username }) => {
  if (imgSrc == null) {
    imgSrc = "/images/logo.png"
  }
  return (
    <div className="relative max-w-md mx-auto h-[25rem] 2xl:h-[275px] bg-gray-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-4">
      <div className="2xl:flex h-[275px]">
        <div className="2xl:flex-shrink-0">
          <img className="h-48 w-full object-cover 2xl:h-full 2xl:w-48" src={imgSrc} alt="post image" />
        </div>
        <div className="p-4 w-[100%]">
          <a href="#" className="font-bold block text-lg leading-tight font-large text-black hover:underline">{header}</a>
          <a href="#" className="block mt-1 text-md leading-tight font-medium text-black hover:underline min-h-[1rem]"><p>{username}</p></a>
          <p className="mt-2 text-gray-500 h-[60%] 2xl:h-[60%] overflow-auto">{body}</p>
          <div className="absolute bottom-[10px] flex flex-col gap-y-[10px] items-end right-[10px]">
            {isFundraiser && (
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded-md">
                Donate!
              </button>
            )}
            {isVolunteer && (
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 rounded-md">
                Volunteer!
              </button>
            )}
          </div>
        </div>
      </div>
    </div>

  );
};

export default SocialMediaPost;