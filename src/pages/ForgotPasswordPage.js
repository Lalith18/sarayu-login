import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import classes from './ForgotPasswordPage.module.css';

const ForgotPasswordPage = () => {
  const emailInputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log('called');
    const enteredEmail = emailInputRef.current.value;

    setIsLoading(true);
    let url, dataInput;
      url ='https://lit-eyrie-58493.herokuapp.com/api/auth/password_reset';
      dataInput = {
        email: enteredEmail,
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
      .then((res) => alert(res.message))
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>Forgot Password</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
              <Link to='/'>
                <button onClick={submitHandler}>Submit</button>
              </Link>
          )}
          {isLoading && <p>Loading...</p>}
        </div>
      </form>
    </section>
  );
};

export default ForgotPasswordPage;
