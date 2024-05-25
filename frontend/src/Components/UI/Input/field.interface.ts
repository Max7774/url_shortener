import { InputHTMLAttributes } from "react";
import { IconType } from "react-icons";

export interface IField extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  Icon?: IconType;
  error?: string;
  label?: string;
  color?: "black" | "white";
  helperText?: string;
  uniqueLink?: boolean;
  center?: boolean;
  name?: string;
}

export interface IFieldCount extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  Icon?: IconType;
  error?: string;
  label?: string;
  color?: "black" | "white";
  uniqueLink?: boolean;
  disabled?: boolean;
  name?: string;
  rows?: number;
}
