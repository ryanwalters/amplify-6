'use client';

import { useAuth } from '~/hooks/useAuth';
import styles from './page.module.css';

export default function Home() {
  const { signIn, signOut } = useAuth();

  async function handleSignIn(formData: FormData) {
    try {
      const { username, password } = Object.fromEntries(formData.entries());
      const { isSignedIn } = await signIn({
        username: username.toString(),
        password: password.toString(),
      });

      console.log('isSignedIn', isSignedIn);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className={styles.main}>
      <form action={handleSignIn}>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Sign In</button>
        <button type="button" onClick={() => signOut()}>
          Sign Out
        </button>
      </form>
    </main>
  );
}
