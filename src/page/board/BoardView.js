import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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

export function BoardView() {
  const [board, setBoard] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("/api/board/id/" + id)
      .then((response) => setBoard(response.data));
  }, []);

  if (board === null) {
    return <Spinner />;
  }

  function handleDelete() {
    axios
      .delete("/api/board/remove/" + id)
      .then((response) => {
        toast({
          description: id + "번  게시물이 삭제되었습니다",
          status: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        toast({ description: "삭제 중 문제발생😣", status: "error" });
      })
      .finally(() => onClose);
  }

  return (
    <Box>
      <br />
      <h1>{board.id}글 보기</h1>
      <br />
      <FormControl>
        <FormLabel>제목</FormLabel>
        <Input background={"pink.50"} value={board.title} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>본문</FormLabel>
        <Input background={"pink.50"} value={board.content} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>작성자</FormLabel>
        <Input background={"pink.50"} value={board.nickName} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>작성일시</FormLabel>
        <Input background={"pink.50"} value={board.inserted} readOnly />
      </FormControl>

      <Button
        size={"sm"}
        mt={"30px"}
        mr={"8px"}
        colorScheme="blue"
        onClick={() => navigate("/edit/" + id)}
      >
        수정
      </Button>
      <Button size={"sm"} mt={"30px"} colorScheme="red" onClick={onOpen}>
        삭제
      </Button>

      {/* 삭제 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>삭제 하시겠습니까?</ModalBody>

          <ModalFooter>
            <Button size={"sm"} mr={"8px"} onClick={onClose}>
              닫기🩷
            </Button>
            <Button size={"sm"} onClick={handleDelete} colorScheme="red">
              삭제😐
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
