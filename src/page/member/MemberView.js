import { useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

export function MemberView() {
  const [member, setMember] = useState(null);
  // /member?id=userid
  const [params] = useSearchParams();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/member?" + params.toString())
      .then((response) => setMember(response.data))
      .catch((error) => {
        navigate("/login");
        toast({
          description: "권한이 없습니다",
          status: "warning",
        });
      });
  }, []);

  if (member === null) {
    return <Spinner />;
  }

  function handleDelete() {
    // axios
    // delete /api/member?id=userid
    // ok -> home 이동, toast 띄우기
    // error -> toast 띄우기
    // finally -> modal 닫기

    axios
      .delete("/api/member?" + params.toString())
      .then(() => {
        toast({
          description: "회원 탈퇴하였습니다",
          status: "success",
        });
        navigate("/");

        //TODO : 로그아웃 기능 추가하기
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          toast({
            description: "권한이 없습니다",
            status: "error",
          });
        } else {
          toast({
            description: "탈퇴 중 문제가 발생 하였습니다",
            status: "error",
          });
        }
      });
  }

  return (
    <Box>
      <br />
      <h1>{member.id}님 정보</h1>
      <br />
      <FormControl>
        <FormLabel>password</FormLabel>
        <Input type="text" value={member.password} readOnly />
      </FormControl>

      <FormControl>
        <FormLabel>닉네임</FormLabel>
        <Input value={member.nickName} readOnly />
      </FormControl>

      <FormControl>
        <FormLabel>email</FormLabel>
        <Input value={member.email} readOnly />
      </FormControl>

      <Button
        colorScheme="purple"
        onClick={() => navigate("/member/edit?" + params.toString())}
      >
        수정
      </Button>
      <Button colorScheme="red" onClick={onOpen}>
        탈퇴
      </Button>

      {/* 탈퇴 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>탈퇴 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>탈퇴 하시겠습니까?</ModalBody>

          <ModalFooter>
            <Button size={"sm"} mr={"8px"} onClick={onClose}>
              닫기🩷
            </Button>
            <Button size={"sm"} onClick={handleDelete} colorScheme="red">
              탈퇴😐
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
