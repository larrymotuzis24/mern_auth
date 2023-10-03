import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, logUserOut } from "../../redux/user/userSlice";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [ updateSuccess, setUpdate ] = useState(false);

  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  };

  const handleLogOut = async() => {
    try {
      await fetch('/api/user/signout', {
        method:'GET'
      })
      dispatch(logUserOut())
      
    }
    catch(err){
      console.log(err)
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method:'DELETE'
      });
      const data = await res.json();
      if(data.success === false ){
        return dispatch(deleteUserFailure())
      }
      dispatch(deleteUserSuccess());
    }
    catch(err) {

    }
  };
 

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers :{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
      }
      
      dispatch(updateUserSuccess(data));
      setUpdate(true);

    }
    catch(error){
      dispatch(updateUserFailure(error));
    }
  };

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / 
        snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePic: downloadURL })
        );
      }
    );
  };



  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center my-7"> Profile </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}> 
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={ formData.profilePic || currentUser.profilePic }
          className="h-24 w-24 self-center mb-4 cursor-pointer rounded-full object-cover"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-md self-center">
          {imageError ? (
            <span className="text-red-700"> Error Uploading Image</span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">{`Uploading ${imagePercent}%`} </span>
          ): imagePercent === 100 ? (
            <span className="text-green-500"> Upload Completed </span>
          ):'' }
        </p>
        <input
          defaultValue={currentUser.username }
          type="text"
          id="username"
          className="border border-solid border-black-500 bg-slate-200 rounded-md mb-3 mt-3"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          className="border border-solid border-black-500 bg-slate-200 rounded-md mb-3"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          className="border border-solid border-black-500 bg-slate-200 rounded-md"
          placeholder="password"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80" type="submit">
          { loading ? 'Loading' : 'Update'}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer" onClick={handleDelete}> Delete Account </span>
        <span onClick={handleLogOut} className="text-red-700 cursor-pointer"> Sign Out </span>
      </div>
      <p> {error && 'Something went wrong updating your profile'} </p>
      <p className="text-green-700 text-center"> {updateSuccess && 'Update Succesfull'} </p>
    </div>
  );
}
