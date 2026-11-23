import React, { type JSX, type InputHTMLAttributes } from "react";
import { useField } from "formik";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string; //added name prop to FieldProps interface to fix a bug
}

const Field = ({ label, ...props }: FieldProps): JSX.Element => {
    const [field, meta] = useField<string>(props);
  return ( <>
  <label className="block mb-2 text-sm text-gray-600">{label}</label>
  <input
    {...field}
    {...props}
    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-purple-400 focus:ring-purple-400 focus:outline-none focus:ring focus:ring-opacity-40"
  />
  {meta.touched && meta.error ? (
    <p className="text-red-600 text-xs italic mt-1">{meta.error}</p>
  ) : null}
</>);
};

export default Field;