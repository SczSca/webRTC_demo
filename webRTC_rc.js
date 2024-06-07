const offer = {};
const remoteConnection = new RTCPeerConnection();

remoteConnection.onicecandidate = e => console.log(`New ICE candidate! reprinting SDP ${JSON.stringify(remoteConnection.localDescription)}`);

//get data connection
remoteConnection.ondatachannel = e => {
    remoteConnection.dataChannel = e.channel;
    remoteConnection.dataChannel.onmessage = e => console.log(`New message from client! ${e.data}`);
    remoteConnection.dataChannel.onopen = e => console.log("Connection Opened!!");
}

remoteConnection.setRemoteDescription(offer)
    .then(a => console.log("offer set"));
remoteConnection.createAnswer()
    .then(a => remoteConnection.setLocalDescription(a))
    .then(a => console.log("answer created"));

//if connection is opened
remoteConnection.dataChannel.send("This is a message sent by the one that was asked to open a connection");