import React from 'react';

const NoFriendsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center card bg-base-200 p-6 ">
      <img
        src="https://media.giphy.com/media/3og0IPxMM0erATueVW/giphy.gif"
        alt="Sad"
        className="w-40 h-40 mb-4 rounded-btn opacity-70"
      />
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Friends Found</h2>
      <p className="text-gray-500">Try searching again or add some new friends!</p>
    </div>
  );
};

export default NoFriendsFound;
