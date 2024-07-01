'use client';
import { signOut } from '@/auth';
import { useSession } from 'next-auth/react';

export default async function dashboard() {
  const session = useSession();
  return <div>{JSON.stringify(session)}</div>;
}
