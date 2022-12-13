function shortblock() {
    let id = null;
    const short = document.getElementById("short");
    const main = document.getElementById("main");
    let pos = 2;
    let ind = 1;
    clearInterval(id);
    id = setInterval(frame1, 10);
    function frame1() {
        if (pos >= 100) {
            clearInterval(id);
            main.style.display = "none";
            pos = 100;
            short.style.left = "110vw";
            short.style.display = "block"
            clearInterval(id);
            id = setInterval(frame2, 10);
            function frame2() {
                if (pos <= 4) {
                    clearInterval(id);
                    short.style.left = "4vw";
                } else {
                    ind = ind * 0.95;
                    pos = pos - ind;
                    short.style.left = pos + "vw"; 
                }
            }
        } else {
            ind = ind * 1.05;
            pos = pos + ind;
            main.style.left = pos + "vw";
        }
    }
}
function shortnone() {
    let id = null;
    const short = document.getElementById("short");
    const main = document.getElementById("main");
    let pos = 4;
    let ind = 1;
    clearInterval(id);
    id = setInterval(frame1, 10);
    function frame1() {
        if (pos >= 100) {
            clearInterval(id);
            short.style.display = "none";
            pos = 100;
            main.style.left = "110vw";
            main.style.display = "block";
            clearInterval(id);
            id = setInterval(frame2, 10);
            function frame2() {
                if (pos <= 2) {
                    clearInterval(id);
                    main.style.left = "2vw";
                } else {
                    ind = ind * 0.95;
                    pos = pos - ind;
                    main.style.left = pos + "vw"; 
                }
            }
        } else {
            ind = ind * 1.05;
            pos = pos + ind;
            short.style.left = pos + "vw";
        }
    }
}
function reglogblock(reglogrst) {
    document.getElementById("reg").style.display = "none";
    document.getElementById("log").style.display = "none";
    document.getElementById("rst").style.display = "none";
    document.getElementById(reglogrst).style.display = "block";

    document.getElementById("breg").style.backgroundColor = "#6c47d1";
    document.getElementById("blog").style.backgroundColor = "#6c47d1";
    document.getElementById("brst").style.backgroundColor = "#6c47d1";
    document.getElementById("b" + reglogrst).style.backgroundColor = "#301380";

    const reglog = document.getElementById("reglog");
    if (window.getComputedStyle(reglog).opacity == "0") {
        const short = document.getElementById("short");
        const main = document.getElementById("main");
        reglog.style.display = "block"
        let op = 0;
        let id = null;
        clearInterval(id);
        id = setInterval(frame, 10);
        function frame() {
            if (op >= 100) {
                clearInterval(id);
                main.style.opacity = "20%";
                reglog.style.opacity = "100%"
                clearInterval(id);
                short.style.opacity = "20%";
            } else {
                op = op + 1;
                reglog.style.opacity = op + "%";
                if (op <= 80) {
                    main.style.opacity = (100-op) + "%";
                    short.style.opacity = (100-op) + "%";
                }
            }
        }
    }
}
function reglognone() {
    const reglog = document.getElementById("reglog");
    const short = document.getElementById("short");
    const main = document.getElementById("main");
    let op = 100;
    let id = null;
    clearInterval(id);
    id = setInterval(frame, 10);
    function frame() {
        if (op <= 1) {
            clearInterval(id);
            main.style.opacity = "100%";
            reglog.style.opacity = "0%"
            reglog.style.display = "none"
            document.getElementById("reg").style.display = "none";
            document.getElementById("log").style.display = "none";
            document.getElementById("rst").style.display = "none";
            document.getElementById("breg").style.backgroundColor = "#6c47d1";
            document.getElementById("blog").style.backgroundColor = "#6c47d1";
            document.getElementById("brst").style.backgroundColor = "#6c47d1";
            clearInterval(id);
            short.style.opacity = "100%";
        } else {
            op = op - 1;
            reglog.style.opacity = op + "%";
            if (op <= 80) {
                main.style.opacity = (100-op) + "%";
                short.style.opacity = (100-op) + "%";
            }
        }
    }
}
function log() {
    document.getElementById("header-nolog").style.display = "none";
    document.getElementById("header-logged").style.display = "flex";
    reglognone()
}
function unlog() {
    document.getElementById("header-logged").style.display = "none";
    document.getElementById("header-nolog").style.display = "flex";
}
function skip10(vidid, bool) {
    var Video = document.getElementById(vidid);
    if (bool == 0) {
        Video.currentTime = Video.currentTime - 10;
    } else {
        Video.currentTime = Video.currentTime + 10;
    }
}
function SetVolume(vol, vidid) {
    var Video = document.getElementById(vidid);
    Video.volume = vol / 100;
}
function skipVid(vidid, bool) {
    var Video = document.getElementById(vidid);
    if (bool == 0) {
        if (!Video.paused) {
            playPause(vidid);
        }
        Video.innerHTML='<source src="Assets/vids/alt-J (∆) - Fitzpleasure.mp4" type="video/mp4">';
        Video.load();
    } else {
        if (!Video.paused) {
            playPause(vidid);
        }
        Video.innerHTML='<source src="Assets/vids/alt-J (∆) - Breezeblocks.mp4" type="video/mp4">';
        Video.load();
    }
}
function playPause(vidid) {
    var playsvg = document.getElementById("playsvg");
    var Video = document.getElementById(vidid);
    var Vidtm = document.getElementById("video-controls-time");
    if (Video.paused) {
        Video.play();
        playsvg.innerHTML='<path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>';
        var id = setInterval(refvidtime, 100);
        function refvidtime() {
            Vidtm.innerHTML = Math.abs((Video.currentTime - 30) / 60).toFixed(0) + ":" + Math.abs((Video.currentTime % 60)-0.5).toFixed(0) +
            " " + Math.abs((Video.duration - 30) / 60).toFixed(0) + ":" + Math.abs((Video.duration % 60)-0.5).toFixed(0);
            if (Video.paused) {
                clearInterval(id);
                // Vidtm.innerHTML = Math.abs((Video.duration - 30) / 60).toFixed(0) + ":" + Math.abs((Video.duration % 60)-0.5).toFixed(0);
            }
        }
    } else {
        Video.pause();
        playsvg.innerHTML='<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>';
    }
}