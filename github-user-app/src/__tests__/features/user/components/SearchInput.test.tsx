import { SearchInput } from "@features/user/presentation/components/SearchInput";
import { render, screen, fireEvent } from "@testing-library/react";

describe("SearchInput", () => {
  it("renders input with correct value and placeholder", () => {
    render(
      <SearchInput value="abc" onChange={() => {}} placeholder="Search users" />
    );
    const input = screen.getByPlaceholderText(/search users/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("abc");
  });

  it("calls onChange when user types", () => {
    const handleChange = jest.fn();
    render(
      <SearchInput value="" onChange={handleChange} placeholder="Search..." />
    );
    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: "xyz" },
    });
    expect(handleChange).toHaveBeenCalledWith("xyz");
  });
});
