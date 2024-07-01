'use client';
import { CardWrapper } from '@/components/auth/card-wrapper';
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
import { NewPasswordSchema } from '@/schemas';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import { setNewPassword } from '@/actions/SetNewPassword';
import { useSearchParams } from 'next/navigation';

export default function NewPasswordForm() {
  const searchParams = useSearchParams();

  const token = searchParams.get('token');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError('');
    setSuccess('');
    console.log(values);
    startTransition(async () => {
      console.log('calling');
      console.log(values);
      let response = await setNewPassword(values, token);
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
      headerLabel={'Enter new password'}
      backButtonHref={'/auth/login'}
      backButtonLabel={'Back to login'}
      // showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-6'}>
          <div className={'space-y-4'}>
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
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
