import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import MatchedUsers from "./MatchedUsers";

export default function BasicTable({
  user,
  selected,
  setSelected,
  value,
  viewUser,
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Genre</TableCell>
            <TableCell align="right">Players</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>{value}</TableCell>
            <TableCell sx={{ overflowY: "scroll" }}>
              <MatchedUsers
                user={user}
                selected={selected}
                setSelected={setSelected}
                value={value}
                viewUser={viewUser}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
