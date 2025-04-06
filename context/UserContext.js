"use client"; // مهمه که از این برای استفاده از hooks در سمت کلاینت استفاده کنید.

import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState([]);


  // بارگذاری اطلاعات کاربر از localStorage یا API
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

// یک هوک برای استفاده از Context
export const useUser = () => useContext(UserContext);
