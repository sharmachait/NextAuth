import { CheckCircledIcon } from '@radix-ui/react-icons';

type FormSuccessProps = { message: string };

export default function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null;

  return (
    <div className="bg-green-100 p-3 rounded-md flex items-center gap-x-2 text-sm text-green-700">
      <CheckCircledIcon></CheckCircledIcon>
      <p>{message}</p>
    </div>
  );
}
