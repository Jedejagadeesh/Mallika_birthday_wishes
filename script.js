// Elements
const countdownEl = document.getElementById("countdown");
const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const surpriseBtn = document.getElementById("surpriseBtn");
const photos = Array.from(document.querySelectorAll(".photo"));
const finalWish = document.getElementById("finalWish");

// Canvas setup for fireworks/confetti
const canvas = document.getElementById("canvasTop");
const ctx = canvas.getContext("2d");
let w = window.innerWidth, h = window.innerHeight;
canvas.width = w; canvas.height = h;
window.addEventListener("resize", ()=>{w=window.innerWidth; h=window.innerHeight; canvas.width=w; canvas.height=h;});

// Particle class
class Particle{
    constructor(x,y,color){
        this.x=x; this.y=y; this.color=color;
        this.angle=Math.random()*2*Math.PI;
        this.speed=Math.random()*6+2; this.life=100;
    }
    update(){
        this.x+=Math.cos(this.angle)*this.speed;
        this.y+=Math.sin(this.angle)*this.speed+0.3;
        this.speed*=0.95; this.life--;
        this.draw(); return this.life>0;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,3,0,Math.PI*2);
        ctx.fillStyle=this.color; ctx.fill();
    }
}
let particles=[];
function fireworkBlast(count=50){
    const colors=["#00ffff","#ff77ff","#ffd166","#ffffff","#ff6b6b"];
    const x=Math.random()*w, y=Math.random()*h*0.5;
    for(let i=0;i<count;i++){
        particles.push(new Particle(x,y,colors[Math.floor(Math.random()*colors.length)]));
    }
}
function loop(){
    ctx.fillStyle="rgba(0,0,0,0.2)";
    ctx.fillRect(0,0,w,h);
    particles=particles.filter(p=>p.update());
    requestAnimationFrame(loop);
}
loop();

// Countdown
let count = 5;
countdownEl.textContent = count;
const countdownInterval = setInterval(()=>{
    count--;
    countdownEl.textContent = count;
    if(count<=0){
        clearInterval(countdownInterval);
        document.getElementById("countdownWrap").style.display="none";
        startTypingWish();
    }
},1000);

// Typing Wish + subtitle + scale
const text="🎉 Happie BD Kothi 🎉";
let i=0;
function startTypingWish(){
    screen1.style.display="flex";
    function typeEffect(){
        if(i<text.length){
            title.textContent+=text.charAt(i);
            i++;
            title.classList.add("show");
            if(i%2===0) fireworkBlast(15);
            setTimeout(typeEffect,120);
        } else {
            subtitle.textContent="A special surprise for you 💖";
            subtitle.style.opacity=1;
            surpriseBtn.classList.add("show");
        }
    }
    typeEffect();
}

// Surprise Button Click
surpriseBtn.addEventListener("click",()=>{
    screen1.style.display="none";
    screen2.classList.remove("hiddenScreen");
    showImages(0);
});

// Show images one by one
function showImages(index){
    if(index>0 && index<photos.length-1) photos[index-1].classList.remove("show"); // previous disappears except last
    if(index<photos.length){
        photos[index].classList.add("show");
        fireworkBlast(30);
        setTimeout(()=>showImages(index+1),1500); // fast images display
    } else {
        // After last image stays
        finalWish.style.display="block";
        // Final fireworks for 5 sec
        let endBlast = 0;
        const finalInterval = setInterval(()=>{
            fireworkBlast(50);
            endBlast++;
            if(endBlast>15){ // ~5 seconds
                clearInterval(finalInterval);
            }
        },300);
    }
}
function startTypingWish(){
    screen1.style.display="flex";
    function typeEffect(){
        if(i<text.length){
            title.textContent+=text.charAt(i);
            i++;
            title.classList.add("show");
            if(i%2===0) fireworkBlast(15);
            setTimeout(typeEffect,120);
        } else {
            // After typing finished
            subtitle.textContent="A special surprise for you 💖";
            subtitle.style.opacity=1;

            // Show surprise button properly
            surpriseBtn.classList.remove("hidden"); // remove hidden first
            setTimeout(()=>{ surpriseBtn.classList.add("show"); }, 500); // add show class after 0.5s
        }
    }
    typeEffect();
}
