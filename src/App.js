import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { jwtDecode } from 'jwt-decode';
import GwaCalculator from './GwaCalculator'; 

import './App.css';

function App() {
  const [user, setUser] = useState({});
  const [showCalculator, setShowCalculator] = useState(false);

  function handleCallbackResponse(response) {
    console.log('Encoded JWT ID token: ' + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    setShowCalculator(true); // Show the calculator after signing in
    document.getElementById('signInDiv').hidden = true;
  }

  function handleSignOut() {
    setUser({});
    setShowCalculator(false); // Hide the calculator after signing out
    const signInDiv = document.getElementById('signInDiv');
    if (signInDiv) {
      signInDiv.hidden = false;
    }
    
    // Reload the page
    window.location.reload();
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
          <div>
            <div className="user-profile">
              <div className="user-info">
                <img src={user.picture} alt="user-profile-pic" />
                <h3 className="user-name">{user.name}</h3>
              </div>
            </div>        
            <button className="signout-button" onClick={(e) => handleSignOut(e)}>Sign Out</button>
          </div>
        ) : (
          <>
            <img src={logo} className="App-logo" alt="logo" />
            <p className='sign-in-moto'>We calculate your grades for you!</p>
            <div id="signInDiv"></div>
          </>
        )}

        {/* Conditionally render GWA Calculator */}
        {Object.keys(user).length !== 0 && showCalculator && (
          <GwaCalculator />
        )}
      </header>
    </div>
  );
}

export default App;