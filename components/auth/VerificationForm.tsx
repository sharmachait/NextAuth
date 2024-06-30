'use client';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { useEffect, useCallback, useState } from 'react';
import { verify } from '@/actions/verify';
import ErrorCard from '@/components/auth/ErrorCard';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
export default function VerificationForm() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>('');
  const token = searchParams.get('token');
  const [tokenState, setTokenState] = useState();

  if (!token) return <ErrorCard></ErrorCard>;
  const onSubmit = useCallback(async () => {
    if (!token) {
      setError('Missing token!');
      return;
    }
    try {
      let res = await verify(token);
      if (res.error) {
        setError(res.error);
        setSuccess(undefined);
      } else {
        setSuccess(res.success);
        setError(undefined);
      }
    } catch (e) {
      setError('Something went wrong!');
      setSuccess(undefined);
    }
  }, [token]);
  useEffect(() => {
    console.log('calling');
    if (!(error || success)) onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerHeadline={'Email confirmation'}
      headerLabel={'Email verification in progress'}
      backButtonHref={'/auth/login'}
      backButtonLabel={'Login!'}
    >
      <div className={'flex items-center justify-center w-full'}>
        {!(error || success) ? <BeatLoader></BeatLoader> : ''}
        {error ? <FormError message={error as string}></FormError> : ''}
        {success ? <FormSuccess message={success as string}></FormSuccess> : ''}
      </div>
    </CardWrapper>
  );
}
