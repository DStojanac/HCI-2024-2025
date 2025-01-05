import { CircleCheck } from "lucide-react";

type FormSuccessProps = {
  message?: string;
};

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className=" flex items-center space-x-2  text-emerald-500 bg-emerald-100 rounded-md p-3">
      <CircleCheck size={20} />
      <span>{message}</span>
    </div>
  );
};
