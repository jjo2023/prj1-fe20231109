import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import BoardWrite from "./page/BoardWrite";
import { BoardList } from "./page/BoardList";
import { HomeLayout } from "./layout/HomeLayout";
import { BoardView } from "./page/BoardView";
import { BoardEdit } from "./page/BoardEdit";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route index element={<BoardList />} />
      <Route path="writer" element={<BoardWrite />} />
      <Route path="board/:id" element={<BoardView />} />
      <Route path="edit/:id" element={<BoardEdit />} />
    </Route>,
  ),
);
function App(props) {
  return <RouterProvider router={router} />;
}

export default App;
