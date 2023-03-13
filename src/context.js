// CREATE GLOBAL CONTEXT
// CREATE APP CONTEXT FUNCTION
// INVOKE GLOBAL PROVIDER
//  EXPORT DEFAULT FUNCTION

import { createContext, useContext, useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
// import {} from "react-router-dom";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const AppContext = ({ children }) => {
  const [allVideos, setAllVideos] = useState([]);
  const [searchProducts, setSearchProdcuts] = useState([]);
  const [uniqueAges, setUniqueAges] = useState([]);
  const [uniqueCategory, setUniqueCategory] = useState([]);
  const [input, setInput] = useState("");
  const [sortBy, setSortBy] = useState("releaseDate");
  const [query, setQuery] = useState({});
  const enqueueSnackbar = useSnackbar();
  const [genre, setGenre] = useState([]);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    title: "",
    genre: "",
    previewImage: "",
    videoLink: "",
    contentRating: "",
    releaseDate: "",
  });
  const [contentRating, setContentRating] = useState("");
  const [genreError, setGenreError] = useState(false);
  const [sortError, setSortError] = useState(false);
  const [contentRatingError, setContentRatingError] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filters();
  }, [genre, contentRating]);

  useEffect(() => {
    sortByFunc();
  }, [sortBy]);

  const baseUrl =
    "https://822685c2-41a9-4b4c-ac30-557097db60cd.mock.pstmn.io/v1/videos";

  async function fetchData() {
    try {
      const query = window.location.search;

      if (query) {
        const params = new URLSearchParams(query);
        if (params.has("genres")) {
          const categoryArr = [
            "Education",
            "Sports",
            "Movies",
            "Comedy",
            "Lifestyle",
            "All",
          ];
          params.forEach((param) => {
            if (!categoryArr.includes(param)) {
              return setGenreError(true);
            }
          });
        }

        if (params.has("sortBy")) {
          const categoryArr = ["viewCount", "releaseDate"];
          params.forEach((param) => {
            if (!categoryArr.includes(param)) {
              setSortError(true);
            }
          });
        }

        if (params.has("contentRating")) {
          const categoryArr = ["Anyone", "7+", "12+", "16+", "18+", "All"];
          params.forEach((param) => {
            console.log(param);
            if (!categoryArr.includes(param)) {
              setContentRatingError(true);
            }
          });
        }
      }

      const res = await axios.get(baseUrl);
      setAllVideos(res.data.videos);
      getUniqueAgeGroup(res.data.videos);
      getUniqueCategory(res.data.videos);
      // setLoading(false);
    } catch (error) {
      if (error.response) {
        enqueueSnackbar(error.response.statusText, { variant: "error" });
      } else {
        enqueueSnackbar("Something went wrong", { variant: "error" });
      }
    }
  }

  async function filters() {
    setSearchProdcuts([]);
    console.log(genre);
    console.log(contentRating);
    const params = {
      ...(input.length && { title: input }),
      ...(genre.length && { genres: `${genre}` }),
      ...(contentRating.length && { contentRating: `${contentRating}` }),
    };

    console.log(params);

    try {
      const res = await axios.get(baseUrl, {
        params,
      });
      console.log(res);
      setAllVideos(res.data.videos);
    } catch (err) {
      console.log(err);
    }
  }

  async function sortByFunc() {
    try {
      if (sortBy === "releaseDate") {
        return fetchData();
      }

      const res = await axios.get(baseUrl, { params: { sortBy: sortBy } });
      // console.log(res);
      setAllVideos(res.data.videos);
    } catch (err) {
      console.log(err);
    }
  }

  function getUniqueAgeGroup(allVideos) {
    let uniqueAges = allVideos.map((video) => {
      return video.contentRating;
    });
    // console.log(uniqueAges);
    uniqueAges = [...new Set(uniqueAges)].reverse();
    uniqueAges[0] = "Any age group";
    setUniqueAges(uniqueAges);
  }

  function getUniqueCategory(allVideos) {
    let uniqueCategories = allVideos.map((video) => {
      return video.genre;
    });

    uniqueCategories = [...new Set(uniqueCategories)];
    uniqueCategories[0] = "All Genres";
    setUniqueCategory(uniqueCategories);
  }

  return (
    <GlobalContext.Provider
      value={{
        allVideos,
        fetchData,
        setAllVideos,
        setSearchProdcuts,
        searchProducts,
        setInput,
        input,
        genreError,
        uniqueCategory,
        uniqueAges,
        setQuery,
        setGenre,
        genre,
        setContentRating,
        setForm,
        form,
        baseUrl,
        setSortBy,
        sortBy,
        error,
        setError,
        contentRatingError,
        sortError,
        fetchData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
