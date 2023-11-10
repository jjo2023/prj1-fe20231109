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
        메인
      </Button>
      <Button
        size={"lg"}
        mr={"15px"}
        colorScheme="facebook"
        onClick={() => navigate("/writer")}
      >
        글쓰기
      </Button>
      <Button
        size={"lg"}
        colorScheme="green"
        onClick={() => navigate("/signup")}
      >
        회원가입
      </Button>
      <Button
        size={"lg"}
        colorScheme="green"
        onClick={() => navigate("/member/list")}
      >
        회원목록
      </Button>
    </Flex>
  );
}
