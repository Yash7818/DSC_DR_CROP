import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { useSelector } from "react-redux";


const VideoContainer = styled.div`
padding:0;
margin:0;
box-sizing:border-box;
display:flex;
overflow-y:hidden;
overflow-x:hidden;
`;

const Container = styled.div`
    padding:0;
    margin:0;
    display: flex;
    height: 100vh;
    width: 82%;
    flex-wrap: wrap;
    background-color: rgba(7, 6, 28, 1);
    box-sizing:border-box;
    overflow-y:hidden;
    overflow-x:hidden;
    `;
const UserContainer = styled.div`
    padding:0;
    margin0;
    width:18%;
    overflow-x:hidden;
    background-color: rgba(1, 1, 1, 0.88);
`;

const Party = styled.div`
padding-left:3.6em;
text-transform:Capitalize;
border:2px #000 soild;
color:#fff;
`;
const VideoDiv = styled.div`
height:33%;
width: 33%;
padding:0;
margin:0;
`;
const StyledVideo = styled.video`
height: 33%;
width:33%;
`;
const StyledVideoduo = styled.video`
height: 100%;
width: 100%;
`;
const Navof = styled.div`
    display:flex;
    position:absolute;
    letter-spacing:3em;
    padding:0 15em;
    bottom:1em;
    color:#fff;
    font-size:2em;
    z-index:10;
    cursor:pointer;
`;

const RefVideo = styled.i`
    z-index:10;
`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
             <StyledVideo playsInline autoPlay ref={ref} ></StyledVideo>   
    );
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Room = (props) => {
    const [voice,setVoice] = useState(false);
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomID = props.match.params.roomID;

    var userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;
    // console.log(userInfo.name)
    const callcutHandler = () => {
        window.close();
    }

    const MessageChat = () =>{
        window.open(`https://yash7818chat-app.herokuapp.com/chat.html?username=${userInfo.name}&room=${roomID}`)
    }
    const MuteMe = () =>{
        if(voice){
            console.log(voice)
            setVoice(false);
        }
        else{
            setVoice(true);
        }
    }

    useEffect(() => {
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })
    }, []);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    return (
        <VideoContainer>
             <Container>
            <StyledVideo muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer, index) => {
                return (
                    <Video key={index} peer={peer} />
                );
            })}

            <Navof>
            <i class="fas fa-phone-slash" onClick={callcutHandler}></i>
            <i class="far fa-comments" onClick={MessageChat}></i>
            </Navof>
        </Container>
        </VideoContainer>
       
    );
};

export default Room;
