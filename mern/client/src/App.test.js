import React from 'react';
import App from './App';
import {
    Registration,
    Login,
    Homepage
} from "./pages/Routes";
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import '@testing-library/jest-dom/extend-expect';

// Mock the modules of all the pages.
jest.mock('./pages/registration/Registration');
jest.mock('./pages/login/Login');
jest.mock('./pages/homepage/Homepage');

// Tests for react router.
describe("Tests for App Router", () => {
  // Tests that registration page is rendered when there is
  // no specific route.
  test("Should render registration page on default", () => {
    // Mock the return values
    Registration.mockImplementation(() => <div>RegistrationMock</div>);

    // Passing the route to the App component using MemoryRouter.
    // Not passing anything to the MemoryRouter as we are
    // testing the default route.
    render(
      <MemoryRouter>
        <App/>
      </MemoryRouter>
    );

    // Check if mock div was rendered correctly
    expect(screen.getByText("RegistrationMock")).toBeInTheDocument();
  });

  // Tests that login page is rendered for the login route.
  test("Should render Login Page for login route", () => {
    // Arrange
    Login.mockImplementation(() => <div>LoginMock</div>);

    // initialEntries paramater used to give the correct route input.
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App/>
      </MemoryRouter>
    );

    // Check if mock div was rendered correctly
    expect(screen.getByText("LoginMock")).toBeInTheDocument();
  });

  // Tests that home page is rendered for the home route.
  test("Should render Home Page for home route", () => {
    // Arrange
    Homepage.mockImplementation(() => <div>HomepageMock</div>);

    // initialEntries paramater used to give the correct route input.
    render(
      <MemoryRouter initialEntries={['/home']}>
        <App/>
      </MemoryRouter>
    );

    // Check if mock div was rendered correctly
    expect(screen.getByText("HomepageMock")).toBeInTheDocument();
  });

});
