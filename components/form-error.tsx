import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

type FormErrorProps = { message: string };

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="bg-red-100 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-700">
      <ExclamationTriangleIcon></ExclamationTriangleIcon>
      <p>{message}</p>
    </div>
  );
}
