import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TextInput, SelectInput, RadioGroup, CheckboxGroup, DatePicker } from "./formComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import PreviewForm from "./previewForm";
import { createValidationSchema } from "../utililties/validation";

const FormBuilder = () => {
  const [fields, setFields] = useState([]);
  const [generatedSchema, setGeneratedSchema] = useState(null);
  const [isPreview, setIsPreview] = useState(false);

  const validationSchema = useMemo(() => createValidationSchema(fields), [fields]);
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const componentsMap = useMemo(() => ({
    text: TextInput,
    select: SelectInput,
    radio: RadioGroup,
    checkbox: CheckboxGroup,
    date: DatePicker,
  }), []);

  const addField = (type) => {
    const newField = {
      id: `${type}-${Date.now()}`, 
      type,
      label: `${type} Label`,
      name: `field_${fields.length + 1}`,
      options:
        type === "select" || type === "radio" || type === "checkbox"
          ? [
              { value: "option1", label: "Option 1" },
              { value: "option2", label: "Option 2" },
            ]
          : [],
    };
    setFields((prev) => [...prev, newField]);
  };

  const generateJSONSchema = () => {
    return fields.map((field) => ({
      name: field.name,
      label: field.label,
      type: field.type,
      options: field.options || [],
    }));
  };

  const onSubmit = (data) => {
    const schema = generateJSONSchema();
    console.log("Form Data:", data);
    console.log("Generated JSON Schema:", schema);
    setGeneratedSchema(schema);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedFields = Array.from(fields);
    const [removed] = reorderedFields.splice(result.source.index, 1);
    reorderedFields.splice(result.destination.index, 0, removed);
    setFields(reorderedFields);
  };

  const containerStyle = {
    padding: "20px",
    background: "#f9f9f9",
    borderRadius: "4px",
    minHeight: "100px",
    marginBottom: "10px",
  };

  const draggableStyle = {
    margin: "10px 0",
    padding: "10px",
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  return (
    <div>
      <h1>Interactive Form Builder</h1>
      <button onClick={() => setIsPreview(false)}>Edit Mode</button>
      <button onClick={() => setIsPreview(true)}>Preview Mode</button>

      {!isPreview && (
        <>
          <button onClick={() => addField("text")}>Add Text</button>
          <button onClick={() => addField("select")}>Add Select</button>
          <button onClick={() => addField("radio")}>Add Radio</button>
          <button onClick={() => addField("checkbox")}>Add Checkbox</button>
          <button onClick={() => addField("date")}>Add Date</button>
        </>
      )}

      {isPreview ? (
        <PreviewForm fields={fields || []} register={register} preview={true} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable-form">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} style={containerStyle}>
                  {fields.length === 0 ? (
                    <div style={{ textAlign: "center", color: "#888" }}>
                      No fields added yet. Drag and drop to add.
                    </div>
                  ) : (
                    fields.map((field, index) => {
                      const Component = componentsMap[field.type];
                      return (
                        <Draggable
                          key={field.id}
                          draggableId={field.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                ...draggableStyle,
                              }}
                            >
                              <Component
                                label={field.label}
                                name={field.name}
                                options={field.options}
                                register={register}
                                readOnly={false}
                                disabled={false}
                              />
                            </div>
                          )}
                        </Draggable>
                      );
                    })
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <button type="submit">Submit</button>
        </form>
      )}

      {generatedSchema && (
        <div style={{ marginTop: "20px" }}>
          <h2>Generated JSON Schema:</h2>
          <pre style={{ background: "#f4f4f4", padding: "10px", borderRadius: "4px" }}>
            {JSON.stringify(generatedSchema, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default FormBuilder;
