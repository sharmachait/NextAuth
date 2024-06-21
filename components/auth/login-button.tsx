'use client';
type LoginButtonProps = {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
};
export default function LoginButton(props: LoginButtonProps) {
  let { children, mode = 'redirect', asChild } = props;
  const onClick = () => {
    console.log('LOGIN BUTTON CLICKED');
  };
  if (mode === 'modal') {
    return <span>TODO: Implement modal</span>;
  }
  return (
    <span className={'cursor-pointer'} onClick={onClick}>
      {children}
    </span>
  );
}
