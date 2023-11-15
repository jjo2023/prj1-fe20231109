import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Input,
  Stack,
  StackDivider,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

function CommentForm({ boardId }) {
  const [comment, setComment] = useState("");

  function handleSubmit() {
    axios.post("/api/comment/add", {
      boardId: boardId,
      comment: comment,
    });
  }

  return (
    <Box>
      <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button onClick={handleSubmit}>쓰기</Button>
    </Box>
  );
}

function CommentList({ boardId }) {
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("id", boardId);
    axios
      .get("/api/comment/list?" + params)
      .then((response) => setCommentList(response.data));
  }, []);

  return (
    <Card>
      <CardHeader>
        <Heading size={"md"}>댓글 리스트</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {/* TODO : 새로운 줄 출력 (<Text sx={{ whiteSpace: "pre-wrap" }} 이거 넣음.. */}

          {/* TODO : 댓글 작성 후 re render */}
          {commentList.map((comment) => (
            <Box>
              <Flex justifyContent={"space-between"}>
                <Heading size={"xs"}>{comment.memberId}</Heading>
                <Text fontSize={"xs"}>{comment.inserted}</Text>
              </Flex>
              <Text sx={{ whiteSpace: "pre-wrap" }} pt={"2"} fontSize={"sm"}>
                {comment.comment}
              </Text>
            </Box>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}

export function CommentContainer({ boardId }) {
  return (
    <Box>
      <CommentForm boardId={boardId} />
      <CommentList boardId={boardId} />
    </Box>
  );
}
