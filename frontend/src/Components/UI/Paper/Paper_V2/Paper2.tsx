import React, { FC, HTMLProps, PropsWithChildren } from "react";
import cn from "clsx";

interface Paper2Props extends HTMLProps<HTMLDivElement> {
  color?: "default" | "gray";
}

const Paper2: FC<PropsWithChildren<Paper2Props>> = ({
  children,
  color,
  className,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={cn(
        "rounded-xl font-medium px-10 py-4 m-6 border-2 border-gray",
        {
          "bg-bg-color-s": color === "gray",
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default Paper2;
