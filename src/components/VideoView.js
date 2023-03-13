import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import CircleIcon from "@mui/icons-material/Circle";
import ThumbUpIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import "./VideoView.css";
import { Box, Stack, Typography, Button } from "@mui/material";
import Navbar from "./Navbar";
import { useSnackbar } from "notistack";
import AllVideos from "./AllVideos";

const VideoView = () => {
  const [getVideo, setGetVideo] = useState({});
  const [errorObject, setErrorObject] = useState({});
  const [videoError, setVideoError] = useState(false);
  const enqueueSnackbar = useSnackbar();
  const { id } = useParams();

  useEffect(() => {
    getSingleVideo();
  }, []);

  const baseUrl = "https://822685c2-41a9-4b4c-ac30-557097db60cd.mock.pstmn.io";
  async function getSingleVideo() {
    setVideoError(false);
    setErrorObject({});
    try {
      const res = await axios.get(`${baseUrl}/v1/videos/${id}`);
      console.log(res);
      setGetVideo(res.data);
    } catch (error) {
      if (error.response) {
        setErrorObject(error.response);
        setVideoError(true);
      }
    }
  }

  let upVoteCount = 0;
  let downVoteCount = 0;
  async function patchVideoVote(e) {
    e.preventDefault();
    const vote = e.target.value;
    if (vote === "upVote") {
      const data = {
        ...getVideo,
        votes: {
          upVote: upVoteCount++,
        },
      };
      try {
        const res = await axios.patch(`${baseUrl}/v1/videos/${id}`, {
          data,
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }

    if (vote === "downVote") {
      const data = {
        ...getVideo,
        votes: {
          downVotes: downVoteCount++,
        },
      };
      try {
        const res = await axios.patch(`${baseUrl}/v1/videos/${id}`, {
          data,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  const uploadDate = new Date(getVideo.releaseDate);
  const today = new Date(Date.now());
  const yearsPassed = today.getFullYear() - uploadDate.getFullYear();

  if (videoError) {
    return (
      <Box>
        <Navbar mb={2}></Navbar>
        <Box
          color="white"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          <Stack>
            <Typography>Code: {errorObject.data.code}</Typography>
            <Typography>Message: {errorObject.data.message}</Typography>
            <Typography>Stack: {errorObject.data.stack}</Typography>
          </Stack>
        </Box>
        <AllVideos></AllVideos>
      </Box>
    );
  }

  return (
    <Box>
      <Navbar mb={2}></Navbar>
      <Box
        sx={{ maxWidth: { xs: "100%", sm: "90%", md: "80%" } }}
        marginX="auto"
      >
        <Stack>
          <Box py={2}>
            <iframe
              Width="100%"
              height="400"
              src={"//" + getVideo.videoLink}
              title={getVideo.title}
              allowfullscreen
              frameborder="0"
            ></iframe>
            <Typography
              compenent="h1"
              textAlign="left"
              color="white"
              fontWeight="bold"
              mt={1}
            >
              {getVideo.title}
            </Typography>
            <Stack
              color="white"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" alignItems="center" gap=".5rem">
                <Typography>{getVideo.contentRating}</Typography>
                <CircleIcon size="1px"></CircleIcon>
                <Typography>{yearsPassed} years ago</Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                gap=".5rem"
                onClick={patchVideoVote}
              >
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#4CA3FC",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                  }}
                  className="uploadBtn"
                  startIcon={<ThumbUpIcon></ThumbUpIcon>}
                  size="small"
                  value="upVote"
                >
                  {/* {getVideo.votes.upVotes} */}
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#111",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                  }}
                  className="uploadBtn"
                  startIcon={<ThumbDownIcon></ThumbDownIcon>}
                  size="small"
                  value="downVote"
                >
                  {/* {getVideo.votes.downVotes} */}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
      <AllVideos></AllVideos>
    </Box>
  );
};

export default VideoView;
