import React, { createContext, useContext, useState } from 'react';

const RolesContext = createContext();

export const RolesProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('user'); // Default role is 'user'

  const setRole = (role) => {
    setUserRole(role);
  };

  return (
    <RolesContext.Provider value={{ userRole, setRole }}>
      {children}
    </RolesContext.Provider>
  );
};

export const useRoles = () => {
  return useContext(RolesContext);
};
