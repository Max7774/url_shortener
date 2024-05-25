import React, { forwardRef, useEffect, useState } from "react";
import { IFieldCount } from "./field.interface";
import cn from "clsx";

const FieldArea = forwardRef<HTMLInputElement, IFieldCount>(
  (
    {
      placeholder,
      error,
      className,
      type,
      style,
      color,
      label,
      value,
      uniqueLink,
      name,
      rows = 3,
      disabled,
      Icon,
      ...rest
    },
    ref
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [text, setText] = useState("");
    const [MAX_LENGTH, setMax] = useState<number>(160);

    useEffect(() => {
      if (uniqueLink) {
        setMax(128);
      } else {
        setMax(160);
      }
    }, [uniqueLink]);
    const isMailingTextTooLong = (): boolean => text.length > MAX_LENGTH;

    return (
      <div className="m-3">
        <span
          className={cn("mb-1 block ml-2", {
            "text-black": color === "black",
            "text-white": color === "white",
          })}
        >
          {Icon && <Icon className="mr-3" />}
          {!!label ? label : placeholder}
        </span>
        <div
          className={cn("relative mb-1 bg-white rounded-xl", {
            "border-red": !isMailingTextTooLong(),
          })}
          data-te-input-wrapper-init
          ref={ref}
          {...rest}
        >
          <textarea
            className={cn(
              "peer block min-h-[auto] w-full rounded-xl border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 focus:border border-primary",
              {
                "border-red": !!error,
              },
              className
            )}
            id="exampleFormControlTextarea1"
            rows={rows}
            value={value}
            name={name}
            required
            disabled={disabled}
          ></textarea>
        </div>
      </div>
    );
  }
);

export default FieldArea;
