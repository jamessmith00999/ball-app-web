import clsx from "clsx";

interface AuthInputErrorProps {
  error?: string;
  className?: string;
}

const AuthInputError = ({ error, className }: AuthInputErrorProps) => {
  if (!error) return null;
  return (
    <span className={clsx("text-red-500 text-sm font-medium", className)}>
      {error}
    </span>
  );
};

export default AuthInputError;
