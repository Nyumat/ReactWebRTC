import { useState, useRef, useEffect } from "react";
import { Button, Center, Text, VStack, HStack, Input } from "@chakra-ui/react";

/**
 * We're doing manual signaling just to keep things simple.
 * In a real application, you would use a signaling server to exchange the SDP and ICE candidates.
 *
 * The signaling server is a server that is used to exchange data (SDP, ICE Candidates) between two peers.
 **/

function App() {
  const videoStream = useRef(null);
  const remoteStream = useRef(null);
  const peer = useRef(null);

  const textAreaRef = useRef(null);

  const options = {
    audio: false,
    video: true,
  };

  // const getAccess = async () => {
  //   await navigator.mediaDevices
  //     .getUserMedia(options)
  //     .then((stream) => {
  //       videoStream.current.srcObject = stream;
  //       stream.getTracks().forEach((track) => {
  //         peerConnection.addTrack(track, stream);
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const createOffer = async () => {
    peer.current
      .createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      })
      .then((offer) => {
        // Offer is an object that contains the SDP (Session Description Protocol) data.
        console.log(JSON.stringify(offer));
        peer.current.setLocalDescription(offer);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createAnswer = async () => {
    peer.current
      .createAnswer({
        offerToReceiveAudio: false,
        offerToReceiveVideo: true,
      })
      .then((answer) => {
        // Answer is an object that contains the SDP (Session Description Protocol) data.
        console.log(JSON.stringify(answer));
        peer.current.setLocalDescription(answer);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setRemoteDescription = async () => {
    const remoteDescription = JSON.parse(textAreaRef.current.value);
    peer.current
      .setRemoteDescription(new RTCSessionDescription(remoteDescription))
      .then(() => {
        console.log("Remote Description Set");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addCandidate = async () => {
    const candidate = JSON.parse(textAreaRef.current.value);
    peer.current
      .addIceCandidate(new RTCIceCandidate(candidate))
      .then(() => {
        console.log("Candidate Added");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // getAccess();
    const peerConnection = new RTCPeerConnection();

    navigator.mediaDevices
      .getUserMedia(options)
      .then((stream) => {
        videoStream.current.srcObject = stream;
        stream.getTracks().forEach((track) => {
          peerConnection.addTrack(track, stream);
        });
      })
      .catch((err) => {
        console.log(err);
      });

    peerConnection.onicecandidate = (e) => {
      if (e.candidate) {
        // When we get an ICE candidate from the remote peer, we need to send it to the remote peer.
        console.log(JSON.stringify(e.candidate));
      }
    };

    peerConnection.ontrack = (e) => {
      // When we get a track from the remote peer, we need to add it to the video element.
      remoteStream.current.srcObject = e.streams[0];
    };

    peerConnection.onnegotiationneeded = (e) => {
      if (peerConnection.signalingState !== "stable") return;
      console.log("Negotiation Needed");
    };

    peerConnection.oniceconnectionstatechange = (e) => {
      if (peerConnection.iceConnectionState === "disconnected") {
        console.log("Disconnected");
      }

      if (peerConnection.iceConnectionState === "failed") {
        console.log("Failed");
      }

      if (peerConnection.iceConnectionState === "closed") {
        console.log("Closed");
      }

      if (peerConnection.iceConnectionState === "connected") {
        console.log("Connected");
      }
    };

    peer.current = peerConnection;
  }, []);

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
        <Input ref={textAreaRef} my={16} bg={"gray"} p={8} />
        <HStack pt={12}>
          <Button onClick={createOffer}>Create Offer</Button>
          <Button onClick={createAnswer}>Create Answer</Button>
        </HStack>
        <HStack pb={16}>
          <Button onClick={addCandidate}>Add Candidates</Button>
          <Button onClick={setRemoteDescription}>Set Remote Description</Button>
        </HStack>
      </VStack>
    </Center>
  );
}

export default App;
