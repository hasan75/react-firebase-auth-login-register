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
  const auth = getAuth();

  const handleGoogleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleRegistration = (e) => {
    e.preventDefault();
  };

  const handleNewUser = () => {
    createUserWithEmailAndPassword(auth, email, password).then((result) => {
      const user = result.user;
      console.log(user);
    });
  };

  return (
    <div className='ms-3 mt-3'>
      <form onSubmit={handleRegistration}>
        <h2 className='text-primary mb-3'>Please Register</h2>
        <div class='row mb-3'>
          <label for='inputEmail3' class='col-sm-2 col-form-label'>
            Email
          </label>
          <div class='col-sm-10'>
            <input type='email' class='form-control' id='inputEmail3' />
          </div>
        </div>
        <div class='row mb-3'>
          <label for='inputPassword3' class='col-sm-2 col-form-label'>
            Password
          </label>
          <div class='col-sm-10'>
            <input type='password' class='form-control' id='inputPassword3' />
          </div>
        </div>
        <div class='row mb-3'>
          <div class='col-sm-10 offset-sm-2'>
            <div class='form-check'>
              <input class='form-check-input' type='checkbox' id='gridCheck1' />
              <label class='form-check-label' for='gridCheck1'>
                Already Registered?
              </label>
            </div>
          </div>
        </div>
        <button onClick={handleNewUser} type='submit' class='btn btn-primary'>
          Registration
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
