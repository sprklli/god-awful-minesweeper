console.log("Nothing was logging for the majority of this project and it was a pain");

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

var grid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

flagscounttimer = document.getElementById("timer1");
secondscounttimer = document.getElementById("timer2");

//stuff for reset
var playinggame = "";
alreadychose = [];
flagged = [];
totalbombs = 10;
bombscount = 0;
flagscount = 10;
i = 1;

//bruh I had to do this project with no console
//like the conosle stopped working
//basically think of python project with no print()

boxes = document.getElementById("boxesarea2");

function makegrid(gridset) {

  boxes.innerHTML = "";
  
  for (var sublist of gridset) {
    
    for (var subchar of sublist) {
      if (subchar == 0) {
        boxes.innerHTML += "<button id='button"+i+"' onclick='abuttonclicked("+i+", grid)' oncontextmenu='rightcl("+i+")'><img src='assets/nothing.png' onmousedown='shocked()' onmouseup='happy()'></button>";

        i += 1;
      } else {
        boxes.innerHTML += "<button id='button"+i+"' onclick='abuttonclicked("+i+", grid)' oncontextmenu='rightcl("+i+")'><img src='assets/mine.png' onmousedown='shocked()' onmouseup='happy()'></button>";

        i += 1;
      }
    }
  
    boxes.innerHTML += "<br>";
  }

  playinggame = "y";
};

function shocked() {
  document.getElementById("smile").innerHTML = "<img src = 'assets/shocked-face.png'>";
};

function happy() {
  document.getElementById("smile").innerHTML = "<img src = 'assets/smiley-face.png'>";
};

function abuttonclicked(buttonid, gridset) {

  if (playinggame == "y" && flagged.includes(buttonid) == false) {
    playinggame = "n";
    
    button = "button"+buttonid;
    //console.log(button)
    b = document.getElementById(button);
    b.style.backgroundColor = "red";
    b.classList.add("hasclicked");
    b.innerHTML = "<img src='assets/mine.png'>";
  
    blocks = 0;
    
    for (var sublist of gridset) {
      for (var subchar of sublist) {
        blocks += 1;
      }
    };
  
    for (let j = 1; j < blocks; j++) {
      if (flagged.includes(j)) {
        b = document.getElementById("button"+j);
        b.classList.add("hasclicked");
        b.innerHTML = "<img src='assets/not-mine.png'>";
        
      }
    };
  
  
    for (let j = 1; j < totalbombs; j++) { //basically, generate 10 random digits (no repeats or on_top_of_flags and change each one
      randintid = Math.floor(Math.random() * (blocks - 1) + 1);
      
      diditwork = checkspace(randintid);
      while (diditwork == "nope") {
        randintid = Math.floor(Math.random() * (blocks - 1) + 1);
        diditwork = checkspace(randintid);
      }
      
    };

    secondscounttimer.innerHTML = "001";
    document.getElementById("smile").innerHTML = "<img src='assets/dead-face.png'>";

  }
};

function rightcl(buttonid) {
  if (playinggame == "y") {
    if (flagscount > 0) {
      button = "button"+buttonid
      //console.log(button)
      b = document.getElementById(button);
      
      if (flagged.includes(buttonid)) {
        b.innerHTML = "<img src='assets/nothing.png'>";
        const index = flagged.indexOf(buttonid);
        if (index > -1) {
          flagged.splice(index, 1); // 2nd parameter means remove one item only
        };

        flagscount += 1;
        
      } else {
        //there was nothing
        b.innerHTML = "<img src='assets/flag.png'>";
        flagged.push(buttonid);
        
        flagscount -= 1
        
      };
      
      z = ""
        
      for (let i = 0; i < (3 - (Math.floor(flagscount/10) + 1)); i++) {
        z += "0"
      };
        
      flagscounttimer.innerHTML = z + flagscount;
    }
  }
};

function checkspace(randintid) {
  if (flagged.includes(randintid) == false && alreadychose.includes(randintid) == false) {
    b = document.getElementById("button"+randintid);
    b.classList.add("hasclicked");
    b.innerHTML = "<img src='assets/mine.png'>";

    alreadychose.push(randintid);
    return "all done";
    
  } else {
    return "nope";
  }
};

function reset() {
  boxes.innerHTML = "";
  playinggame = "";
  alreadychose = [];
  flagged = [];
  totalbombs = 10;
  bombscount = 0;
  flagscount = 10;
  i = 1;
  makegrid(grid);
  document.getElementById("smile").innerHTML = "<img src='assets/smiley-face.png'>";
  document.getElementById("timer1").innerHTML = "010";
  document.getElementById("timer2").innerHTML = "000";
};

function rr() {
  r = document.getElementById("rollarea");
  r.style.display = "block";
};

function bye() {
  g = document.getElementById("gridarea");
  g.style.display = "none";
};

//this part doesn't work bc idk
function rollbye() {
  r = document.getElementById("rollarea");
  r.style.display = "none";
  $('.youtube-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
}

makegrid(grid);

dragElement(document.getElementById("gridarea"))
dragElement(document.getElementById("rollarea"))

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id)) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
