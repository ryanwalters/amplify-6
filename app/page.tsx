'use client';

import { signOut } from '@aws-amplify/auth';
import { FormEvent } from 'react';
import { useAuth } from '~/hooks/useAuth';
import styles from "./page.module.css";

export default function Home() {
  const { signIn } = useAuth();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const { username, password} = Object.fromEntries(formData.entries());
      const { isSignedIn } = await signIn({ username: username.toString(), password: password.toString() });

      console.log('isSignedIn', isSignedIn);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className={styles.main}>
      <form onSubmit={onSubmit}>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Sign In</button>
        <button type="button" onClick={() => signOut()}>Sign Out</button>
      </form>
    </main>
  );
}
