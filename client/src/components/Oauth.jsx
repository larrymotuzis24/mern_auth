import { GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { singInSuccess } from '../../redux/user/userSlice';

export default function Oauth() {

const dispatch = useDispatch();

const handleGoogleClick = async() => {
  try {
    const proivder = new GoogleAuthProvider();
    const auth = getAuth(app);

    const results = await signInWithPopup(auth, proivder);

    const res = await fetch('/api/auth/google', {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: results.user.displayName, 
        email: results.user.email,
        photo: results.user.photoURL

      })
    })
    const data = await res.json();
    dispatch(singInSuccess(data));
  }
  catch(error){
    console.log('could not log in with google', error)
  }
};

  return (
    <button 
    type='button'
    onClick={handleGoogleClick}
    className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'> 
    
    Continue with Google </button>
  )
}
