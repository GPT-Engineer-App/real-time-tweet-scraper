import React, { useState } from "react";
import { Container, VStack, Input, Button, Text, Box, HStack, IconButton, Spinner } from "@chakra-ui/react";
import { FaTwitter } from "react-icons/fa";

const mockFetchTweets = (keyword) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, text: `This is a mock tweet about ${keyword}`, comments: ["Great post!", "Very informative."] },
        { id: 2, text: `Another tweet mentioning ${keyword}`, comments: ["Interesting!", "Thanks for sharing."] },
      ]);
    }, 1000);
  });
};

const Index = () => {
  const [keyword, setKeyword] = useState("");
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const results = await mockFetchTweets(keyword);
    setTweets(results);
    setLoading(false);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input placeholder="Enter keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          <IconButton aria-label="Search Twitter" icon={<FaTwitter />} onClick={handleSearch} />
        </HStack>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          tweets.map((tweet) => (
            <Box key={tweet.id} p={4} borderWidth="1px" borderRadius="lg" width="100%">
              <Text fontSize="lg">{tweet.text}</Text>
              <VStack align="start" mt={2}>
                {tweet.comments.map((comment, index) => (
                  <Text key={index} fontSize="sm" color="gray.500">
                    - {comment}
                  </Text>
                ))}
              </VStack>
            </Box>
          ))
        )}
      </VStack>
    </Container>
  );
};

export default Index;
