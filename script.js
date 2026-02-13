const introSection = document.getElementById("introSection");
const quizSection = document.getElementById("quizSection");
const passwordSection = document.getElementById("passwordSection");
const gallerySection = document.getElementById("gallerySection");
const finalSection = document.getElementById("finalSection");

const questions = [
    { question: "Where did we first meet?", answers: ["College","Instagram","Mutual friend","Cafe"], correct: 1 },
    { question: "What is my favorite color?", answers: ["Pink","Blue","Black","White"], correct: 1 },
    { question: "Who said I love you first?", answers: ["You","Me","Both","No one"], correct: 1 },
    { question: "What nickname do I call you?", answers: ["Baby", "Hero", "Love", "Cutie"], correct: 0 },
    { question: "What makes me happiest?", answers: ["Your smile", "Shopping", "Sleep", "Food"], correct: 3 }
];

let current = 0;
let score = 0;

function switchSection(hide, show) {
    hide.classList.remove("active");

    setTimeout(() => {
        show.classList.add("active");
    }, 600);
}



// INTRO BUTTON
document.getElementById("startBtn").onclick = () => {
    switchSection(introSection, quizSection);
    setTimeout(() => {
        loadQuestion();   // THIS loads the first question
    }, 500);
};


// LOAD QUESTION
function loadQuestion() {
    document.getElementById("question").innerText = questions[current].question;
    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    questions[current].answers.forEach((ans, index) => {
        const btn = document.createElement("button");
        btn.innerText = ans;
        btn.onclick = () => checkAnswer(index);
        answersDiv.appendChild(btn);
    });
}

function checkAnswer(index) {
    if(index === questions[current].correct) {
        score++;
        document.getElementById("score").innerText = score;
        document.getElementById("reward").innerText = "💖💋😘";
        setTimeout(() => document.getElementById("reward").innerText = "", 1000);
    }
}

document.getElementById("nextBtn").onclick = () => {
    current++;
    if(current < questions.length) {
        loadQuestion();
    } else {
        switchSection(quizSection, passwordSection);
    }
};

// PASSWORD
document.getElementById("unlockBtn").onclick = () => {
    const input = document.getElementById("passwordInput").value;
    if(input === "01012025") { // change to your special date
        switchSection(passwordSection, gallerySection);
    } else {
        document.getElementById("passwordError").innerText = "Wrong date 💔 Try again!";
    }
};

// GALLERY TO FINAL
document.getElementById("continueBtn").onclick = () => {
    switchSection(gallerySection, finalSection);
    startTypewriter();
    confetti({ particleCount: 200, spread: 120 });
};

// POPUP
function openNote(text) {
    const popup = document.getElementById("notePopup");
    popup.classList.add("show");
    document.getElementById("popupText").innerText = text;
}

document.getElementById("closePopup").onclick = () => {
    document.getElementById("notePopup").classList.remove("show");
};



// TYPEWRITER
function startTypewriter() {
    const text = "You are my heart, my happiness, and my forever. Every day with you feels magical. I am so lucky to have you in my life ❤️";
    let i = 0;
    document.getElementById("typewriterText").innerHTML = "";
    function type() {
        if(i < text.length) {
            document.getElementById("typewriterText").innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 40);
        }
    }
    type();
}

// FLOATING HEARTS
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "💖";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (18 + Math.random() * 25) + "px";
    heart.style.animationDuration = (4 + Math.random() * 3) + "s";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
}
setInterval(createParticle, 300);

loadQuestion();

// Change tab title every 3 seconds
setInterval(() => {
    document.title = "❤️ Always Yours ❤️";
}, 3000);


