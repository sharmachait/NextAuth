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
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-700 to-purple-900 space-y-6">
      <div className={'text-center'}>
        <h1
          className={cn(
            'text-6xl font-semibold text-teal-400 drop-shadow-md drop-shadow-[0_1.4px_1.4px_rgba(0,0,0,0.8)]',
            font.className
          )}
        >
          Auth
        </h1>
        <p
          className={
            'text-teal-400 text-lg drop-shadow-[0_1.4px_1.4px_rgba(0,0,0,0.8)]'
          }
        >
          A simple Auth lib
        </p>
      </div>
      <LoginButton>
        <Button
          variant={'mint'}
          size={'lg'}
          className={
            'text-[#172554] font-bold drop-shadow-[0_1.4px_1.4px_rgba(0,0,0,0.8)]'
          }
        >
          Sign in
        </Button>
      </LoginButton>
    </main>
  );
}
