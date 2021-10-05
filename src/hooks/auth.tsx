import React, {createContext, ReactNode, useContext, useState} from 'react';

import * as Google from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URL}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const {params, type} = await Google.startAsync({authUrl}) as AuthorizationResponse;

      if(type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();

        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        });
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
