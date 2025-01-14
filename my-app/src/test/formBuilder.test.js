import { render, screen, fireEvent } from "@testing-library/react";
import FormBuilder from "../components/formBuilder";

test("adds and submits fields in the form builder", () => {
  render(<FormBuilder />);

  fireEvent.click(screen.getByText("Add Text"));
  fireEvent.click(screen.getByText("Add Select"));

  expect(screen.getByLabelText(/text label/i)).toBeInTheDocument();
  expect(screen.getByText(/option 1/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText("Submit"));
});
