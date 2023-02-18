import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Avatar,
  Paper,
  TableRow,
  TableHead,
  TableCell,
  TableContainer,
  TableBody,
  Table,
  Button,
  Typography,
} from "@mui/material";
import { matchRequest } from "./Toasts";
import { DashboardOption } from "./Dashboard menu/Menu";

export default function BasicTable({
  possibleMatch,
  filtered,
  user,
  matched,
  setMatched,
  status,
  setStatus,
}) {
  //This is the function for adding the matches of the user.

  const [option, setOption] = useState(true);

  const AddMatch = async () => {
    if (matched === undefined) {
    } else {
    }
    try {
      if (matched !== undefined) {
        const userId = user.user_id;
        const matchedUserId = matched;
        const match = await axios.put("http://localhost:8000/addmatch", {
          userId,
          matchedUserId,
        });
        matchRequest();
        setStatus("OK");
        setMatched();
        console.log(match.data);

        // window.location.reload();
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    AddMatch();
  }, [matched]);

  return (
    <>
      <DashboardOption option={option} setOption={setOption} />

      <>
        <Typography variant="h3" sx={{ color: "white", padding: 2 }}>
          {option ? "Available match" : "Requesting Match"}
        </Typography>
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
                <TableCell align="center">Genre</TableCell>
                <TableCell align="center">Email</TableCell>

                <TableCell align="center">View Profile</TableCell>
                <TableCell align="center">Pair</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered?.map((user) => (
                <TableRow
                  key={user._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.first_name}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {user.genre}
                  </TableCell>

                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell
                    align="center"
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={user.url}
                      sx={{ float: "center" }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setMatched(user.user_id);
                      }}
                    >
                      pair
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </>
  );
}
