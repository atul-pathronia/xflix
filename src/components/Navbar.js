import { React, useState, useCallback } from "react";
import { useGlobalContext } from "../context";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import {
  AppBar,
  Button,
  IconButton,
  TextField,
  Toolbar,
  Stack,
  Modal,
  Typography,
  Box,
  ButtonGroup,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import "./Navbar.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: 300,
  bgcolor: "#f7f7f7",
  boxShadow: 24,
  p: 4,
};

const Navbar = () => {
  const {
    setAllVideos,
    fetchData,
    allVideos,
    setSearchProdcuts,
    setInput,
    setForm,
    form,
    baseUrl,
    uniqueCategory,
    uniqueAges,
  } = useGlobalContext();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [focus, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const history = useHistory();

  async function performSearch(e) {
    const text = e.target.value;
    if (text.length === 0) {
      fetchData();
    } else {
      try {
        const params = {
          ...(text.length && { title: text }),
        };
        console.log(params);
        const res = await axios.get(baseUrl, { params });
        // JSON.parse(res.data)
        console.log(res);
        setSearchProdcuts(res.data.videos);
        setAllVideos([]);
        // setError(false);
      } catch (error) {
        // setError(true);
        setSearchProdcuts([]);
        setAllVideos([]);
      }
    }
  }

  const debounceSearch = (funct, debounceTimeout) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        funct.apply(context, args);
      }, debounceTimeout);
    };
  };

  const debounce = useCallback(debounceSearch(performSearch, 500), []);

  const uid = () =>
    String(Date.now().toString(32) + Math.random().toString(16)).replace(
      /\./g,
      ""
    );

  async function handleSubmit() {
    try {
      console.log(form);
      const params = {
        votes: {
          upvotes: 0,
          downVotes: 0,
        },
        ...form,
        viewCount: 0,
        id: uid(),
      };
      console.log(params);
      const res = await axios.post(baseUrl, params);
      setForm({
        title: "",
        genre: "",
        previewImage: "",
        videoLink: "",
        contentRating: "",
        releaseDate: "",
      });
      console.log(res);
      handleClose();
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AppBar position="static" sx={{ bgcolor: "#000" }}>
      <Toolbar
        sx={{ justifyContent: "space-between", alignContent: "center" }}
        className="navbar"
      >
        <Link to="/" className="logoLink">
          <IconButton size="large" edge="start">
            <img src="logo.png" alt="xflix logo"></img>
          </IconButton>
        </Link>
        <Stack
          direction="row"
          sx={{ backgroundColor: "#121212" }}
          className="textfield"
        >
          <TextField
            onInput={(e) => setInput(e.target.value)}
            onChange={debounce}
            placeholder="Search"
            variant="outlined"
            size="small"
            Value="small"
            fullWidth
            inputProps={{
              style: {
                color: "white",
              },
            }}
          ></TextField>
          <Button sx={{ bgcolor: "#313131" }}>
            <SearchOutlinedIcon sx={{ color: "#444D56" }}></SearchOutlinedIcon>
          </Button>
        </Stack>
        <Button
          variant="contained"
          sx={{ bgcolor: "#4CA3FC", paddingLeft: "1rem", paddingRight: "1rem" }}
          className="uploadBtn"
          startIcon={<FileUploadIcon></FileUploadIcon>}
          size="small"
          onClick={handleOpen}
        >
          Upload
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Stack spacing={2} color="white">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography component="h6" color="primary">
                  Video Upload
                </Typography>
                <IconButton size="small" onClick={handleClose}>
                  X
                </IconButton>
              </Stack>
              <TextField
                sx={{ color: "white" }}
                size="small"
                label="Video Link"
                helperText="This link will be used to derive the video"
                variant="outlined"
                onChange={(e) => {
                  setForm({
                    ...form,
                    videoLink: e.target.value,
                  });
                }}
              ></TextField>
              <TextField
                size="small"
                label="Thumbnail Image Link"
                helperText="This link will be used to preveiew the thumbnail image"
                onChange={(e) => {
                  setForm({
                    ...form,
                    previewImage: e.target.value,
                  });
                }}
              ></TextField>
              <TextField
                size="small"
                label="Title"
                helperText="This title will be the representative text for video"
                onChange={(e) => {
                  setForm({
                    ...form,
                    title: e.target.value,
                  });
                }}
              ></TextField>
              <FormControl fullWidth size="small">
                <InputLabel
                  id="demo-simple-select-label"
                  helperText="Genre will"
                >
                  Genre
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={e.target.value}
                  label="Genre"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      genre: e.target.value,
                    });
                  }}
                >
                  {uniqueCategory.map((category) => {
                    return <MenuItem value={category}>{category}</MenuItem>;
                  })}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Age Group</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={e.target.value}
                  label="Suitable Age"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      contentRating: e.target.value,
                    });
                  }}
                >
                  {uniqueAges.map((category) => {
                    return <MenuItem value={category}>{category}</MenuItem>;
                  })}
                </Select>
              </FormControl>
              <TextField
                onFocus={onFocus}
                onBlur={onBlur}
                InputProps={{
                  classes: {
                    input: "CustomTextField",
                  },
                }}
                onChange={(e) => {
                  setForm({
                    ...form,
                    releaseDate: e.target.value,
                  });
                  if (e.target.value) setHasValue(true);
                  else setHasValue(false);
                }}
                label="Date"
                type={hasValue || focus ? "date" : "text"}
              />
              <ButtonGroup spacing={1}>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{ marginRight: "10px" }}
                  onClick={handleSubmit}
                >
                  Upload Video
                </Button>
                <Button onClick={handleClose}>Cancel</Button>
              </ButtonGroup>
            </Stack>
          </Box>
        </Modal>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
