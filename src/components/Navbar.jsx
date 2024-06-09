import React, { useEffect, useState } from 'react';

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  return (
    <header className="main-header">
      <h1>Pemantauan</h1>
      <div className="user-info">
        {user ? <span>{user.fullName}</span> : <span>Guest</span>}
      </div>
    </header>
  );
}

export default Navbar;
