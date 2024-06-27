import { auth, signOut } from '@/auth';

export default async function settings() {
  const session = await auth();
  return (
    <div>
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/auth/login' });
        }}
      >
        <button type={'submit'}>Sign out</button>
      </form>
      {JSON.stringify(session)}
    </div>
  );
}
