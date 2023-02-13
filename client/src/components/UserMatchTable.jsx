import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";

export default function BasicTable({ possibleMatch }) {
  //   console.log(possibleMatch);

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
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">View Profile</TableCell>
            <TableCell align="right">Pair</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {possibleMatch?.map((user) => (
            <TableRow
              key={user._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.first_name}
              </TableCell>

              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">
                <Avatar alt="Remy Sharp" src={user.url} />
              </TableCell>
              {/* <TableCell align="right">
                <DeleteModal user={user} />
              </TableCell>
              <TableCell align="right">
                <UpdateModal user={user} admin={admin} />
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
