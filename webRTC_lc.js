//script to create offer
const localConnection = new RTCPeerConnection();
const dc = localConnection.createDataChannel("channel");

dc.onmessage = e => console.log(`Just got a message ${e.data}`);
dc.onopen = e => console.log("Connection opened!");

localConnection.onicecandidate = e => console.log(`New ICE candidate! reprinting SDP ${JSON.stringify(localConnection.localDescription)}`);
localConnection.createOffer()
    .then(o => localConnection.setLocalDescription(o))
    .then(a => console.log("set successfully"));

//receiving answer from source
const answer = {};//here goes SDP answer from destination host
localConnection.setRemoteDescription(answer);

//if connection is opened
dc.send("This is a message sent by the one that requested for the connection");
