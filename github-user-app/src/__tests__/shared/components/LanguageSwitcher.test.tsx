import LanguageSwitcher from "@shared/components/LanguageSwitcher";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Create mock
const changeLanguage = jest.fn();

// Mock useTranslation return changeLanguage
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage,
      language: "en",
    },
  }),
}));

describe("LanguageSwitcher", () => {
  it("renders dropdown with language options", () => {
    render(<LanguageSwitcher />);

    // Label displayed
    expect(screen.getByLabelText(/language/i)).toBeInTheDocument();
  });

  it("changes language on selection", async () => {
    const user = userEvent.setup();

    render(<LanguageSwitcher />);

    // Open dropdown
    const selectButton = screen.getByRole("combobox", { name: /language/i });
    await user.click(selectButton);

    // Find option
    const vietnameseOption = await screen.findByRole("option", {
      name: /Tiếng Việt/i,
    });
    await user.click(vietnameseOption);

    expect(changeLanguage).toHaveBeenCalledWith("vi");
  });
});
