// Custom components
import React from "react";

function InputField(props:
  {
    label?: any,
    id?: any,
    extra?: any,
    type?: any,
    placeholder?: any,
    variant?: any,
    state?: any,
    disabled?: any,
    value?: any,
    handleChange: (value: any) => void
  }) {


  return (
    <div className={`${props.extra}`}>
      <label
        htmlFor={props.id}
        className={`text-sm text-navy-700 dark:text-white ${props.variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
          }`}
      >
        {props.label}
      </label>
      <input
        disabled={props.disabled}
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${props.disabled === true
          ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
          : props.state === "error"
            ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
            : props.state === "success"
              ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
              : "border-gray-200 dark:!border-white/10 dark:text-white"
          }`}
        value={props.value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          props.handleChange(event.target.value)
        }}
      />
    </div>
  );
}

export default InputField;
