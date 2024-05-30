let backele = document.querySelector(".backtocamera");
// return to camera page
backele.addEventListener("click", (e) => {
    location.assign("./index.html")
})

setTimeout(() => {
    if(db){
        
        // this is for video
        let videodbtransection = db.transaction("video", "readonly");
        let videostore = videodbtransection.objectStore("video");
        let videorequest = videostore.getAll();
        videorequest.onsuccess = (e) => {
            let videoresult = videorequest.result;
            let gallaerycont = document.querySelector(".gallery-cont");
            videoresult.forEach((videoobj) => {
                let mediaele = document.createElement("div");
                mediaele.setAttribute("class","media-cont");
                mediaele.setAttribute("id", videoobj.id);

                let url = URL.createObjectURL(videoobj.videodata);
                mediaele.innerHTML = 
                `<div class="media">
                    <video autoplay loop src="${url}"></video>   
                </div>
                <div class="delet action">DELET</div>
                <div class="download action">DOWNLOAD</div>
                </div>`;
                
                gallaerycont.appendChild(mediaele);
                
                // working of deletbtn and downloadbtn for videos
                let deletbtn = mediaele.querySelector(".delet");
                deletbtn.addEventListener("click", deletlistner)
                let downloadbtn = mediaele.querySelector(".download");
                downloadbtn.addEventListener("click", downloadlistner)

            })
        }


        //this is for images
        let imgdbtransection = db.transaction("image", "readonly");
        let imagestore = imgdbtransection.objectStore("image");
        let imagerequest = imagestore.getAll();
        imagerequest.onsuccess = (e) => {
            let imageresult = imagerequest.result;
            let gallaerycont = document.querySelector(".gallery-cont");
            imageresult.forEach((imageobj) => {
                let mediaele = document.createElement("div");
                mediaele.setAttribute("class","media-cont");
                mediaele.setAttribute("id", imageobj.id);

                let url = imageobj.url;
                mediaele.innerHTML = 
                `<div class="media">
                    <image src="${url}" />   
                </div>
                <div class="delet action">DELET</div>
                <div class="download action">DOWNLOAD</div>
                </div>`;
                
                gallaerycont.appendChild(mediaele);
                
                // working of deletbtn and downloadbtn for videos
                let deletbtn = mediaele.querySelector(".delet");
                deletbtn.addEventListener("click", deletlistner)
                let downloadbtn = mediaele.querySelector(".download");
                downloadbtn.addEventListener("click", downloadlistner)
            });
        }
    } 
},100)

// remove element from ui and db
function deletlistner(e){
    // change in db
    let id = e.target.parentElement.getAttribute("id")
    let type = id.slice(0, 3);

    if(type === "vid"){
        let videodbtransection = db.transaction("video", "readwrite");
        let videostore = videodbtransection.objectStore("video");
        videostore.delete(id);
    }
    else if(type === "img"){
        let imgdbtransection = db.transaction("image", "readwrite");
        let imagestore = imgdbtransection.objectStore("image");
        imagestore.delete(id);
    }

    //change in ui
    e.target.parentElement.remove();
}

// download element from ui and db
function downloadlistner(e){
    let id = e.target.parentElement.getAttribute("id")
    let type = id.slice(0, 3);

    if(type === "vid"){
        let videodbtransection = db.transaction("video", "readwrite");
        let videostore = videodbtransection.objectStore("video");
        let videorequest = videostore.get(id);
        videorequest.onsuccess = (e) => {
            let videoresult = videorequest.result;

            let videourl = URL.createObjectURL(videoresult.videodata);
            let a = document.createElement("a");
            a.href = videourl;
            a.download = "stream.mp4";
            a.click();
        }
    }
    else if(type === "img"){
        let imgdbtransection = db.transaction("image", "readwrite");
        let imagestore = imgdbtransection.objectStore("image");
        let imagerequest = imagestore.get(id);
        imagerequest.onsuccess = (e) => {
            let imageresult = imagerequest.result;

            let imageurl = imageresult.url;
            let a = document.createElement("a");
            a.href = imageurl;
            a.download = "image.jpg";
            a.click();
        }
    }
}