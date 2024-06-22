'use client';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

export default function Social() {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button size={'lg'} className={'w-full'} variant={'defaultInverse'}>
        <FcGoogle className={'h-5 w-5'}></FcGoogle>
        &nbsp; Google
      </Button>
      <Button size={'lg'} className={'w-full'} variant={'defaultInverse'}>
        <FaGithub className={'h-5 w-5'}></FaGithub>
        &nbsp; Google
      </Button>
    </div>
  );
}
