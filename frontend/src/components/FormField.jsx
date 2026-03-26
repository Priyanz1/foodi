import React from "react";

export default function FormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = true,
  autoComplete,
}) {
  return (
    <div className="w-full">
      <label className="block text-[14px] text-[#cbd5e1] mb-[6px]">
        {label}
      </label>
      <input
        className="w-full px-[14px] py-[12px] rounded-[10px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.08)] text-white text-[15px] outline-none focus:border-[rgba(129,140,248,0.8)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.18)] focus:outline-none placeholder:text-[#cbd5e1]"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        required={required}
        autoComplete={autoComplete}
      />
      {error ? <p className="mt-[6px] text-[13px] text-[#f87171]">{error}</p> : null}
    </div>
  );
}
