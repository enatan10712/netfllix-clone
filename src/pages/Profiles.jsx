import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profiles = () => {
  const navigate = useNavigate();
  const profiles = [
    { name: 'User 1', avatar: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' },
    { name: 'User 2', avatar: 'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg' },
    { name: 'Kids', avatar: 'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-v886sg9prev6m22j.jpg' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-netflix-black text-white">
      <h1 className="text-3xl md:text-6xl mb-8 font-medium">Who's watching?</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {profiles.map((profile, index) => (
          <div
            key={index}
            onClick={() => navigate('/')}
            className="group flex flex-col items-center cursor-pointer"
          >
            <div className="w-24 h-24 md:w-40 md:h-40 rounded overflow-hidden border-2 border-transparent group-hover:border-white transition duration-300">
              <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
            </div>
            <span className="mt-4 text-gray-400 group-hover:text-white transition duration-300 text-lg">
              {profile.name}
            </span>
          </div>
        ))}
      </div>
      <button className="mt-12 border border-gray-500 text-gray-500 px-6 py-2 uppercase tracking-widest hover:text-white hover:border-white transition duration-300">
        Manage Profiles
      </button>
    </div>
  );
};

export default Profiles;
