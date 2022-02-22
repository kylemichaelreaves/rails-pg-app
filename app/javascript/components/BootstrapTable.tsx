import * as React from "react";
import Table from "react-bootstrap/table";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function BootstrapTable() {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Not Me</th>
          <th>Figuring Out How To</th>
          <th>Do Something Really Simple</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Giving You All</td>
          <td>An Update on</td>
          <td>my meager accomplishments</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  );
}
