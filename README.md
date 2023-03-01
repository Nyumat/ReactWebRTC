# ReactWebRTC

For the CS494 (Advanced Web Development) final project, we are going to build a web application that allows users to video chat and text chat with each other.

I thought I'd be fun to play around with WebRTC prior, so I'm building this pet project to get familiar with the technology.

## What is WebRTC?

WebRTC is a free, open source standars that provides browsers and mobile applications with Web Real-Time Communications (WebRTC) capabilities via simple APIs.

The WebRTC components allow for peer-to-peer communication, which means that users can communicate directly without the need for an intermediary (server).

WebRTC makes it possible to build applications for low latency and real-time voice calling, video chat, and P2P file sharing.

In this repo, we have an intermediary server that handles the signaling process. The signaling process is the process of exchanging information between two peers in order to establish a connection.

In the older commits, I used manual signaling, but I've since switched to using a signaling server with socket.io and node.js in order to make the process easier.

## Getting Started

Clone the repository and install the dependencies.

```bash
git clone https://github.com/Nyumat/ReactWebRTC.git
cd ReactWebRTC
npm install
```

## Running the App

```bash
npm start
```
