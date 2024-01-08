import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { jwtDecode } from 'jwt-decode';

import './App.css';

function App() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log('Encoded JWT ID token: ' + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById('signInDiv').hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    const signInDiv = document.getElementById('signInDiv');
    if (signInDiv) {
      signInDiv.hidden = false;
    }
  }  
  

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: '468498587009-1anqe651n5ar8tp54mvihofk0kkq5fu9.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
    });

    google.accounts.id.prompt();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {Object.keys(user).length !== 0 ? (
          <div className="user-profile">
            <div className="user-info">
              <img src={user.picture} alt="user-profile-pic" />
              <h3 className="user-name">{user.name}</h3>
            </div>
            <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
          </div>
        ) : (
          <>
            <img src={logo} className="App-logo" alt="logo" />
            <p>We calculate your grades for you!</p>
            <div id="signInDiv"></div>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
