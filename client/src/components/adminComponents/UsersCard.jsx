import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { DeleteUser, EditUser, UserMatches } from "./ViewUserFunctions";

export default function ImgMediaCard(user) {
  const variableCall = user.user;
  const interests = variableCall.gaming_interest;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="150"
        width="100%"
        image={variableCall.url}
        sx={{ objectFit: "scale-down", paddingTop: "10px" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {variableCall.first_name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {variableCall.user_id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          About: {variableCall.about}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gaming Cat: {interests}
        </Typography>
      </CardContent>
      <CardActions>
        <DeleteUser user={user.user} />
        <EditUser user={user.user} />
        <UserMatches user={user.user} />
      </CardActions>
    </Card>
  );
}
