import React from 'react';
import BaseLayout from './BasicLayout';

function BasicLayout(props) {
  if (props.location.pathname === '/login' || props.location.pathname === '/register') {
    return props.children;
  }
  return (
    <BaseLayout
      props={props}
    />
  );
}

export default BasicLayout;
