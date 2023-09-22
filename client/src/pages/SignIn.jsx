import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [ formData, setFormData ] = useState({});
  const [ error, setError ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signin', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setLoading(false);
      if(data.succes === false ){
        setError(true);
        return
      }
     

    }
    catch(err){
      setLoading(false);
      setError(true)
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
      </form>
      <div className="flex gap-2 mt-5">
        <p> Dont an account? </p>
        <Link to="/sign-up">
          <span className="text-blue-500"> {loading ? 'Loading...' : 'Sing Up'} </span>
        </Link>
      </div>
      <p className="text-red-700 mt-5"> {error && 'Something Went Wrong'}</p>
    </div>
  );
}
