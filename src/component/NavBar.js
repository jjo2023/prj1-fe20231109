import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function NavBar() {
  const navigate = useNavigate();

  function handleLogout() {
    axios.post("/api/member/logout").then(() => console.log("로그아웃 성공"));
  }

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
        mr={"15px"}
        colorScheme="green"
        onClick={() => navigate("/signup")}
      >
        회원가입
      </Button>
      <Button
        size={"lg"}
        mr={"15px"}
        colorScheme="yellow"
        onClick={() => navigate("/member/list")}
      >
        회원목록
      </Button>
      <Button
        size={"lg"}
        mr={"15px"}
        background={"wheat"}
        onClick={() => navigate("/login")}
      >
        로그인
      </Button>
      <Button
        size={"lg"}
        mr={"15px"}
        background={"cornsilk"}
        onClick={handleLogout}
      >
        로그아웃
      </Button>
    </Flex>
  );
}
