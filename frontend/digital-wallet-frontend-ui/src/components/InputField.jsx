import React from "react";

function InputField({dataPlace,label, labelText, placeholder}) {
  return (
    <>
      <div className="p-2 flex flex-col gap-x-2">
        <label htmlFor={label} className="text-lg font-semibold">
          {labelText}
        </label>
        <input
          ref={dataPlace}
          className="w-full rounded-md border-2 border-solid border-black p-1"
          type="text"
          id={label}
          placeholder={placeholder}
        />
      </div>
    </>
  );
}

export default InputField;
