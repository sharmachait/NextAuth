'use client';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import { login } from '@/actions/login';
export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');
    startTransition(async () => {
      let response = await login(values);
      console.log(response);
      if (response && response.success) {
        router.replace('/dashboard');
        setSuccess(response.success);
      }
      if (response) setError(response.error);
      setError('Something went wrong');
    });
  };

  return (
    <CardWrapper
      headerHeadline={'Login'}
      headerLabel={'Welcome Back'}
      backButtonHref={'/auth/register'}
      backButtonLabel={"Don't have an account?"}
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-6'}>
          <div className={'space-y-4'}>
            <FormField
              control={form.control}
              name={'email'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={'john.doe@example.com'}
                      type={'email'}
                    ></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name={'password'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={'******'}
                      type={'password'}
                    ></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            ></FormField>
          </div>
          {error && <FormError message={error}></FormError>}
          {success && <FormSuccess message={success}></FormSuccess>}
          <Button
            disabled={isPending}
            variant={'defaultInverse'}
            type={'submit'}
            className={'w-full'}
          >
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
