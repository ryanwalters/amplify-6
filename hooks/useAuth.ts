import { signIn, signOut } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import {
  createAWSCredentialsAndIdentityIdProvider,
  createUserPoolsTokenProvider,
} from 'aws-amplify/adapter-core';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { AuthConfig, KeyValueStorageInterface } from '@aws-amplify/core';

const kvStorage: KeyValueStorageInterface = {
  async setItem(key, value) {
    setCookie(key, value);
  },
  async getItem(key) {
    return getCookie(key) ?? null;
  },
  async removeItem(key) {
    deleteCookie(key);
  },
  async clear() {
    console.log('clear');
  },
};

const authConfig: AuthConfig = {
  Cognito: {
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
    userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID!,
  },
};

Amplify.configure(
  {
    Auth: authConfig,
  },
  {
    ssr: true,
    // Commenting out the `Auth` property allows signIn and signOut to work on localhost (but not on custom hostname)
    Auth: {
      tokenProvider: createUserPoolsTokenProvider(authConfig, kvStorage),
      credentialsProvider: createAWSCredentialsAndIdentityIdProvider(
        authConfig,
        kvStorage,
      ),
    },
  },
);

export function useAuth() {
  return {
    signIn,
    signOut,
  };
}
