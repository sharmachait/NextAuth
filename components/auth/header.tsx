import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

interface HeaderProps {
  headline: string;
  label: string;
}

export const Header = ({ headline, label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn('text-3xl font-semibold', font.className)}>
        {headline}
      </h1>
      <p className="text-gray-600 text-sm font-semibold">{label}</p>
    </div>
  );
};
