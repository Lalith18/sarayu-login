import React from 'react';

import MainNavigation from './MainNavigation';

const Layout = (props) => {
  return (
    <div>
      <MainNavigation user={props.user} setUser={props.setUser} />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
