import classes from './Homepage.module.css';
import ProfileForm from '../components/Profile/ProfileForm';
import { Redirect } from 'react-router-dom';

const HomePage = ({user}) => {
  return (
    user ?
    <section className={classes.home}>
      <h1>Welcome {user.first_name} {user.last_name}</h1>
      <ProfileForm user={user} />
    </section>
    : <Redirect to='/'/>
  )
};

export default HomePage;
