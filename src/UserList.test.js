import UserList from './UserList';
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event";

test('render one row per user', async () => {
    const users = [
        {name: "Jeevan", email: "jeevan@gmail.com"},
        {name: "jain", email: "jain@email.com"},
    ];
    const { container }  = render(<UserList users={users}/>);

    // screen.logTestingPlaygroundURL();

    // const rowByTestId = screen.getByTestId("users");

    // const rows = within(rowByTestId).getAllByRole("row");

    const rows = container.querySelectorAll('tbody tr');

    expect(rows).toHaveLength(2);

});

test('render the email and name of each user', async () => {

    const users = [
        {name: "Jeevan", email: "jeevan@gmail.com"},
        {name: "jain", email: "jain@email.com"},
    ];
    render(<UserList users={users}/>);

    for(let user of users) {
        const name = screen.getByRole('cell', { name : user.name })
        const email = screen.getByRole('cell', { name : user.email })

        expect(name).toBeInTheDocument();
        expect(email).toBeInTheDocument();
    }

});