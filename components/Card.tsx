import React from 'react';

const Card = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="group w-80 p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-bold text-gray-800">¡Hola, Next.js!</h2>
        <p className="text-gray-600 " >Esta es una tarjeta animada con Tailwind.</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md transition-opacity duration-500 opacity-80 group-hover:opacity-100">
          ¡Haz clic!
        </button>
      </div>
    </div>
  );
};

export default Card;