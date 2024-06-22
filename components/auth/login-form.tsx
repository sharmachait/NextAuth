'use client';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
export function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  return (
    <CardWrapper
      headerLabel={'Welcome Back'}
      backButtonHref={'/auth/register'}
      backButtonLabel={"Don't have an account?"}
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className={'space-y-6'}>
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
                      placeholder={'******'}
                      type={'password'}
                    ></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            ></FormField>
          </div>
          <Button
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
