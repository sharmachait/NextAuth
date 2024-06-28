'use client';

import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { REDIRECT_LOGIN } from '@/routes';

export default function Social() {
  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, { callbackUrl: REDIRECT_LOGIN });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size={'lg'}
        className={'w-full'}
        variant={'defaultInverse'}
        onClick={() => {
          onClick('google');
        }}
      >
        <FcGoogle className={'h-5 w-5'}></FcGoogle>
        &nbsp; Google
      </Button>
      <Button
        size={'lg'}
        className={'w-full'}
        variant={'defaultInverse'}
        onClick={() => {
          onClick('github');
        }}
      >
        <FaGithub className={'h-5 w-5'}></FaGithub>
        &nbsp; Github
      </Button>
    </div>
  );
}
