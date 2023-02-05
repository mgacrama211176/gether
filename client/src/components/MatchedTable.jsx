import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, Box } from "@mui/material";
import MatchedUsers from "./MatchedUsers";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("RTS", 159),
  createData("FPS", 159),
  createData("MOBA", 159),
  createData("RPG", 159),
];

export default function BasicTable({ user, selected, setSelected }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Genre</TableCell>
            <TableCell align="right">Players</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>RTS</TableCell>
            <TableCell>
              <MatchedUsers
                user={user}
                selected={selected}
                setSelected={setSelected}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>RPG</TableCell>
            <TableCell>
              <MatchedUsers
                user={user}
                selected={selected}
                setSelected={setSelected}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>MOBA</TableCell>
            <TableCell>
              <MatchedUsers
                user={user}
                selected={selected}
                setSelected={setSelected}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>FPS</TableCell>
            <TableCell>
              <MatchedUsers user={user} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
