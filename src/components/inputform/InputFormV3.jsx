import React from "react";

const InputFormV3 = ({
  label,
  unit,
  value,
  setValue,
  small,
  name,
  invaLidFields,
  setInvalidFields,
  direction,
}) => {
  return (
    <div className={`flex ${direction ? direction : "flex-col"}`}>
      <label className="w-[192px] flex-none font-medium" htmlFor="title">
        {label}
      </label>
      <div className="flex flex-auto flex-col items-center">
        <div className="flex w-full items-center">
          <input
            type="text"
            id="title"
            className={`${
              unit ? "rounded-bl-md rounded-tl-md" : "rounded-md"
            } flex-auto border border-gray-300 p-2 outline-none`}
            value={value}
            onChange={(e) =>
              setValue((prev) => ({ ...prev, [name]: e.target.value }))
            }
            onFocus={() => setInvalidFields && setInvalidFields([])}
          />
        </div>
        {invaLidFields?.some((item) => item.name == name) && (
          <small className="block w-full text-red-500">
            {invaLidFields?.find((item) => item.name == name)?.message}
          </small>
        )}
      </div>
    </div>
  );
};

export default InputFormV3;
