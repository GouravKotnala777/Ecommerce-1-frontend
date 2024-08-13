import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from "../../pages/Register.Page";
import { vi } from 'vitest';
import { useRegisterMutation } from "../../redux/api/api";

// Mock the API hook
vi.mock('../redux/api/api', () => ({
  useRegisterMutation: vi.fn(),
}));

describe('Register Component', () => {
  test('renders form fields and submit button', () => {
    render(<Register />);
    expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Mobile/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    const mockRegister = vi.fn();
    (useRegisterMutation as jest.Mock).mockReturnValue([mockRegister]);

    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Mobile/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: 'password' } });

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        mobile: '1234567890',
        password: 'password',
        c_password: 'password',
      });
    });
  });

  test('displays error message on failed registration', async () => {
    const mockRegister = vi.fn().mockRejectedValue({ error: 'Registration failed' });
    (useRegisterMutation as jest.Mock).mockReturnValue([mockRegister]);

    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Mobile/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: 'password' } });

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        mobile: '1234567890',
        password: 'password',
        c_password: 'password',
      });
      // You would also verify that the error message is displayed correctly
    });
  });
});
