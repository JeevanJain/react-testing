import { render, screen } from "@testing-library/react"
import UserForm from "./UserForm"
import userEvent from "@testing-library/user-event";

test('it shows two inputs and a button', () => {
    render(<UserForm />);

    const inputs = screen.getAllByRole('textbox');
    const btn = screen.getByRole('button');

    expect(inputs).toHaveLength(2);
    expect(btn).toBeInTheDocument();
})

test('it calls onUserAdd when form is. submitted', async () => {
    
    const argList = [];
    const callback = (...args) => {
        argList.push(args);
    }
    render(<UserForm onUserAdd={callback} />);
    const user = userEvent.setup();

    const [nameInput, emailInput] = screen.getAllByRole('textbox');
    const btn = screen.getByRole('button');

    await user.click(nameInput);
    await user.keyboard("jeevan");

    await user.click(emailInput);
    await user.keyboard("jeevantj@altimetrik.com");

    await user.click(btn);

    expect(argList).toHaveLength(1);
    expect(argList[0][0]).toEqual({name: "jeevan", email: "jeevantj@altimetrik.com" });

})
