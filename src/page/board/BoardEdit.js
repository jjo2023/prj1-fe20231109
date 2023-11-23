import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Switch,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useImmer } from "use-immer";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export function BoardEdit() {
  const [board, updateBoard] = useImmer(null);
  const [removeFileIds, setRemoveFileIds] = useState([]);
  const [uploadFiles, setUploadFiles] = useState(null);

  // /edit/:id
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  const { isOpen, onClose, onOpen } = useDisclosure();

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
      .putForm("/api/board/edit", {
        id: board.id,
        title: board.title,
        content: board.content,
        removeFileIds,
        uploadFiles,
      })
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

  function handleRemoveFileSwitch(e) {
    if (e.target.checked) {
      // removeFileIds 에 추가
      setRemoveFileIds([...removeFileIds, e.target.value]);
    } else {
      // removeFileIds 에서 삭제
      setRemoveFileIds(removeFileIds.filter((item) => item !== e.target.value));
    }
  }

  return (
    <Center>
      <Card>
        <CardHeader>
          <Heading size={"lg"}>{id}번 글 수정</Heading>
        </CardHeader>
        <CardBody>
          <FormControl mb={5}>
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

          <FormControl mb={5}>
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

          {/* 이미지 출력 */}
          {board.files.length > 0 &&
            board.files.map((file) => (
              <Card key={file.id} my={5}>
                <CardBody>
                  <Image src={file.url} alt={file.name} width="45%" />
                </CardBody>
                <Divider />
                <CardFooter>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel>
                      <FontAwesomeIcon color="red" icon={faTrashCan} />
                    </FormLabel>
                    <Switch
                      value={file.id}
                      colorScheme="red"
                      onChange={handleRemoveFileSwitch}
                    />
                  </FormControl>
                </CardFooter>
              </Card>
            ))}

          {/* 추가할 파일 선택 */}
          <FormControl>
            <FormLabel>이미지</FormLabel>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setUploadFiles(e.target.files)}
            />
            <FormHelperText>
              한 개 파일은 1MB 이내, 총 용량은 10MB 이내로 첨부하세요.
            </FormHelperText>
          </FormControl>
        </CardBody>

        <CardFooter>
          <Button mr={"8px"} colorScheme="pink" onClick={onOpen}>
            저장
          </Button>
          {/* navigate(-1) : 이전 경로로 이동 */}
          <Button onClick={() => navigate(-1)}>취소</Button>
        </CardFooter>
      </Card>

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
    </Center>
  );
}
