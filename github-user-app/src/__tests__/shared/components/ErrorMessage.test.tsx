import { ErrorMessage } from "@shared/components/ErrorMessage";
import { render, screen } from "@testing-library/react";

describe("ErrorMessage", () => {
  it("displays error message", () => {
    render(<ErrorMessage message="Something went wrong" />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
