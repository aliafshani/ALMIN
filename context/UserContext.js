"use client";

import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState([]);



  useEffect(() => {
    const fetchUser = async () => {

      const token = localStorage.getItem('token')
      if (!token) {
        return setLoading(false)
      }
      try {
        const res = await fetch('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();
        if (data) {
          setUserData(data.user);
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false)
      }
      setLoading(false);
    };

    fetchUser();

  }, [])

  return (
    <UserContext.Provider value={{ userData, setUserData, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => useContext(UserContext);
