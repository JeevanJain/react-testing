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
    const mock = jest.fn();

    render(<UserForm onUserAdd={mock} />);
    const user = userEvent.setup();

    // const [nameInput, emailInput] = screen.getAllByRole('textbox');
    const nameInput = screen.getByRole('textbox', {
        name: /name/i
    });
    const emailInput = screen.getByRole('textbox', {
        name: /email/i
    });

    await user.click(nameInput);
    await user.keyboard("jeevan");

    await user.click(emailInput);
    await user.keyboard("jeevantj@altimetrik.com");

    const btn = screen.getByRole('button');
    await user.click(btn);

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({name: "jeevan", email: "jeevantj@altimetrik.com"});

    // expect(argList).toHaveLength(1);
    // expect(argList[0][0]).toEqual({name: "jeevan", email: "jeevantj@altimetrik.com" });

});

test('empties input fields when form submitted', async () =>{
    const user = userEvent.setup();
    render(<UserForm onUserAdd={() => {}} />);

    const nameInput = screen.getByRole('textbox', { name: /name/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });

    await user.click(nameInput);
    await user.keyboard("jeevan");

    await user.click(emailInput);
    await user.keyboard("jeevantj@altimetrik.com");

    const btn = screen.getByRole('button');
    await user.click(btn);

    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
});
