import React from "react";
import {
    Table
  } from "reactstrap";
const UserList = ({ data, isLoading, error }) => {
  return (
    <div className="col-12">
      {isLoading ? (
        <h1 className="text-center m-auto">Loading...</h1>
      ) : (
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Join Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.users?.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.register_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UserList;
