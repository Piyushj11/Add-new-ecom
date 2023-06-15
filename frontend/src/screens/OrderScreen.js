import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export default function OrderScreen() {
  const location = useLocation();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-black">
        <h2 className="text-2xl font-bold">Order Successful</h2>
        <p className="text-blue-500 text-lg mt-4">
          Reference No. {new URLSearchParams(location.search).get('reference')}
        </p>
        <Link to="/" className="flex items-center mt-8 text-blue-500 hover:text-blue-700">
          <FaArrowLeft className="mr-2" />
        </Link>
      </div>
    </div>
  );
}
