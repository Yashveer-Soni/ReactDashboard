import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserInfo = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Retrieve token from local storage or wherever you store it
        const token = localStorage.getItem('authToken');

        const response = await axios.get("http://127.0.0.1:8000/api/current-user/", {
          withCredentials: true, // Important for session-based authentication
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`, // Include authentication header
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
    </div>
  );
};

export default UserInfo;