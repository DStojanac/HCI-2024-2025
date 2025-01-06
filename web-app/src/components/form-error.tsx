import { TriangleAlert } from "lucide-react";

type FormErrorProps = {
  message?: string;
};

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className=" flex items-center space-x-2  text-red-500 bg-red-100 rounded-md p-3">
      <TriangleAlert size={20} />
      <span>{message}</span>
    </div>
  );
};
