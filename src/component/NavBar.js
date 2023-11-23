import { Box, Button, Flex, Spacer, useToast } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect } from "react";
import { LoginContext } from "./LoginProvider";
import {
  faEnvelope,
  faGear,
  faHouse,
  faPenNib,
  faRightFromBracket,
  faRightToBracket,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function NavBar() {
  const { fetchLogin, login, isAuthenticated, isAdmin } =
    useContext(LoginContext);
  const toast = useToast();

  const navigate = useNavigate();

  const urlParams = new URLSearchParams();

  const location = useLocation();

  useEffect(() => {
    fetchLogin();
  }, [location]);

  if (login !== "") {
    urlParams.set("id", login.id);
  }

  function handleLogout() {
    axios.post("/api/member/logout").then(() => {
      toast({
        description: "로그아웃 되었습니다",
        status: "info",
      });
      navigate("/");
    });
  }

  return (
    <Flex mb={5}>
      <Button background={"pink"} mr={"8px"} onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faHouse} />
        　메인
      </Button>

      {isAuthenticated() && (
        <Button background={"plum"} onClick={() => navigate("/writer")}>
          <FontAwesomeIcon icon={faPenNib} />
          　글쓰기
        </Button>
      )}
      <Spacer />

      {isAuthenticated() || (
        <Button
          background={"hotpink"}
          mr={"8px"}
          onClick={() => navigate("/signup")}
        >
          <FontAwesomeIcon icon={faUserPlus} />
          　회원가입
        </Button>
      )}
      {isAdmin() && (
        <Button
          colorScheme="yellow"
          mr={"8px"}
          onClick={() => navigate("/member/list")}
        >
          <FontAwesomeIcon icon={faUsers} />
          　회원목록
        </Button>
      )}

      {isAuthenticated() && (
        <Button
          background={"bisque"}
          mr={"8px"}
          onClick={() => navigate("/member?" + urlParams.toString())}
        >
          <FontAwesomeIcon icon={faGear} />
          {login.nickName}님
        </Button>
      )}

      {isAuthenticated() || (
        <Button background={"coral"} onClick={() => navigate("/login")}>
          <FontAwesomeIcon icon={faRightToBracket} />
          　로그인
        </Button>
      )}
      {isAuthenticated() && (
        <Button background={"cornsilk"} onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} />
          　로그아웃
        </Button>
      )}
    </Flex>
  );
}
