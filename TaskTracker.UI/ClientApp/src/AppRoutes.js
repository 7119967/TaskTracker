import React from 'react';
import { Home } from "./components/Home";
import { Projects } from "./components/Projects";
import { Tasks } from "./components/Tasks";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/projects',
    element: <Projects />
  },
  {
    path: '/tasks',
    element: <Tasks />
  }
];

export default AppRoutes;
