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
  const [bitToken, setBitToken] = useState('');
  const [userEmail, setUserEmail] = useState('');

  // const isUserLoggedIn = bitToken ? true : false;
  // const isUserLoggedIn = Boolean(bitToken);
  const isUserLoggedIn = !!bitToken;

  function login(token, email) {
    setBitToken(token);
    setUserEmail(email);
  }

  function logout() {
    setBitToken(null);
    setUserEmail('');
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
