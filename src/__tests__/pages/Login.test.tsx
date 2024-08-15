import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { BrowserRouter } from "react-router-dom";
import { expect } from "vitest";
import "@testing-library/jest-dom";
import Login, { loginFormFields } from "../../pages/Login.Page";

beforeEach(() => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        </Provider>
    );
});

test("Render all input fields correctly in the Login form", () => {
    loginFormFields.forEach(field => {
        const inputElement = screen.getByPlaceholderText(field.placeHolder);
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute("type", field.type);
        expect(inputElement).toHaveAttribute("name", field.name);
    });
})
test("Test onchange event of all input fields in the Login form", () => {
    loginFormFields.forEach(field => {
        const inputElement = screen.getByPlaceholderText(field.placeHolder) as HTMLInputElement;
        fireEvent.change(inputElement, {target:{value:"a"}});
        expect(inputElement.value).toBe("a")
    })
});
test("Render submit button correctly in the Register form", () => {
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("Login")
});