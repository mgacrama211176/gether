import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function ActionAreaCard({ fetch }) {
  useEffect(() => {
    // console.log(fetch);
  }, []);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={fetch.url}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {fetch.first_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {fetch.about}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
