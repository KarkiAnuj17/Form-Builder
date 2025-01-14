import { z } from "zod";

// Create the validation schema based on the fields
export const createValidationSchema = (fields) => {
  const schema = fields.reduce((acc, field) => {
    switch (field.type) {
      case "text":
        acc[field.name] = z.string().min(1, `${field.label} is required`);
        break;
      case "radio":
        acc[field.name] = z.string().min(1, `${field.label} is required`);
        break;
      case "checkbox":
        acc[field.name] = z
          .array(z.string())
          .min(1, `At least one option must be selected for ${field.label}`);
        break;
      case "select":
        acc[field.name] = z.string().min(1, `${field.label} is required`);
        break;
      case "date":
        acc[field.name] = z
          .string()
          .refine((val) => {
            // Check if the string is a valid date in the format YYYY-MM-DD
            const date = Date.parse(val);
            return !isNaN(date) && val === new Date(date).toISOString().split('T')[0];
          }, `${field.label} must be a valid date (YYYY-MM-DD)`);
        break;
      default:
        break;
    }
    return acc;
  }, {});  

  return z.object(schema);
};
