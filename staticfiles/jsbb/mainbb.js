// 7,00 screen share
const popupScreen = document.querySelector(".popup-screen");

window.addEventListener("load", () => {
    setTimeout(() => {
    popupScreen.classList.add("active");
    }, 2000); //Popup the screen in 02 seconds after the page is loaded.
});



console.log('added js baby')

var mapPeersy={};
var usernameInputy=document.querySelector('#input_usernamebb');
var roomnameInputy=document.querySelector('#input_roomnamebb');
var btnjoiny=document.querySelector('#joinbtnbb');

var usernamey;
var roomnamey;

var webSockety ;


// he did...suck
function WebsocketOnMessageFucnbb(event) {
    console.log('connection messagebb')
    const parsedData = JSON.parse(event.data)
    console.log('data',parsedData)
    // console.log("parsedData['messagejs']",parsedData['messagejs'])
    console.log('msg usernamey ',usernamey);
    var peerUserNamey=parsedData['peerjs']
    var actiony=parsedData['actionjs']
    console.log('actiony',actiony);
    if (usernamey == peerUserNamey) {
        console.log('both same');
        popupScreen.classList.remove("active"); 

        return;
    }
    if (actiony == 'change_namebb') {
        console.log('change name baby');
        const err= document.querySelector('#inpt_errory');
        // const frm= document.querySelector('#popFormbb');
        // frm.reset();
        err.innerHTML='Please give another user name';
        return;
    }
    console.log('i am under');
    // popupScreen.classList.remove("active"); 

    var receiver_channel_namey=parsedData['messagejs']['receiver_channel_namejs'];

    if (actiony == 'new-peerjs') {
        console.log('new-peerjs baby');
        createOffererFuncbb(peerUserNamey,receiver_channel_namey);
        return;
    }

    // if (actiony == 'new-offerjs') {
    if (actiony == 'new-offerjs') {
        var offery=parsedData['messagejs'] ['sdpjs'];
        createAnswererFuncbb(offery,peerUserNamey,receiver_channel_namey);
        

        return;
    }
    //  if (actiony == 'new-answerjs') {
    if (actiony == 'new-answerjs') {
        var answer=parsedData['messagejs']['sdpjs'];
        var peer=mapPeersy[peerUserNamey][0];
        peer.setRemoteDescription(answer);


        return;
    }

    
}




btnjoiny.addEventListener('click',(e)=>{

// function btnjoinyFuncbb(){
    // usernamey=namey;
    e.preventDefault();

    // usernamey=trim(usernameInputy.value);    /* it's wrong */
    usernamey=usernameInputy.value.trim();
    roomnamey=roomnameInputy.value.trim();

    console.log('usernamey btnjoiny',usernamey)
    if (usernamey == '' || roomnamey =='' ) {
        const err= document.querySelector('#inpt_errory')
        err.innerHTML='Please fill both value'
        return;
    }else{
        // popupScreen.classList.remove("active"); 
        console.log('all typed baby')

    }
    // usernameInputy.value='';
    // usernameInputy.disabled=true;
    // usernameInputy.style.visibility='hidden';

    // btnjoiny.disabled=true;
    // btnjoiny.style.visibility='hidden'
    
    // var labelUsernamey=document.querySelector('#usernamebb');
    // labelUsernamey.innerText=usernamey;


    var locb=window.location;
    console.log('window.location',window.location)
    var wsStart='ws://'
    
    if (locb.protocol == 'https') {
        wsStart='wss://'
    }

    var endPoint=wsStart + locb.host + locb.pathname
    console.log(`locb.host-> ${locb.host }, locb.pathname-> ${locb.pathname} `)
    console.log('endPoint',endPoint)

    webSockety = new WebSocket(endPoint);
    webSockety.addEventListener('open',(e)=>{ // NOTE: he always write like this ....which is suck
    // webSockety.onopen = () =>{         // NOTE: learn from codewithsingh 
        console.log('connection openebb');

        sendSignalFuncbb('new-peerjs',{'room_namejs':roomnamey,'user_namejs':usernamey});
    });

    // webSockety.addEventListener('messagejs',WebsocketFucnbb);     // he
    
    webSockety.addEventListener('message',WebsocketOnMessageFucnbb);    
 

    
    webSockety.addEventListener('close',(e)=>{

    // webSockety.onclose = () =>{ 

        console.log('connection closebb')

    });

    webSockety.addEventListener('error',(e)=>{
        // webSocket.onerror = () =>{ 
        console.log('connection errorbb')
    });     


// }
})

var localStreamy=new MediaStream();
const contraintsy={
    'video':true,   
    'audio':true
}
const localVideoy=document.querySelector('#local_vidb')
const btnToggleAudioy=document.querySelector('#toggle_audiob')
const btnToggleVideoy=document.querySelector('#toggle_vidb')


// var audioTracksy;
// var videoTracksy;
// copied from https://webrtc.org/getting-started/media-devices
var userMediay=navigator.mediaDevices.getUserMedia(contraintsy)
    .then(stream =>{
        localStreamy = stream;
        localVideoy.srcObject = localStreamy;
        localVideoy.muted = true;           // it will not show any sound by default....not sure

        // localStreamy.getTracks().forEach(function(track) { track.stop(); })      // doing just for development...... so that it did not play our video https://stackoverflow.com/questions/40203036/how-stop-exit-video-in-webrtc-navigator-user-media-javascript own explore:

        var audioTracks=localStreamy.getAudioTracks();
        var videoTracks=localStreamy.getVideoTracks();

        audioTracks[0].enabled=true;
        videoTracks[0].enabled=true;

        btnToggleAudioy.addEventListener('click',()=>{
            audioTracks[0].enabled=!audioTracks[0].enabled;
            if (audioTracks[0].enabled) {
                // btnToggleAudioy.innerHTML='Audio Mute';
                var html = `
                        <i class="fas fa-microphone"></i>
                        <span>Mute</span>
                        `
                document.querySelector('.main__mute_button').innerHTML = html;
                return;
            }
            var html = `
                    <i class="unmute fas fa-microphone-slash"></i>
                    <span>Unmute</span>
                    `
            document.querySelector('.main__mute_button').innerHTML = html;
            // btnToggleAudioy.innerHTML='Audio UnMute';

        })

        btnToggleVideoy.addEventListener('click',()=>{
            videoTracks[0].enabled=!videoTracks[0].enabled;

            if (videoTracks[0].enabled) {
                // btnToggleVideoy.innerHTML='Video Off';
                var html = `
                    <i class="fas fa-video"></i>
                    <span>Stop Video</span>
                    `
                document.querySelector('.main__video_button').innerHTML = html;
                return;
            }
            var html = `
                        <i class="stop fas fa-video-slash"></i>
                        <span>Play Video</span>
                    `
            document.querySelector('.main__video_button').innerHTML = html;
            // btnToggleVideoy.innerHTML='Video On';

        })
    

    })
    .catch(error=>{
        console.log('Error accessing media devices baby',error);       // it will show this error if user did not allow to access camera 
    })

function muteUnmuteFuncbb() {
    // const enabled=audioTracksy[0].enabled;
    var enabled=audioTracksy[0].enabled;
    if (enabled) {
        audioTracksy[0].enabled=false;
        setUnmuteButtonFuncbb();
        return;
        
    }else{
        setMuteButtonFuncbb()
        audioTracksy[0].enabled=true;
        return;

      

    }

}

var setMuteButtonFuncbb = () => {
    var html = `
      <i class="fas fa-microphone"></i>
      <span>Mute</span>
    `
    document.querySelector('.main__mute_button').innerHTML = html;
}
  
var setUnmuteButtonFuncbb = () => {
    var html = `
        <i class="unmute fas fa-microphone-slash"></i>
        <span>Unmute</span>
    `
    document.querySelector('.main__mute_button').innerHTML = html;
}

  
function playStopFuncbb() {
    var enabled=videoTracksy[0].enabled

    if (enabled) {
        setPlayVideoFuncbb();
        videoTracksy[0].enabled=false;
    }else{
        setStopVideoFuncbb();
        videoTracksy[0].enabled=true;

    }
    
}

 
var setPlayVideoFuncbb = () => {
    var html = `
    <i class="stop fas fa-video-slash"></i>
      <span>Play Video</span>
    `
    document.querySelector('.main__video_button').innerHTML = html;
}
var setStopVideoFuncbb = () => {
    var html = `
      <i class="fas fa-video"></i>
      <span>Stop Video</span>
    `
    document.querySelector('.main__video_button').innerHTML = html;
}
  
var btnSendMsgy=document.querySelector('#btn_msg');   
var messageListy=document.querySelector('#msg_lst');
var messageInputy=document.querySelector('#msg_inputb');

// btnSendMsgy.addEventListener('click',sendMsgOnClickFuncbb);


var inputmsgy = document.getElementById('input_messageh');
inputmsgy.addEventListener('keydown', function onEvent(event) {
    if (event.key === "Enter") {        // https://stackoverflow.com/questions/11365632/how-to-detect-when-the-user-presses-enter-in-an-input-field
        sendMsgOnClickFuncbb()
        return;
    }
});

var uly=document.querySelector('ul');

function sendMsgOnClickFuncbb() {
    console.log('sendMsgOnClickFuncbb called');
    var messagef=inputmsgy.value;
    // var lif=document.createElement('li');
    // lif.appendChild(document.createTextNode('Me: ' + messagef));
    // messageListy.appendChild(lif);
    // var ulf=document.querySelector('ul');
    uly.innerHTML+=`<li class="message"><b>Me:</b><br/>${messagef}</li>`
    // ulf.append(`<li class="message"><b>Me:</b><br/>${messagef}</li>`)

    const msgDiv=document.querySelector('#main__chat_window')
    msgDiv.scrollTop=msgDiv.scrollHeight;
    
    var dataChannelsf=getDataChannelsFuncbb();
    console.log('btnSendMsgy usernamey ',usernamey);
    console.log('btnSendMsgy dataChannelsf',dataChannelsf);
    // messagef=usernamey + ' : ' + messagef;
    messagef=`<li class="message"><b>${usernamey}:</b><br/>${messagef}</li>`;
    console.log('messagef',messagef);
    for (indexf in dataChannelsf) {
        console.log('indexf',indexf)
        dataChannelsf[indexf].send(messagef)
    }
    inputmsgy.value='';
}


function sendSignalFuncbb(actiony,message) {
    webSockety.send(JSON.stringify({
        'peerjs':usernamey,
        'actionjs':actiony,
        'messagejs':message
      }))    
}

var peeryk;
function createOffererFuncbb(peerUserNamecc,receiver_channel_namecc) {
    var peercc=new RTCPeerConnection(null);
    peeryk=peercc;
    addLocalTracksFuncbb(peercc);

    var dcc=peercc.createDataChannel('channel');
    // dcc.onopen =()=>{
    dcc.addEventListener('open',()=>{
        console.log('datachannel connection opened offer')
    });
    // dcc.onmessage = dcOnMessageFuncbb;
    dcc.addEventListener('message',dcOnMessageFuncbb);          // NOTE: it's 'message' not 'messagejs'....own explore: it takes my 2 hours

    var remoteVideocc=creatVideoFuncbb(peerUserNamecc);
    
    setOnTrackFuncbb(peercc,remoteVideocc);
    mapPeersy[peerUserNamecc] = [peercc,dcc];

    peercc.addEventListener('iceconnectionstatechange',()=>{
        var iceConnectionStatecc=peercc.iceConnectionState;

        if (iceConnectionStatecc === 'failed' || iceConnectionStatecc === 'disconnected' || iceConnectionStatecc ==='closed') {
            delete mapPeersy[peerUserNamecc];
            if (iceConnectionStatecc != 'closed') {
                peercc.close();
            }
            removeVideoFuncbb(remoteVideocc);
            
        }
    });
    peercc.addEventListener('icecandidate',(eventcc)=>{
        if (eventcc.candidate) {
            // console.log('New Ice candidate baby',JSON.stringify(peercc.localDescription));
            console.log('New Ice candidate baby offer');
            return;
        }

        sendSignalFuncbb('new-offerjs',{
            'sdpjs':peercc.localDescription,
            'receiver_channel_namejs':receiver_channel_namecc
        });
    });
    peercc.createOffer()      // NOTE: IT'S not "createOffererFuncbb" ....it's 'createOffer 
        .then(o=>peercc.setLocalDescription(o))
        .then(()=>{
            console.log('Local Description set successfully baby');
        })
    

}



// NOTE: copief from "createOffererFuncbb"
function createAnswererFuncbb(offeraa,peerUserNameaa,receiver_channel_nameaa){ 
    var peeraa=new RTCPeerConnection(null);
    peeryk=peeraa;
    addLocalTracksFuncbb(peeraa);


    var remoteVideo=creatVideoFuncbb(peerUserNameaa);
    setOnTrackFuncbb(peeraa,remoteVideo);


    peeraa.addEventListener('datachannel',e =>{
        peeraa.dcaa=e.channel;

        // peeraa.dcaa.onopen =()=>{
        peeraa.dcaa.addEventListener('open',()=>{

            console.log('datachannel connection opened answerer baby')
        })
        // dc.onmessage = dcOnMessageFuncbb;
        peeraa.dcaa.addEventListener('message',dcOnMessageFuncbb)       // NOTE: it's 'message' not 'messagejs'
    
        mapPeersy[peerUserNameaa] = [peeraa,peeraa.dcaa];
    });




    peeraa.addEventListener('iceconnectionstatechange',()=>{
        var iceConnectionStateaa=peeraa.iceConnectionState;

        if (iceConnectionStateaa === 'failed' || iceConnectionStateaa === 'disconnected' || iceConnectionStateaa ==='closed') {
            delete mapPeersy[peerUserNameaa];
            if (iceConnectionStateaa != 'closed') {
                peeraa.close();
            }
            removeVideoFuncbb(remoteVideo);
            
        }
    });
    peeraa.addEventListener('icecandidate',(eventaa)=>{
        if (eventaa.candidate) {
            // console.log('New Ice candidate',JSON.stringify(peeraa.localDescription));
            console.log('New Ice candidate answer');
            return;
        }

        sendSignalFuncbb('new-answerjs',{
            'sdpjs':peeraa.localDescription,
            'receiver_channel_namejs':receiver_channel_nameaa
        })
    });
    peeraa.setRemoteDescription(offeraa)
    .then(()=>{
        console.log(`Remote description set successfully for ${peerUserNameaa}`)
        return peeraa.createAnswer();     // it's not "createAnswererFuncbb" 
    })
    .then(a=>{
        console.log('Answer Created baby');
        peeraa.setLocalDescription(a)
    })
}


// done



function addLocalTracksFuncbb(peerl) {
    console.log('addLocalTracksFuncbb called');
    localStreamy.getTracks().forEach(track =>{
        peerl.addTrack(track,localStreamy);
    });
    return;
}

// done
function dcOnMessageFuncbb(eventd) {
    console.log('dcOnMessage called');

    var messaged=eventd.data;
    console.log('messaged',messaged);    
    // var lid=document.createElement('li');
    // lid.appendChild(document.createTextNode(messaged));

    // messageListy.appendChild(lid);
    // var uld=document.querySelector('ul');
    // uly.innerHTML+=`<li class="message"><b>Me:</b><br/>${messaged}</li>`;
    uly.innerHTML+=messaged;
    const msgDiv=document.querySelector('#main__chat_window')
    msgDiv.scrollTop=msgDiv.scrollHeight;
    // uld.appendChild(`<li class="message"><b>Me:</b><br/>${messaged}</li>`)
}


// done
function creatVideoFuncbb(peerUserNamec) {
    console.log('creatVideoFuncbb called');
    console.log('peerUserNamec',peerUserNamec);
    // var videoContainernn=document.querySelector('#video_containerh');
    // var videoGridv = document.getElementById('video-gridb')
    var videoGridv = document.querySelector('#video-gridb')
    var remoteVideov=document.createElement('video');

    remoteVideov.id =peerUserNamec + '-video';
    remoteVideov.autoplay=true;
    remoteVideov.playsInline =true;

    var videoWrapperv=document.createElement('div');
    videoGridv.appendChild(videoWrapperv);
    videoWrapperv.appendChild(remoteVideov);
    
    return remoteVideov;
}

// done
function setOnTrackFuncbb(peert,remoteVideost) {
    console.log('setOnTrackFuncbb called');
    var remoteStreamt=new MediaStream();
    remoteVideost.srcObject=remoteStreamt;

    peert.addEventListener('track',async (eventt)=>{
        remoteStreamt.addTrack(eventt.track,remoteStreamt)
    });
}

// done
function removeVideoFuncbb(videorr) {
    var videoWrapperr=videorr.parentNode;
    videoWrapperr.parentNode.removeChild(videoWrapperr);

}

function getDataChannelsFuncbb() {
    var dataChannelsf=[];

    for (peerUserNamem in mapPeersy) {
        var dataChannelp=mapPeersy[peerUserNamem][1];
        dataChannelsf.push(dataChannelp)
    }
    console.log('getDataChannelsFuncbb mapPeersy ',mapPeersy);
    console.log('getDataChannelsFuncbb dataChannelsf ',dataChannelsf);

    return dataChannelsf;
}