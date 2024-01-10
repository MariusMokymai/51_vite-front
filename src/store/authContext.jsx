import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  login() {},
  logout() {},
  isUserLoggedIn: false,
  token: null,
  userEmail: '',
});

AuthContext.displayName = 'AutentificationCtx';

function AuthCtxProvider({ children }) {
  const tokenFromStorage = localStorage.getItem('bit_token');
  const emailFromStorage = localStorage.getItem('bit_email');
  const [bitToken, setBitToken] = useState(tokenFromStorage || null);
  const [userEmail, setUserEmail] = useState(emailFromStorage || '');

  // const isUserLoggedIn = bitToken ? true : false;
  // const isUserLoggedIn = Boolean(bitToken);
  const isUserLoggedIn = !!bitToken;

  function login(token, email) {
    setBitToken(token);
    setUserEmail(email);
    localStorage.setItem('bit_token', token);
    localStorage.setItem('bit_email', email);
  }

  function logout() {
    setBitToken(null);
    setUserEmail('');
    localStorage.removeItem('bit_token');
    localStorage.removeItem('bit_email');
  }

  const ctxValue = {
    token: bitToken,
    isUserLoggedIn,
    login,
    logout,
    userEmail,
  };

  console.log('ctxValue ===', ctxValue);

  return (
    <AuthContext.Provider value={ctxValue}> {children} </AuthContext.Provider>
  );
}

export default AuthCtxProvider;

export function useAuthContext() {
  return useContext(AuthContext);
}
