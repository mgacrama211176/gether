import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { DeleteUser, EditUser, UserMatches } from "./ViewUserFunctions";

export default function ImgMediaCard(user) {
  const variableCall = user.user;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={variableCall.url}
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
      </CardContent>
      <CardActions>
        <DeleteUser user={user.user} />
        <EditUser user={user.user} />
        <UserMatches user={user.user} />
      </CardActions>
    </Card>
  );
}
