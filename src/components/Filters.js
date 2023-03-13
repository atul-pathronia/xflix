import { React, useEffect, useState } from "react";
import { Box, Chip, Stack, Select, MenuItem } from "@mui/material";
import { useGlobalContext } from "../context";
import HeightIcon from "@mui/icons-material/Height";
import "./Filters.css";

const Filters = () => {
  const {
    allVideos,
    setSearchProdcuts,
    setAllVideos,
    uniqueCategory,
    uniqueAges,
    setGenre,
    genre,
    setSortBy,
    sortBy,
    setContentRating,
    setError,
    fetchData,
  } = useGlobalContext();

  function handleGenre(category, e) {
    // console.log(category);
    const element = e.target;
    console.log(element);
    if (element.className.includes("chipBackground")) {
      element.className = "";
    } else {
      element.className = "chipBackground";
    }
    let tempArr = [];

    const selectedChips = document.querySelectorAll(".chipBackground");
    if (genre.length === 0) {
      tempArr.push(category);
      setGenre(tempArr);
    } else if (genre.length > 0 && category === "All Genres") {
      selectedChips.forEach((chip) => {
        chip.className = "";
      });
      element.className = "chipBackground";
      tempArr.push(category);
      setGenre(tempArr);
      fetchData();
    } else {
      selectedChips.forEach((chip) => {
        if (chip.textContent === "All Genres") {
          chip.className = "";
          genre.pop(chip);
        }
      });
      tempArr = [...genre];
      if (genre.includes(category)) {
        setGenre(
          tempArr.filter((existingCategory) => existingCategory !== category)
        );
      } else {
        tempArr.push(category);
        setGenre(tempArr);
      }
    }
  }

  function handleContentRating(rating, e) {
    const arr = document.querySelectorAll(".chipBackground");
    arr.forEach((ele) => {
      ele.classList.remove("chipBackground");
    });
    const element = e.target;
    element.className = "chipBackground";
    setContentRating(rating);
  }

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ bgcolor: "#000" }}
      >
        <Box
          display="flex"
          className="filterBox"
          flexDirection="column"
          width="50%"
          py={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            width={1}
            mb={2}
          >
            {uniqueCategory.map((category, index) => {
              return (
                <Chip
                  onClick={(e) => handleGenre(category, e)}
                  key={index}
                  label={category}
                  variant="contained"
                  size="small"
                  sx={{ color: "grey" }}
                ></Chip>
              );
            })}
          </Stack>
          <Stack direction="row" justifyContent="space-between" width={1}>
            {uniqueAges.map((age, index) => {
              return (
                <Chip
                  key={index}
                  onClick={(e) => handleContentRating(age, e)}
                  label={age}
                  variant="contained"
                  sx={{ color: "grey" }}
                  size="small"
                ></Chip>
              );
            })}
          </Stack>
          <Select
            label="sort"
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
            className="sort"
            startAdornment={<HeightIcon></HeightIcon>}
          >
            <MenuItem value="releaseDate" sx={{ padding: 0 }}>
              Release Date
            </MenuItem>
            <MenuItem value="viewCount" sx={{ padding: 0 }}>
              View Count
            </MenuItem>
          </Select>
        </Box>
      </Stack>
    </Box>
  );
  // );
};

export default Filters;
