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
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useImmer } from "use-immer";
import axios from "axios";

export function BoardEdit() {
  const [board, updateBoard] = useImmer(null);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  // /edit/:id
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("/api/board/id/" + id)
      .then((response) => updateBoard(response.data));
  }, []);

  if (board === null) {
    return <Spinner />;
  }

  function handleSubmit() {
    // 저장 버튼 클릭시
    // PUT /api/board/edit

    axios
      .put("/api/board/edit", board)
      .then(() => {
        toast({
          description: board.id + "번 게시글이 수정되었습니다.",
          status: "success",
        });

        navigate("/board/" + id);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast({
            description: "요청이 잘못되었습니다.",
            status: "error",
          });
        } else {
          toast({
            description: "수정 중에 문제가 발생하였습니다.",
            status: "error",
          });
        }
      })
      .finally(() => onClose());
  }

  return (
    <Box>
      <h1>{id}번 글 수정</h1>
      <FormControl>
        <FormLabel>제목</FormLabel>
        <Input
          background={"pink.50"}
          value={board.title}
          onChange={(e) => {
            updateBoard((dratf) => {
              dratf.title = e.target.value;
            });
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>본문</FormLabel>
        <Input
          background={"pink.50"}
          value={board.content}
          onChange={(e) => {
            updateBoard((dratf) => {
              dratf.content = e.target.value;
            });
          }}
        />
      </FormControl>

      <Button colorScheme="blue" onClick={onOpen}>
        저장
      </Button>
      {/* navigate(-1) : 이전 경로로 이동 */}
      <Button onClick={() => navigate(-1)}>취소</Button>

      {/* 수정 모달 만들기! */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>수정 확인❤️</ModalHeader>
          <ModalCloseButton>✖️</ModalCloseButton>
          <ModalBody>수정 하시겠습니까?😉</ModalBody>

          <ModalFooter>
            <Button
              size={"sm"}
              mr={"8px"}
              onClick={handleSubmit}
              background={"coral"}
            >
              예😆
            </Button>
            <Button size={"sm"} onClick={onClose}>
              잠시만용❗
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
