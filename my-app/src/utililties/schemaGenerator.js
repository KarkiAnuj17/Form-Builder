export const generateSchema = (fields) => {
    return fields.map(({ name, label, type, options }) => ({
      name,
      label,
      type,
      options: options || [],
    }));
  };
  