import React from 'react';
import { Home } from "./components/Home";
import { Project } from "./components/Project";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/project',
    element: <Project />
  }
];

export default AppRoutes;
