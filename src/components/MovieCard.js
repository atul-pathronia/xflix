import { React } from "react";
import { Link, useParams } from "react-router-dom";
import "./MovieCard.css";
import {
  Card,
  CardContent,
  CardMedia,
  Icon,
  Typography,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Moviecard = ({ video }) => {
  const uploadDate = new Date(video.releaseDate);
  const today = new Date(Date.now());
  const yearsPassed = today.getFullYear() - uploadDate.getFullYear();

  return (
    <Link to={`/videos/${video._id}`} style={{ textDecoration: "none" }}>
      <Card className="card" sx={{ bgcolor: "#000" }}>
        <CardMedia image={video.previewImage} component="img"></CardMedia>
        <CardContent className="cardContent">
          <Box>
            <Typography
              variant="body2"
              textAlign="left"
              color="white"
              fontSize="14px"
              fontWeight="bold"
            >
              {video.title}
            </Typography>
            <Typography
              variant="body2"
              textAlign="left"
              color="grey"
              fontWeight="bold"
              fontSize="10px"
            >
              {yearsPassed} years ago
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <VisibilityIcon
              size="small"
              sx={{ color: "grey" }}
            ></VisibilityIcon>
            <Typography color="grey">{video.viewCount}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Moviecard;
