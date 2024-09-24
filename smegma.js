let kluc;
let kluc2;
let answerarray = [];
let randominex;
let savedData;
let scorenumber = 0;
let spravne = 0;
let zle = 0;
let last_used_url;
let last_used_index;
let xd2;
let dlzkaklucov;
const audio = new Audio();
audio.src = "/clicksound.mp3";
const correctaudio = new Audio();
correctaudio.src = "/correctsound.mp3";
const wrongsound = new Audio();
wrongsound.src = "/wrongsound.mp3";
wrongsound.volume = 0.5;
correctaudio.volume = 0.5;



async function dostat(uniturl, index){
    fetch(uniturl)
    .then(res => res.json())
    .then(data => {savedData = data.preklad[index];
        last_used_url = uniturl;
        last_used_index = index;
        setVarToZero();
        dlzkaklucov = Object.keys(savedData).length;
        generate();
        setScoreToZero();
        refreshscore();
        vymazatPlochu();
        zobrazitHernuPlochu();
    })
    .catch(error =>{
        console.error('Nastal nejaky problem:', error);
        vymazatPlochu();
        zobrazitErrorPlochu();
    }
    )
} 

async function poslat(buttonId){
    let InputButton = document.getElementById(buttonId);
    if(InputButton.textContent == kluc){
        InputButton.style.backgroundColor = '#91EB6D';
        correctaudio.play();
        spravne++;
    }
    else{
        InputButton.style.backgroundColor = '#f08080';
        wrongsound.play();
        zle++;
    }
    scorenumber ++;
    refreshscore();
    await wait(1000);
    InputButton.style.backgroundColor = 'transparent';
    if(scorenumber >= Math.floor(dlzkaklucov * 0.5)){
        endgame();
    }
    else{
        generate();
    }
    
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function vymazatPlochu(){
    document.getElementById('errorplocha').style.display = "none";
    document.getElementById('lekcieplocha').style.display = "none";
    document.getElementById('hernaplocha').style.display = "none";
    document.getElementById('konecplocha').style.display = "none";
    document.getElementById('stlpecplocha').style.display = "none";
}

function zobrazitErrorPlochu(){
    document.getElementById('errorplocha').style.display = "flex";
}

function zobrazitHernuPlochu(){
    document.getElementById('hernaplocha').style.display = "flex";
}

function zobrazitGameOver(){
    document.getElementById('konecplocha').style.display = "flex";
}

function zobrazitLekcie(){
    document.getElementById('lekcieplocha').style.display = "grid";
}

function zobrazitStlpce(){
    document.getElementById('stlpecplocha').style.display = "grid";
}

function muteAudio(){
    document.querySelectorAll('audio, video').forEach(el => el.muted = true);
}

function generate(){
    const keys = Object.keys(savedData);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    let randomKey2;
    do{
        randomKey2 = keys[Math.floor(Math.random() * keys.length)];
    }while(randomKey2 == randomKey);

    answerarray.length = 0;
    document.getElementById('slovo').textContent = randomKey;
    kluc = savedData[randomKey];
    kluc2 = savedData[randomKey2];
    answerarray.push(kluc);
    answerarray.push(kluc2);
    randominex = Math.floor(Math.random() * answerarray.length);
    document.getElementById('button1').textContent = answerarray[randominex];
    answerarray.splice(randominex, 1);
    document.getElementById('button2').textContent = answerarray[0];
    delete savedData[randomKey];
}

function refreshscore(){
    let scorecounter = document.getElementById('scorecounter');
    scorecounter.textContent = scorenumber + '/' + Math.floor(dlzkaklucov * 0.5);
}

function setScoreToZero(){
    scorenumber = 0;
}

function endgame(){
        wait(3000);
        vymazatPlochu();
        zobrazitGameOver();
        displayEndStats();
}

function displayEndStats(){
    document.getElementById('spravnetext').textContent = 'správne:  ' + spravne;
    document.getElementById('zletext').textContent = 'nesprávne:  ' + zle;
}

function exitButton(){
    vymazatPlochu();
    zobrazitLekcie();
}

function setVarToZero(){
    kluc;
    kluc2;
    answerarray = [];
    randominex;
    savedData;
    scorenumber = 0;
    spravne = 0;
    zle = 0;
    dlzkaklucov = 0;
}

function retry(){
    dostat(last_used_url, last_used_index);
}

function dostatLekciu(xd){
    xd2 = xd;
}

