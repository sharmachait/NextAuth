'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Header } from '@/components/auth/header';
import React from 'react';
import Social from '@/components/auth/social';
import BackButton from '@/components/auth/back-button';
type CardWrapperProps = {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
};
export function CardWrapper(props: CardWrapperProps) {
  return (
    <Card className={'w-[400px] shadow-lg '}>
      <CardHeader>
        <Header label={props.headerLabel}></Header>
      </CardHeader>
      <CardContent>{props.children}</CardContent>
      {props.showSocial && (
        <CardFooter>
          <Social></Social>
        </CardFooter>
      )}
      <CardFooter className={'flex-col items-center justify-center'}>
        <BackButton
          label={props.backButtonLabel}
          href={props.backButtonHref}
        ></BackButton>
      </CardFooter>
    </Card>
  );
}
