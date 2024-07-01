import React, { Suspense, lazy } from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";

import { Paper } from "@mui/material";

import { StoreProvider } from "../stores";

import ProgressBar from "../components/ProgressBar";
import Snackbar from "../components/Snackbar";
import FallbackRenderer from "../components/FallbackRenderer";
import NavTabs from "../components/Tabs";
import Theme from "../components/Theme";
import Footer from "../components/Footer";

import "./app.scss";

const Welcome = lazy(() => import(`./Welcome`));
const MobX = lazy(() => import(`./MobXExample`));
// const MobX = lazy(() => new Promise((res) => { setTimeout(() => {  res( require('./MobX') ) }, 1000) })); //Just for testing FallbackRenderer component
const ToDoList = lazy(() => import(`./ToDoList`));

const modules = [
  {
    name: "Welcome",
    src: <Welcome />,
    url: "welcome",
  },
  {
    name: "MobX",
    src: <MobX />,
    url: "mobx",
  },
  {
    name: "To-do List",
    src: <ToDoList />,
    url: "todo",
  },
];

const Nav = () => {
  // Custom Nav component
  // return (
  //     <nav>{
  //         modules.map((module, i) => (
  //             <div key={`link-${i}`}>
  //                 <NavLink to={`/${module.url}`}>
  //                     {module.name}
  //                 </NavLink>
  //             </div>
  //         ))
  //     }</nav>
  // );

  // MUI NavTabs
  return <NavTabs modules={modules} />;
};

const generateRoutes = () =>
  modules.map((module, i) => (
    <Route key={`route-${i}`} path={`/${module.url}`} element={module.src} />
  ));

const App = () => (
  <div className="app">
    <BrowserRouter>
      <StoreProvider>
        <Theme>
          <ProgressBar />
          <Snackbar />
          <Nav />
          <Paper className="paper">
            <Suspense fallback={<FallbackRenderer />}>
              <Routes>
                <Route path="/" element={<Welcome />} />
                {generateRoutes()}
              </Routes>
            </Suspense>
          </Paper>
          <Footer />
        </Theme>
      </StoreProvider>
    </BrowserRouter>
  </div>
);

export default App;
