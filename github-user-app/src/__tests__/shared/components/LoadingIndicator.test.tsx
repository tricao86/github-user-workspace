import { render, screen } from "@testing-library/react";
import { LoadingIndicator } from "@shared/components/LoadingIndicator";

describe("LoadingIndicator", () => {
  it("renders CircularProgress", () => {
    render(<LoadingIndicator />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toBeInTheDocument();
  });

  it("does not render message if not provided", () => {
    render(<LoadingIndicator />);
    const message = screen.queryByText(/.+/); // any non-empty text
    expect(message).toBeNull();
  });

  it("renders provided message", () => {
    render(<LoadingIndicator message="Loading data..." />);
    expect(screen.getByText("Loading data...")).toBeInTheDocument();
  });
});
