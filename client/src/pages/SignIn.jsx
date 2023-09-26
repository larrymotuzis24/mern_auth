import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, singInFailure, singInSuccess } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from 'react-redux';
import Oauth from "../components/Oauth";

export default function SignIn() {
  const [ formData, setFormData ] = useState({});
  const { error, loading } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      dispatch(signInStart());

      const res = await fetch('/api/auth/signin', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      
      if(data.succes === false ){
        dispatch(singInFailure(data));
        return
      }
      dispatch(singInSuccess(data));
     
      navigate('/');
    }
    catch(err){
      dispatch(singInFailure(err));
    }
    
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7"> Sign In </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg "
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg "
          onChange={handleChange}
        />
        <button 
        disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
          {" "}
          Sign In {" "}
        </button>
        <Oauth /> 
      </form>
      <div className="flex gap-2 mt-5">
        <p> Dont an account? </p>
        <Link to="/sign-up">
          <span className="text-blue-500"> {loading ? 'Loading...' : 'Sing Up'} </span>
        </Link>
      </div>
      <p className="text-red-700 mt-5"> {error ? error.message || 'Something Went Wrong' : ''}</p>
    </div>
  );
}
