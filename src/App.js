import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import AllVideos from "./components/AllVideos";
import VideoView from "./components/VideoView";
import Error from "./components/Error";
import { Box } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/videos/:id">
          <VideoView></VideoView>
        </Route>
        <Route exact={true} path="/">
          <Header></Header>
          <AllVideos></AllVideos>
        </Route>
        <Route exact={true} path="*">
          <Error></Error>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
