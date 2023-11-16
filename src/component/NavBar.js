import { Button, Flex, useToast } from "@chakra-ui/react";
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
    <Flex>
      <Button
        size={"lg"}
        background={"plum"}
        mr={"15px"}
        onClick={() => navigate("/")}
      >
        <FontAwesomeIcon icon={faHouse} />
        　메인
      </Button>

      {isAuthenticated() && (
        <Button
          size={"lg"}
          mr={"15px"}
          colorScheme="facebook"
          onClick={() => navigate("/writer")}
        >
          <FontAwesomeIcon icon={faPenNib} />
          　글쓰기
        </Button>
      )}

      {isAuthenticated() || (
        <Button
          size={"lg"}
          mr={"15px"}
          colorScheme="green"
          onClick={() => navigate("/signup")}
        >
          <FontAwesomeIcon icon={faUserPlus} />
          　회원가입
        </Button>
      )}
      {isAdmin() && (
        <Button
          size={"lg"}
          mr={"15px"}
          colorScheme="yellow"
          onClick={() => navigate("/member/list")}
        >
          <FontAwesomeIcon icon={faUsers} />
          　회원목록
        </Button>
      )}

      {isAuthenticated() && (
        <Button
          size={"lg"}
          mr={"15px"}
          background={"springgreen"}
          onClick={() => navigate("/member?" + urlParams.toString())}
        >
          <FontAwesomeIcon icon={faGear} />
          　회원정보
        </Button>
      )}

      {isAuthenticated() || (
        <Button
          size={"lg"}
          mr={"15px"}
          background={"wheat"}
          onClick={() => navigate("/login")}
        >
          <FontAwesomeIcon icon={faRightToBracket} />
          　로그인
        </Button>
      )}
      {isAuthenticated() && (
        <Button
          size={"lg"}
          mr={"15px"}
          background={"cornsilk"}
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          　로그아웃
        </Button>
      )}
    </Flex>
  );
}
