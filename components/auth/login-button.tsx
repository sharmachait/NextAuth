'use client';
import { useRouter } from 'next/navigation';
type LoginButtonProps = {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
};
export default function LoginButton(props: LoginButtonProps) {
  const router = useRouter();
  let { children, mode = 'redirect', asChild } = props;
  const onClick = () => {
    console.log('LOGIN BUTTON CLICKED');
    router.push(`/auth/login`);
  };
  if (mode === 'modal') {
    return <span className={'font-bold'}>TODO: Implement modal</span>;
  }
  return (
    <span className={'cursor-pointer'} onClick={onClick}>
      {children}
    </span>
  );
}
