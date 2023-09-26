import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center my-7"> Profile </h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.profilePic}
          className="h-24 w-24 self-center mb-4 cursor-pointer rounded-full object-cover"
        />
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          className="border border-solid border-black-500 bg-slate-200 rounded-md mb-3 mt-3"
          placeholder="Username"
        />
        <input
        defaultValue={currentUser.email}
          type="email"
          id="email"
          className="border border-solid border-black-500 bg-slate-200 rounded-md mb-3"
          placeholder="Email"
        />
        <input
          type="password"
          id="password"
          className="border border-solid border-black-500 bg-slate-200 rounded-md"
          placeholder="password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer"> Delete Account </span>
        <span className="text-red-700 cursor-pointer"> Sign Out </span>
      </div>
    </div>
  );
}
