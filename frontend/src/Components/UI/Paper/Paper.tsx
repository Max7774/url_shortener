import React, { FC, PropsWithChildren } from "react";
import cn from "clsx";

const Paper: FC<PropsWithChildren<{ className: string }>> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div className={cn("bg-bg-color p-1 rounded-xl", className)} {...rest}>
      {children}
    </div>
  );
};

export default Paper;
