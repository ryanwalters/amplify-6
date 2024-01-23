import { signIn } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID!,
    }
  }
}, {
  ssr: true,
});

export function useAuth() {
  return {
    signIn,
  }
}
