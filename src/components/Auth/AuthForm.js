import { useState, useRef } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import classes from './AuthForm.module.css';

const AuthForm = ({setUser}) => {
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    let url, dataInput;
    if (isLogin) {
      url =
        'https://lit-eyrie-58493.herokuapp.com/api/auth/login';
      dataInput = {
        email: enteredEmail,
        password: enteredPassword,
      }
    } else {
      const enteredFirstName = firstNameInputRef.current.value;
      const enteredLastName = lastNameInputRef.current.value;
      const enteredConfirmPassword = confirmPasswordInputRef.current.value;
      if(enteredConfirmPassword !== enteredPassword) {
        setIsLoading(false);
        alert('Passwords dont match');
        return;
      }
      url =
        'https://lit-eyrie-58493.herokuapp.com/api/auth/register';
      dataInput = {
        user_type: 'client',
        email: enteredEmail,
        password: enteredPassword,
        first_name: enteredFirstName,
        last_name: enteredLastName,
      }
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(dataInput),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';
            let msg = data.errors
            if (data && data.errors) {
              errorMessage = msg[0].message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        setUser(data);
        setIsLoggedIn(true)
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    isLoggedIn ? <Redirect to='/home'/>
    :<section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        {!isLogin &&
          <div className={classes.control}>
            <label htmlFor='first-name'>First Name</label>
            <input
              type='first-name'
              id='first-name'
              required
              ref={firstNameInputRef}
            />
          </div>
        }
        {!isLogin &&
          <div className={classes.control}>
            <label htmlFor='last-name'>Last Name</label>
            <input
              type='last-name'
              id='last-name'
              required
              ref={lastNameInputRef}
            />
          </div>
        }
        <div className={classes.control}>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        {!isLogin &&
          <div className={classes.control}>
            <label htmlFor='confirm-password'>Confirm Password</label>
            <input
              type='password'
              id='confirm-password'
              required
              ref={confirmPasswordInputRef}
            />
          </div>
        }
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Loading...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
          <Link to='forgot-password'>
            <button
              type='button'
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              Forgot Password?
            </button>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
