import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';

const MainNavigation = ({user, setUser}) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>SARAYU</div>
      <div>
            {user && <Link to='/'><button onClick={()=> setUser()}>Logout</button></Link>}
      </div>
    </header>
  );
};

export default MainNavigation;
