import { useState, useRef, useEffect } from "react";
import { Button, Center, Text, VStack, HStack, Input } from "@chakra-ui/react";

function App() {
  const videoStream = useRef(null);
  const remoteStream = useRef(null);

  const options = {
    audio: true,
    video: true,
  };

  const getAccess = async () => {
    await navigator.mediaDevices
      .getUserMedia(options)
      .then((stream) => {
        videoStream.current.srcObject = stream;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Center>
      <VStack>
        <Text fontSize="6xl">Welcome to WebRTC React</Text>
        <HStack>
          <Button onClick={() => getAccess()}>Get Media Devices</Button>
        </HStack>
        <HStack>
          <video
            style={{
              width: "600px",
              height: "600px",
              border: "1px solid black",
              borderRadius: "10px",
              backgroundColor: "black",
              margin: "10px",
            }}
            ref={videoStream}
            autoPlay
          />
          <video
            style={{
              width: "600px",
              height: "600px",
              border: "1px solid black",
              borderRadius: "10px",
              backgroundColor: "black",
              margin: "10px",
            }}
            ref={remoteStream}
            autoPlay
          />
        </HStack>
      </VStack>
    </Center>
  );
}

export default App;
