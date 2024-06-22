import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';
const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});
import { Button } from '@/components/ui/button';
import LoginButton from '@/components/auth/login-button';
export default function Home() {
  return (
    <main
      className={'flex h-full flex-col items-center justify-center space-y-6'}
    >
      <div className={'text-center'}>
        <h1 className={cn('text-6xl font-semibold ', font.className)}>Auth</h1>
        <p className={'text-lg'}>A simple Auth lib</p>
      </div>
      <LoginButton>
        <Button
          variant={'default'}
          size={'lg'}
          className={
            'bg-gray-200 text-black font-bold drop-shadow-[0_1.4px_1.4px_rgba(0,0,0,0.8)]'
          }
        >
          Sign in
        </Button>
      </LoginButton>
    </main>
  );
}
