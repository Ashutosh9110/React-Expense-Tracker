import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import App from "../App";
import AppContent from "../AppContent";
import Notification from "../components/UI/Notification";

// Mock store
const mockStore = configureStore([]);

function renderWithProviders(ui, { store }) {
  return render(
    <Provider store={store}>
      <Router>{ui}</Router>
    </Provider>
  );
}

describe("Expense Tracker App", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { isLoggedIn: false, userId: null },
      theme: { darkMode: false },
      cart: { items: [] },
      ui: { notification: null },
    });
  });

  // 1
  test("renders App without crashing", () => {
    renderWithProviders(<App />, { store });
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });

  // 2
  test("renders Header component", () => {
    renderWithProviders(<AppContent />, { store });
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  // 3
  test("shows Login page when not authenticated", () => {
    renderWithProviders(<AppContent />, { store });
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  // 4
  test("renders Signup page at /signup", () => {
    window.history.pushState({}, "Test page", "/signup");
    renderWithProviders(<AppContent />, { store });
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  // 5
  test("renders Notification when passed", () => {
    render(
      <Notification status="success" title="Saved" message="Cart saved!" />
    );
    expect(screen.getByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("Cart saved!")).toBeInTheDocument();
  });

  // 6
  test("applies dark mode class when darkMode is true", () => {
    store = mockStore({
      auth: { isLoggedIn: false, userId: null },
      theme: { darkMode: true },
      cart: { items: [] },
      ui: { notification: null },
    });

    renderWithProviders(<App />, { store });
    expect(document.documentElement).toHaveClass("dark");
  });

  // 7
  test("does not apply dark mode class when darkMode is false", () => {
    renderWithProviders(<App />, { store });
    expect(document.documentElement).not.toHaveClass("dark");
  });

  // 8
  test("renders Welcome page at /", () => {
    window.history.pushState({}, "Test page", "/");
    renderWithProviders(<AppContent />, { store });
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });

  // 9
  test("renders Verify Email page at /verify-email", () => {
    window.history.pushState({}, "Test page", "/verify-email");
    renderWithProviders(<AppContent />, { store });
    expect(screen.getByText(/verify/i)).toBeInTheDocument();
  });

  // 10
  test("renders Complete Profile page at /complete-profile", () => {
    window.history.pushState({}, "Test page", "/complete-profile");
    renderWithProviders(<AppContent />, { store });
    expect(screen.getByText(/complete profile/i)).toBeInTheDocument();
  });
});
