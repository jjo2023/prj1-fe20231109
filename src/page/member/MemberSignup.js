import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberSignup() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [email, setEmail] = useState("");
  const [idAvailable, setIdAvailable] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [emailAvailable, setEmailAvailable] = useState(false);

  let submitAvailable = true;

  if (!emailAvailable) {
    submitAvailable = false;
  }

  if (!idAvailable) {
    submitAvailable = false;
  }

  if (password != passwordCheck) {
    submitAvailable = false;
  }

  if (password.length === 0) {
    submitAvailable = false;
  }

  function handleSubmit() {
    axios
      .post("/api/member/signup", {
        id,
        password,
        email,
      })
      .then(() => {
        toast({
          description: "회원가입이 완료되었습니다",
          status: "success",
        });
      })
      .catch((error) => {
        if (error.reponse.status === 400) {
          toast({
            description: "입력값을 확인해 주세요",
            status: "error",
          });
        } else {
          toast({
            description: "가입중 오류가 발생하였습니다",
            status: "error",
          });
        }
      })
      .finally(() => console.log("done"));
  }

  function handleIdCheck() {
    const searchParam = new URLSearchParams();
    searchParam.set("id", id);

    axios
      .get("/api/member/check?" + searchParam.toString())
      .then(() => {
        setIdAvailable(false);
        toast({
          description: "이미 사용 중인 ID입니다.",
          status: "warning",
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIdAvailable(true);
          toast({
            description: "사용 가능한 ID입니다.",
            status: "success",
          });
        }
      });
  }

  function handleEmailCheck() {
    const params = new URLSearchParams();
    params.set("email", email);

    axios
      .get("/api/member/check?" + params)
      .then(() => {
        toast({
          description: "이미 사용 중 입니다",
          status: "warning",
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setEmailAvailable(true);
          toast({
            description: "사용가능한 email 입니다",
            status: "success",
          });
        }
      });
  }

  return (
    <Box>
      <h1>회원 가입</h1>
      <FormControl isInvalid={!idAvailable}>
        <FormLabel>id</FormLabel>
        <Flex>
          <Input
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              setIdAvailable(false);
            }}
          />
          <Button onClick={handleIdCheck}>중복확인</Button>
        </Flex>
        <FormErrorMessage>중복된 아이디 입니다</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={password.length === 0}>
        <FormLabel>password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormErrorMessage>암호를 입력하세요.</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={password != passwordCheck}>
        <FormLabel>password 확인</FormLabel>
        <Input
          type="password"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
        <FormErrorMessage>암호가 다릅니다.</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!emailAvailable}>
        <FormLabel>email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setEmailAvailable(false);
            setEmail(e.target.value);
          }}
        />
        <Button onClick={handleEmailCheck}>중복 체크</Button>
        <FormErrorMessage>중복 체크를 해주세요</FormErrorMessage>
      </FormControl>

      <Button
        isDisabled={!submitAvailable}
        onClick={handleSubmit}
        colorScheme="blue"
      >
        가입
      </Button>
    </Box>
  );
}