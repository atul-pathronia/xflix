import React from "react";
import { useGlobalContext } from "../context";
import { Grid, Box, Typography, Stack } from "@mui/material";
import MovieCard from "./MovieCard";
import "./AllVideos.css";

const AllVideos = () => {
  const {
    allVideos,
    searchProducts,
    genreError,
    contentRatingError,
    sortError,
  } = useGlobalContext();

  if (genreError) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="
        center"
      >
        <Stack>
          <Typography color="white">Code:400</Typography>
          <Typography color="white">
            message:"\"[0]\" must be one of [Education, Sports, Movies, Comedy,
            Lifestyle, All]
          </Typography>
          <Typography color="white">
            stack:"Error: \"[0]\" must be one of [Education, Sports, Movies,
            Comedy, Lifestyle, All]
          </Typography>
        </Stack>
      </Box>
    );
  }

  if (sortError) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="
        center"
      >
        <Stack>
          <Typography color="white">Code:400</Typography>
          <Typography color="white">
            message:"\"sortBy\" must be one of [viewCount, releaseDate]"
          </Typography>
          <Typography color="white">
            stack:"Error: \"sortBy\" must be one of [viewCount, releaseDate]\n
            at ...
          </Typography>
        </Stack>
      </Box>
    );
  }

  if (contentRatingError) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="
        center"
      >
        <Stack>
          <Typography color="white">Code:400</Typography>
          <Typography color="white">
            message:"\"contentRating\" must be one of [Anyone, 7+, 12+, 16+,
            18+, All]",
          </Typography>
          <Typography color="white">
            stack:"Error: \"contentRating\" must be one of [Anyone, 7+, 12+,
            16+, 18+, All]\n at ..."
          </Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#000" }}>
      <Grid
        className="allVideosGridParent"
        maxWidth={{ xs: 0.95, md: 0.9 }}
        container
        direction="row"
        spacing={{ xs: 1, md: 2 }}
        justifyContent="center"
      >
        {allVideos &&
          allVideos.map((video) => {
            return (
              <Grid item md={3} xs={6} key={video._id}>
                <MovieCard video={video}></MovieCard>
              </Grid>
            );
          })}

        {searchProducts &&
          searchProducts.map((video) => {
            return (
              <Grid item md={3} xs={6} key={video._id}>
                <MovieCard video={video}></MovieCard>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};

export default AllVideos;
