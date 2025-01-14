import React from "react";
import { TextInput, SelectInput, RadioGroup, CheckboxGroup, DatePicker } from "./formComponent";

const PreviewForm = ({ fields, register, preview }) => {
  const componentsMap = {
    text: TextInput,
    select: SelectInput,
    radio: RadioGroup,
    checkbox: CheckboxGroup,
    date: DatePicker,
  };

  return (
    <form>
      {fields.map((field) => {
        const Component = componentsMap[field.type];
        return (
          <div key={field.id}>
            <Component
              label={field.label}
              name={field.name}
              options={field.options}
              register={register}
              readOnly={preview} // Use preview prop to toggle read-only mode
              disabled={preview} // Alternatively, you can use disabled for other elements
            />
          </div>
        );
      })}
    </form>
  );
};

export default PreviewForm;
