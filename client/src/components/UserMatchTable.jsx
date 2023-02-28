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
  CircularProgress,
  Box,
} from "@mui/material";
import { matchRequest } from "./Toasts";
import ComboBox from "./ComboBox";

export default function BasicTable({
  filtered,
  user,
  matched,
  setMatched,
  setStatus,
  value,
  setValue,
  inputValue,
  setInputValue,
  filteredGenre,
  setFiltiredGenre,
  options,
}) {
  //This is the function for adding the matches of the user.

  const [loader, setLoader] = useState(false);

  const AddMatch = async () => {
    setLoader(true);

    //adding for the match
    try {
      if (matched !== undefined) {
        const userId = user.user_id;
        const matchedUserId = matched;
        const match = await axios.put(
          "https://getherbackend.onrender.com/addmatch",
          {
            userId,
            matchedUserId,
          }
        );

        //adding for the notif
        try {
          const Addnotif = await axios.post(
            `https://getherbackend.onrender.com/notification/addNotif/${userId}/${matchedUserId}`
          );
          console.log(Addnotif);
        } catch (err) {
          console.log(err);
        }

        matchRequest();
        setStatus("OK");
        setMatched();
        console.log(match.data);
        setLoader(false);
        window.location.reload();
      } else {
        setLoader(false);
      }
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  };

  useEffect(() => {
    AddMatch();
  }, [matched]);

  console.log(user.matches.length);
  console.log(user.matches);

  return (
    <>
      <>
        <Typography
          variant="h3"
          sx={{ color: "white", padding: 2 }}
        ></Typography>
        <Box
          sx={{
            display: "flex",
            float: "right",
            backgroundColor: "white",
            paddingTop: "0px",
            paddingBottom: "10px",
            paddingX: "10px",
            margin: "10px",
            border: "1px solid transparent",
            borderRadius: "10px",
            position: "absolute",
            top: 100,
            right: 40,
          }}
        >
          <ComboBox
            //Category
            value={value}
            setValue={setValue}
            inputValue={inputValue}
            setInputValue={setInputValue}
            options={options}
            user={user}
          />
        </Box>
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
              {filtered?.map((User) => (
                <TableRow
                  key={User._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {User.first_name}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {User.genre}
                  </TableCell>

                  <TableCell align="center">{User.email}</TableCell>
                  <TableCell
                    align="center"
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={User.url}
                      sx={{ float: "center" }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {loader ? (
                      <>
                        <CircularProgress />
                      </>
                    ) : user.matches.length === 1 ? (
                      <>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setMatched(user.user_id);
                          }}
                          disabled
                        >
                          pair
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setMatched(User.user_id);
                          }}
                        >
                          pair
                        </Button>
                      </>
                    )}
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
