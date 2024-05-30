// HTML selectors
let video = document.querySelector("video");
let recordbtncont = document.querySelector(".record-btn-cont");
let capturebtncont = document.querySelector(".capture-btn-cont");
let recordbtn = document.querySelector(".record-btn");
let capturebtn = document.querySelector(".capture-btn");
let timer = document.querySelector(".timer");
var recordflag = false;
let filtercolor = "transparent";

let recorder;
let chunks = [];

let constrains = {
    video: true,
    Audio: true
}
navigator.mediaDevices.getUserMedia(constrains)
    .then((stream) => {
        video.srcObject = stream;

        recorder = new MediaRecorder(stream);

        recorder.addEventListener("start", (e) => {
            chunks = [];
        })
        recorder.addEventListener("dataavailable", (e) => {
            chunks.push(e.data);
        })
        recorder.addEventListener("stop", (e) => {
            // conversion of chunks to video
            let blob = new Blob(chunks, { type: "video/mp4" });
           
            if(db){
                let videoid = shortid();
                let dbtransection = db.transaction("video","readwrite")
                let videostore = dbtransection.objectStore("video")
                let videoentry = {
                    id : `vid-${videoid}`,
                    videodata : blob
                }
                videostore.add(videoentry); 
            }
         })
     })

recordbtncont.addEventListener('click', (e) => {
    // user denie the permission then simply return
    if (!recorder)
        return;

    recordflag = !recordflag;

    if (recordflag) {
        // start the recording
        recorder.start();
        recordbtn.classList.add("scale-record");
        starttimer();
    }
    else {
        // stop the recording
        recorder.stop();
        recordbtn.classList.remove("scale-record");
        stoptimer();
    }
})

capturebtncont.addEventListener("click", (e) => {
    capturebtn.classList.add("scale-capture"); 

    let canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    let tool = canvas.getContext("2d");
    tool.drawImage(video, 0, 0, canvas.width, canvas.height);

    //filtering on image
    tool.fillStyle = filtercolor;
    tool.fillRect(0, 0, canvas.width, canvas.height)
    let imageURL = canvas.toDataURL();
    
    if(db){
        let imageid = shortid();
        let dbtransection = db.transaction("image","readwrite")
        let imagestore = dbtransection.objectStore("image")
        let imageentry = {
            id : `img-${imageid}`,
            url : imageURL
        }
        imagestore.add(imageentry); 
    }
    capturebtn.classList.remove("scale-capture");
})

let timerId;
let counter = 0;    // represent the total time in second
function starttimer() {
    timer.style.display = "block";
    function displaytimer() {

        let totalseconds = counter;

        let hours = Number.parseInt(counter / 3600);

        totalseconds = totalseconds % 3600;
        let minutes = Number.parseInt(totalseconds / 60);

        totalseconds = totalseconds % 60;
        let seconds = totalseconds;

        hours = (hours < 10) ? `0${hours}` : `${hours}`;
        minutes = (minutes < 10) ? `0${minutes}` : `${minutes}`;
        seconds = (seconds < 10) ? `0${seconds}` : `${seconds}`;

        timer.innerText = `${hours}:${minutes}:${seconds}`;
        counter++;
    }
    timerID = setInterval(displaytimer, 1000)
}
function stoptimer() {
    clearInterval(timerID);
    timer.innerText = "00:00:00";
    timer.style.display = "none";
}

//filtering
let filterlayer = document.querySelector(".filter-layer");
let Allfilter = document.querySelectorAll(".filter");
Allfilter.forEach(filterelement => {
    filterelement.addEventListener("click", (e) => {
       filtercolor = getComputedStyle(filterelement).getPropertyValue("background-color");
       filterlayer.style.backgroundColor = filtercolor;
    })
});


