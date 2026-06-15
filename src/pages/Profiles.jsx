import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Profiles = () => {
  const navigate = useNavigate();
  const profiles = [
    { name: 'User 1', avatar: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' },
    { name: 'User 2', avatar: 'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg' },
    { name: 'Kids', avatar: 'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-v886sg9prev6m22j.jpg' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-netflix-black text-white px-4">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl md:text-6xl mb-12 font-medium"
      >
        Who's watching?
      </motion.h1>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center gap-8 md:gap-12"
      >
        {profiles.map((profile, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            onClick={() => navigate('/')}
            className="group flex flex-col items-center cursor-pointer"
          >
            <div className="w-24 h-24 md:w-40 md:h-40 rounded overflow-hidden border-[3px] border-transparent group-hover:border-white transition-all duration-300 transform group-hover:scale-105">
              <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
            </div>
            <span className="mt-4 text-gray-500 group-hover:text-white transition duration-300 text-xl font-light">
              {profile.name}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 border border-gray-600 text-gray-600 px-8 py-2.5 uppercase tracking-widest text-sm hover:text-white hover:border-white transition duration-300"
      >
        Manage Profiles
      </motion.button>
    </div>
  );
};

export default Profiles;
