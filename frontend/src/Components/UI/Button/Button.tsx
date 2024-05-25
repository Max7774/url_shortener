import cn from "clsx";
import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import Loader from "../Loader/Loader";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "orange" | "white" | "gray";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  disabled?: boolean;
}

const Button: FC<PropsWithChildren<IButton>> = ({
  children,
  className,
  variant,
  disabled,
  size,
  isLoading = false,
  ...rest
}) => {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={cn(
        "rounded-xl font-medium px-10 py-3 py-2transition duration-500 ease-in-out m-3",
        {
          "text-white bg-primary": variant === "orange",
          "text-primary bg-white": variant === "white",
          "text-white bg-gray": variant === "gray",
          "px-5 py-2 text-sm": size === "sm",
          "px-10 py-4 text-md": size === "md",
          "px-20 py-4 text-lg": size === "lg",
        },
        className
      )}
    >
      {isLoading ? (
        <Loader
          size={size === "lg" ? "md" : "sm"}
          isLoading={isLoading}
          color="white"
        />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
