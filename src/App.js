import React, {useState} from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import HomePage from './pages/HomePage';

const App = () => {
  
  const [user, setUser] = useState();
  return (
    <Layout user={user} setUser={setUser}>
      <Switch>
        <Route path='/' exact>
          <AuthPage setUser={setUser} />
        </Route>
        <Route path='/home'>
          <HomePage user={user} />
        </Route>
        <Route path='/forgot-password' component={ForgotPasswordPage} />
      </Switch>
    </Layout>
  );
}

export default App;
