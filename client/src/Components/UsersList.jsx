import React from "react";

function UsersList({users}) {
  return (
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Last Name</th>
                <th>Correo</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user) => (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.correo}</td>
                </tr>
            ))}
        </tbody>
    </table>
  );
}

export default UsersList;
