import { UserTable } from "@features/user/presentation/components/UserTable";
import { render, screen } from "@testing-library/react";

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

const mockUsers = [
  {
    id: 1,
    login: "tri",
    avatar_url: "http://avatar.com/1.jpg",
    type: "User",
    score: 10,
  },
  {
    id: 2,
    login: "cao",
    avatar_url: "http://avatar.com/2.jpg",
    type: "User",
    score: 9.5,
  },
];

describe("UserTable", () => {
  it("renders users in table", () => {
    render(<UserTable users={mockUsers} />);
    expect(screen.getByText("tri")).toBeInTheDocument();
    expect(screen.getByText("cao")).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(2);
  });
});
