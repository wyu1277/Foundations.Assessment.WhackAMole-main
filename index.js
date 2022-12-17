const cursor = document.querySelector('.cursor')
const holes = [...document.querySelectorAll('.hole')] // this will turn our object hole into an new array of 9 divs using the spread operator.
const scoreNumber = document.querySelector('.score span') 
const startBtn = document.getElementById('start')
const sound = new Audio('sound/punch.mp3')
let score = 0 // keeps count of lokis hit
let timeUp = false; // we'll be using this to stop our game
// The code below affects the mouse
window.addEventListener('mousemove', e =>{
    //This event listener will make the element follow the cursor by updating its page x and y coordinates to wherever the mouse moves.
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';
} )

window.addEventListener('mousedown', () =>{
    //On mouse click, this event listener will add a class called active to our cursor. Since we have a class called active in our css it will apply that style.
    cursor.classList.add('active');
})
window.addEventListener('mouseup', () =>{
    //When releasing the mouse , this event listener will remove our class active from our cursor which will bring it back to its original position
    cursor.classList.remove('active');
})

// Code below is for running the game

const lokiUp = () => {
    const i = Math.floor(Math.random() * holes.length) // This will get a random random between 0 and 8.
    const hole = holes[i] //This will set hole to equal the index number of array holes so we can get call a specific div hole
    
    // The lines of code below will add the loki img along with their css styling to the div hole.
    const img = document.createElement('img');
    img.classList.add('loki');
    img.src = 'images/loki.png';
   
    img.addEventListener('click', () =>{
        // The lines of code below will increment out score counter by 1 when we click on loki and set the h1 span to the value of our score counter
        score+=10
        sound.play() //plays our audio
        scoreNumber.innerHTML = score
        img.src = 'images/loki-smashed.png'; //This will change our loki image to a different one indicating that you have hit loki.
    }, {once: true}); // added once true so that you cannot spam click loki to get more points

    hole.appendChild(img);
    // The code below sets the time to rerun this function every 800 miliseconds. In this case it will remove our loki image and rerun our startGame function which will place loki in a different hole.
    setTimeout(() => {
        hole.removeChild(img);
        if(!timeUp){lokiUp()};
    }, 1000)

}

const startGame = () =>{
    score = 0 // this will reset our counter to 0
    scoreNumber.innerHTML = 0; // this will set our text for our score to 0
    timeUp = false // this will make it so we can run our game again
    lokiUp();
    setTimeout(() => {timeUp = true}, 20000) // this is the timer for the game to end
    startBtn.disabled = true; // this will disable our button on click
    setTimeout(()=>{ // this will reenable our button after the game is over.
        startBtn.disabled = false;
    }, 20000);
}

startBtn.addEventListener('click', startGame)