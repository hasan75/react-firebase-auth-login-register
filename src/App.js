import './App.css';
import InitializeAuthentication from './Firebase/Firebase.initialize';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';

InitializeAuthentication();

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [isLogIn, setIsLogIn] = useState(false);

  const auth = getAuth();

  const handleGoogleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const toogleLogIn = (e) => {
    setIsLogIn(e.target.checked);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    //password validity check
    if (password.length < 6) {
      setError('Password must contain 6 characters');
      return;
    }
  };

  const handleNewUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError('');
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  };

  return (
    <div className='ms-3 mt-3'>
      <form onSubmit={handleRegistration}>
        <h2 className='text-primary mb-3'>
          Please {isLogIn ? 'LogIn' : 'Registration'}
        </h2>
        <div className='row mb-3'>
          <label htmlFor='inputEmail3' className='col-sm-2 col-form-label'>
            Email
          </label>
          <div className='col-sm-10'>
            <input
              onBlur={handleEmailChange}
              type='email'
              className='form-control'
              id='inputEmail3'
            />
          </div>
        </div>
        <div className='row mb-3'>
          <label htmlFor='inputPassword3' className='col-sm-2 col-form-label'>
            Password
          </label>
          <div className='col-sm-10'>
            <input
              onBlur={handlePasswordChange}
              type='password'
              className='form-control'
              id='inputPassword3'
            />
          </div>
        </div>
        <div className='row mb-3'>
          <div className='col-sm-10 offset-sm-2'>
            <div className='form-check'>
              <input
                onClick={toogleLogIn}
                className='form-check-input'
                type='checkbox'
                id='gridCheck1'
              />
              <label className='form-check-label' htmlFor='gridCheck1'>
                Already Registered?
              </label>
            </div>
          </div>
        </div>
        <div className='row mb-3 text-danger'>{error}</div>
        <button
          onClick={handleNewUser}
          type='submit'
          className='btn btn-primary'
        >
          {isLogIn ? 'Log In' : 'Registration'}
        </button>
      </form>
      <br />
      <br />
      <br />
      <div>-------------------------</div>
      <br />
      <br />
      <br />
      <button onClick={handleGoogleSignIn} className='signInGoogle-Button'>
        Sign In With Google
      </button>
    </div>
  );
}

export default App;
