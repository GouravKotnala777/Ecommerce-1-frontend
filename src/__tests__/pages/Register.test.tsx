import { fireEvent, render, screen } from "@testing-library/react";
import Register, { formFields } from "../../pages/Register.Page";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { BrowserRouter } from "react-router-dom";
import { expect } from "vitest";
//import {useRegisterMutation} from "../../redux/api/api";
//import {vi} from "vitest";
import "@testing-library/jest-dom"

beforeEach(() => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        </Provider>
    );
})

test("Render all input fields correctly in the Register form", () => {
    formFields.forEach(field => {
        const inputElement = screen.getByPlaceholderText(field.placeHolder);
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute("type", field.type);
        expect(inputElement).toHaveAttribute("name", field.name);
    })
});

test("Test onchange event of all input fields in the Register form", () => {
    formFields.forEach(field => {
        const inputElement = screen.getByPlaceholderText(field.placeHolder) as HTMLInputElement;
        fireEvent.change(inputElement, {target:{value:"a"}});
        expect(inputElement.value).toBe("a")
    })
});

test("Render submit button correctly in the Register form", () => {
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("Register")
});

//vi.mock("../../redux/api/api", () => ({
//    ...(vi.importActual("../../redux/api/api")),
//    useRegisterMutation:vi.fn()
//}))

//test("Test onclick event on submit button in the Register form", async() => {
//    const mockRegister = vi.fn().mockResolvedValue({message:"Registration successful"});

//    (useRegisterMutation as vi.Mock).mockReturnValue([mockRegister]);

//    const registerButton = screen.getByText("Register");
//    expect(registerButton).toBeInTheDocument();
//    fireEvent.click(registerButton)

//    await waitFor(() => {
//        expect(mockRegister).toHaveBeenCalled();
//    })

//    const successMessage = await screen.findByText("Registration successful");
//    expect(successMessage).toBeInTheDocument();

//    vi.clearAllMocks();
//});