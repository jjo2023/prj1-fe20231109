import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function BoardWrite(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  function handleSubmit() {
    setIsSubmitting(true);

    axios
      .post("/api/board/add", {
        title,
        content,
      })
      .then(() => {
        toast({
          description: "새 글이 저장되었습니다",
          status: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 400) {
          toast({
            description: "작성한 내용을 확인해 주세요😿",
            status: "error",
          });
        } else {
          toast({
            description: "저장 중 문제가 발생 하였습니다😿",
            status: "error",
          });
        }
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <Box>
      <br />
      <h1>게시물 작성</h1>
      <br />
      <Box>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input
            background={"pink.50"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>본문</FormLabel>
          <Textarea
            background={"pink.50"}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></Textarea>
        </FormControl>

        <Button
          mt={"30px"}
          isDisabled={isSubmitting}
          onClick={handleSubmit}
          colorScheme="pink"
        >
          저장
        </Button>
      </Box>
    </Box>
  );
}

export default BoardWrite;
