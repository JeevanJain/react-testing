import UserList from './UserList';
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event";

test('render one row per user', async () => {
    const users = [
        {name: "Jeevan", email: "jeevan@gmail.com"},
        {name: "jain", email: "jain@email.com"},
    ];
    render(<UserList users={users}/>);

    // screen.logTestingPlaygroundURL();

    const rowByTestId = screen.getByTestId("users");

    const rows = within(rowByTestId).getAllByRole("row");

    expect(rows).toHaveLength(2);

});

test('', async () => {

});