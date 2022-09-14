import React from 'react';
import './style.css';
import { useEarthoOne } from '@eartho/one-client-react';
import AddQuestion from './component/Questions/AddQuestion';
// import Header from './component/Header';

export default function App() {
  const { isLoading, isConnected, error, user, connectWithPopup, logout } =
    useEarthoOne();

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  // if (error) {
  //   return <div>Oops... {error.message}</div>;
  // }

  if (isConnected) {
    // console.log(user.user);
    return (
      <div>
        <div className="header">
          <div className="header-text">Hello, {user.user.displayName}</div>
          <img src={user.user.photoURL} width={50} height={50} />
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log out
          </button>
          {/* <Header /> */}
        </div>
        <div className="container-fluid body">
          <AddQuestion user={user} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="login">
        <h4>Please login to start adding interview questions</h4>
        <div>
          <button
            className="btn btn-outline-success"
            id="login"
            onClick={() =>
              connectWithPopup({ access_id: 'UxF3oI8HWIfAGiW52Wi6' })
            }
          >
            Log in
          </button>
        </div>
      </div>
    );
  }
}
