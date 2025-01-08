'use client'

import React, { useState } from 'react';

export default function Registeration() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password, email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
      } else {
        setMessage({ type: 'error', text: data.results });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <center>
      <div className="m-auto mt-20">
        <h1 className="text-3xl font-bold text-center">Registration Form:</h1>

        <form
          className="flex gap-5 flex-col justify-center mt-7 w-[350px] bg-gray-400 px-4 py-5 text-black rounded-lg"
          onSubmit={onSubmitHandler}
        >
          <div className="space-x-5">
            <label>Name</label>
            <input
              placeholder="Enter your Name"
              type="text"
              className="px-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-x-5">
            <label>Password</label>
            <input
              placeholder="Enter your Password"
              type="password"
              className="px-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-x-5">
            <label>Email</label>
            <input
              placeholder="Enter your Email"
              type="email"
              className="px-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white w-full"
          >
            Register
          </button>
        </form>

        {message && (
          <div
            className={`mt-5 p-2 rounded-lg text-white ${
              message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </center>
  );
}
