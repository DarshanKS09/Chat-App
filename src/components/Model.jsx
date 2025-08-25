import React, { useState } from 'react';

const Model = ({setCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.address) {
      alert("Please fill all fields");
      return;
    }
    setCreate(0);
     console.log(formData.address);
    console.log(formData.name);
  };


  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-[#1e2a38] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#263544] p-6 rounded-2xl shadow-lg text-white space-y-5"
      >
        <h2 className="text-orange-400 text-2xl font-bold text-center">Create Account</h2>

        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm text-orange-300 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 rounded-md bg-[#1e2a38] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter your name"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="address" className="text-sm text-orange-300 mb-1">Wallet Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="p-2 rounded-md bg-[#1e2a38] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="0x..."
          />
        </div>

        <button 
          type="submit"
          className="w-full py-2 bg-gray-700 text-orange-400 hover:text-orange-600 rounded-md transition duration-200"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Model;
