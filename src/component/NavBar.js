import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function NavBar() {
  const navigate = useNavigate();

  return (
    <Flex>
      <Button
        size={"lg"}
        colorScheme="orange"
        mr={"15px"}
        onClick={() => navigate("/")}
      >
        home
      </Button>
      <Button
        size={"lg"}
        colorScheme="teal"
        onClick={() => navigate("/writer")}
      >
        writer
      </Button>
    </Flex>
  );
}
