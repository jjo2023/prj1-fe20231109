import { Box } from "@chakra-ui/react";
import { NavBar } from "../component/NavBar";
import { Outlet } from "react-router-dom";

export function HomeLayout() {
  return (
    <Box mx={{ base: 0, md: 10, lg: 40 }}>
      <NavBar />
      <Outlet />
    </Box>
  );
}
