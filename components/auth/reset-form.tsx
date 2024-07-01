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
import { ResetSchema } from '@/schemas';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import { login } from '@/actions/login';
import reset from '@/actions/resetPassword';

export function ResetFrom() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const router = useRouter();
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError('');
    setSuccess('');
    console.log(values);
    startTransition(async () => {
      console.log('calling');
      console.log(values);
      let response = await reset(values);
      console.log({ response });
      if (response && response.error) {
        setError(response.error);
      } else {
        setSuccess(response.success);
      }
    });
  };

  return (
    <CardWrapper
      headerHeadline={'Reset Password'}
      headerLabel={'Forgot your password?'}
      backButtonHref={'/auth/login'}
      backButtonLabel={'Back to login'}
      // showSocial
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
          </div>
          {error && <FormError message={error}></FormError>}
          {success && <FormSuccess message={success}></FormSuccess>}
          <Button
            disabled={isPending}
            variant={'defaultInverse'}
            type={'submit'}
            className={'w-full'}
          >
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
