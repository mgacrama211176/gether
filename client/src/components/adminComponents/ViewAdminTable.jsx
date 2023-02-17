import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DeleteModal, UpdateModal } from "./FunctionModals";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function BasicTable({ users, admin }) {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          minWidth: 650,
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>IGN (In-Game Name)</TableCell>
            <TableCell align="center"> Access Rights</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Delete Action</TableCell>
            <TableCell align="right">Update Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {user.access === "user" || user.access === "Sadmin" ? (
                ""
              ) : (
                <>
                  <TableCell component="th" scope="row">
                    {user.first_name}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {user.access}
                  </TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">
                    <DeleteModal user={user} />
                  </TableCell>
                  <TableCell align="right">
                    <UpdateModal user={user} admin={admin} />
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
