import React, {createContext, ReactNode, useContext} from 'react';

import * as AuthSession from 'expo-auth-session';
import { useState } from 'hoist-non-react-statics/node_modules/@types/react';

interface AuthContextProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User;
  SignInWithGoogle(): Promise<void>;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  }
  type: string;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children}: AuthContextProps) {
  const [user, setUser] = useState<User>({} as User);

  async function SignInWithGoogle() {

    try {

      const CLIENT_ID = '506835967346-9p3ec8it2jojouvvikeoom1gkq6cuoke.apps.googleusercontent.com';
      const REDIRECT_URL = 'https://auth.expo.io/@johelder/go-finances';
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const {params, type} = await AuthSession.startAsync({authUrl}) as AuthorizationResponse;

      if(type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();

        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        })
      }


    } catch(error: any) {
      throw new Error(error);
    }

  }


  return <AuthContext.Provider value={{user, SignInWithGoogle}}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

export {AuthProvider, useAuth};
