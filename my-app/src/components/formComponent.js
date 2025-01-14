import React, { memo } from "react";

export const TextInput = memo(({ label, name, register, validation, readOnly, disabled }) => (
  <div>
    <label>{label}</label>
    <input
      type="text"
      {...register(name, validation)}
      readOnly={readOnly} // Apply readOnly
      disabled={disabled} // Apply disabled
    />
  </div>
));

export const SelectInput = memo(({ label, name, options, register, validation, readOnly, disabled }) => (
  <div>
    <label>{label}</label>
    <select {...register(name, validation)} readOnly={readOnly} disabled={disabled}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
));

export const RadioGroup = memo(({ label, name, options, register, validation, readOnly, disabled }) => (
  <div>
    <label>{label}</label>
    {options.map((opt) => (
      <label key={opt.value}>
        <input
          type="radio"
          value={opt.value}
          {...register(name, validation)}
          readOnly={readOnly} 
          disabled={disabled} 
        />
        {opt.label}
      </label>
    ))}
  </div>
));

export const CheckboxGroup = memo(({ label, name, options, register, readOnly, disabled }) => (
  <div>
    <label>{label}</label>
    {options.map((opt) => (
      <label key={opt.value}>
        <input
          type="checkbox"
          value={opt.value}
          {...register(name)}
          readOnly={readOnly} // Apply readOnly
          disabled={disabled} // Apply disabled
        />
        {opt.label}
      </label>
    ))}
  </div>
));

export const DatePicker = memo(({ label, name, register, validation, readOnly, disabled }) => (
  <div>
    <label>{label}</label>
    <input
      type="date"
      {...register(name, validation)}
      readOnly={readOnly} // Apply readOnly
      disabled={disabled} // Apply disabled
    />
  </div>
));
