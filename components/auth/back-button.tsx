'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
type BackButtonProps = { href: string; label: string };
export default function BackButton(props: BackButtonProps) {
  return (
    <div>
      <Button
        size={'sm'}
        className={'font-normal w-full'}
        variant={'link'}
        asChild
      >
        <Link href={props.href}>{props.label}</Link>
      </Button>
    </div>
  );
}
