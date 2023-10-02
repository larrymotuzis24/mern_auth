import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";

export default function SignUp() {
  const [ formData, setFormData ] = useState({});
  const [ error, setError ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log('handle submit called')
    e.preventDefault();
    try{
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      console.log('Response Data:', data);
      setLoading(false);
      if(data.succes === false ){
        setError(true);
        return
      }
     

      navigate('/sign-in');

    }
    catch(err){
      setLoading(false);
      setError(true)
    }
    
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7"> Sign Up </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg "
          onChange={handleChange}
        />
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
        type="submit"
        disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
          {" "}
          Submit{" "}
        </button>
        <Oauth />
      </form>
      <div className="flex gap-2 mt-5">
        <p> Have an account? </p>
        <Link to="/sign-in">
          <span className="text-blue-500"> {loading ? 'Loading...' : 'Sing In'} </span>
        </Link>
      </div>
      <p className="text-red-700 mt-5"> {error && 'Something Went Wrong'}</p>
    </div>
  );
}
