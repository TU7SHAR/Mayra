import React from "react";

const Subscription = () => {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">Subscribe to our emails</h2>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Email"
            className="p-2 border border-gray-300 rounded-l-md w-1/3"
          />
          <button className="bg-yellow-800 text-white p-2 rounded-r-md">
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
