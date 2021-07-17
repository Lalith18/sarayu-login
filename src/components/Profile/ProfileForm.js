import React, {useState, useRef} from 'react';
import classes from './ProfileForm.module.css';

const ProfileForm = ({user}) => {
  const currentPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredcurrentPassword = currentPasswordInputRef.current.value;
    const enteredNewPassword = newPasswordInputRef.current.value;

    setIsLoading(true);
    let url, dataInput;
    url ='https://lit-eyrie-58493.herokuapp.com/api/auth/password_change';
    dataInput = {
        current_password: enteredcurrentPassword,
        new_password: enteredNewPassword,
      }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(dataInput),
      headers: {
        'Authorization': 'Bearer ' + user.auth_token,
        'Content-Type': 'application/json',
      },
    })
      .then( res => {
        setIsLoading(false);
        if (res.ok) {
          alert('Password changed');
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';
            console.log(data);
            let msg = data.errors
            alert(msg[0].message)
            errorMessage = msg[0].message;

            throw new Error(errorMessage);
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='password'>Current Password</label>
        <input type='password' id='password' required ref={currentPasswordInputRef}/>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' required ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        {!isLoading && <button>Change Password</button>}
        {isLoading && <p>Loading...</p>}
      </div>
    </form>
  );
}

export default ProfileForm;
