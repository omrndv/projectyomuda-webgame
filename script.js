const questionContainer = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const questionNumbersContainer = document.getElementById('question-numbers');
const timerDisplay = document.getElementById('timer');
const currentQuestionDisplay = document.getElementById('current-question');

const questions = [
    {
        question: 'Apa ibu kota Indonesia?',
        answers: [
            { text: 'Jakarta', correct: true },
            { text: 'Surabaya', correct: false },
            { text: 'Bandung', correct: false },
            { text: 'Medan', correct: false }
        ]
    },
    {
        question: 'Siapa presiden pertama Indonesia?',
        answers: [
            { text: 'Joko Widodo', correct: false },
            { text: 'Susilo Bambang Yudhoyono', correct: false },
            { text: 'B.J. Habibie', correct: false },
            { text: 'Soekarno', correct: true }
        ]
    },
    {
        question: 'Apa nama gunung tertinggi di Indonesia?',
        answers: [
            { text: 'Gunung Merapi', correct: false },
            { text: 'Gunung Bromo', correct: false },
            { text: 'Gunung Rinjani', correct: false },
            { text: 'Gunung Jaya Wijaya', correct: true }
        ]
    },
    {
        question: 'Apa nama laut yang terletak di sebelah utara Indonesia?',
        answers: [
            { text: 'Laut Jawa', correct: false },
            { text: 'Laut Arafura', correct: false },
            { text: 'Laut Maluku', correct: false },
            { text: 'Laut China Selatan', correct: true }
        ]
    },
    {
        question: 'Siapa penulis novel “Laskar Pelangi”?',
        answers: [
            { text: 'Andrea Hirata', correct: true },
            { text: 'Pramoedya Ananta Toer', correct: false },
            { text: 'Ayah', correct: false },
            { text: 'Seno Gumira Ajidarma', correct: false }
        ]
    },
    {
        question: 'Apa nama ibu kota provinsi Bali?',
        answers: [
            { text: 'Denpasar', correct: true },
            { text: 'Singaraja', correct: false },
            { text: 'Ubud', correct: false },
            { text: 'Kuta', correct: false }
        ]
    },
    {
        question: 'Siapa penemu lampu pijar?',
        answers: [
            { text: 'Nikola Tesla', correct: false },
            { text: 'Alexander Graham Bell', correct: false },
            { text: 'Thomas Edison', correct: true },
            { text: 'Michael Faraday', correct: false }
        ]
    },
    {
        question: 'Apa nama bandara utama di Jakarta?',
        answers: [
            { text: 'Bandara Internasional Soekarno-Hatta', correct: true },
            { text: 'Bandara Internasional Ngurah Rai', correct: false },
            { text: 'Bandara Internasional Juanda', correct: false },
            { text: 'Bandara Internasional Kualanamu', correct: false }
        ]
    },
    {
        question: 'Apa simbol kimia dari air?',
        answers: [
            { text: 'H2O', correct: true },
            { text: 'CO2', correct: false },
            { text: 'NaCl', correct: false },
            { text: 'O2', correct: false }
        ]
    },
    {
        question: 'Apa nama planet keempat dari Matahari?',
        answers: [
            { text: 'Venus', correct: false },
            { text: 'Mars', correct: true },
            { text: 'Jupiter', correct: false },
            { text: 'Saturnus', correct: false }
        ]
    }
    // Tambahkan lebih banyak soal jika diperlukan
];

let currentQuestionIndex = 0;
let answeredQuestions = new Set();
let correctAnswersCount = 0;
let timer;

function startGame() {
    currentQuestionIndex = 0;
    answeredQuestions.clear();
    correctAnswersCount = 0;
    nextButton.classList.add('hide');
    showQuestion(questions[currentQuestionIndex]);
    generateQuestionNumbers();
    startTimer();
}

function showQuestion(question) {
    currentQuestionDisplay.innerText = `Soal ${currentQuestionIndex + 1}`;
    questionContainer.innerText = question.question;
    answerButtons.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(answer) {
    const correct = answer.correct;
    if (correct) {
        Swal.fire({
            title: 'Benar!',
            icon: 'success',
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false
        });
        correctAnswersCount++;
    } else {
        Swal.fire({
            title: 'Salah!',
            icon: 'error',
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false
        });
    }

    // Mark question as answered
    answeredQuestions.add(currentQuestionIndex);

    // Update question numbers
    updateQuestionNumbers();

    // Wait for alert to finish, then go to the next question
    setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        nextButton.classList.add('hide');
    } else {
        clearInterval(timer);
        const totalQuestions = questions.length;
        const incorrectAnswersCount = totalQuestions - correctAnswersCount;
        Swal.fire({
            title: 'Kuis Selesai!',
            icon: 'info',
            text: `Anda telah menyelesaikan kuis. Jawaban Benar: ${correctAnswersCount}, Jawaban Salah: ${incorrectAnswersCount}.`,
            confirmButtonText: 'Oke'
        });
        nextButton.classList.add('hide');
    }
}

function generateQuestionNumbers() {
    questionNumbersContainer.innerHTML = '';
    questions.forEach((_, index) => {
        const button = document.createElement('button');
        button.innerText = index + 1;
        button.classList.add('btn');
        button.classList.add('inactive');
        button.addEventListener('click', () => {
            if (index === currentQuestionIndex) return;
            currentQuestionIndex = index;
            showQuestion(questions[currentQuestionIndex]);
            nextButton.classList.add('hide');
        });
        questionNumbersContainer.appendChild(button);
    });
}

function updateQuestionNumbers() {
    const buttons = questionNumbersContainer.querySelectorAll('button');
    buttons.forEach((button, index) => {
        if (answeredQuestions.has(index)) {
            button.classList.remove('inactive');
            button.classList.add('active');
            // Set color based on correctness
            const isCorrect = questions[index].answers.find(answer => answer.correct && answer.selected) !== undefined;
            button.classList.toggle('correct', isCorrect);
            button.classList.toggle('incorrect', !isCorrect);
        } else {
            button.classList.remove('active', 'correct', 'incorrect');
            button.classList.add('inactive');
        }
    });
}

function startTimer() {
    const duration = 10 * 60; // 10 minutes in seconds
    let timeRemaining = duration;

    timer = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerDisplay.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timeRemaining--;

        if (timeRemaining < 0) {
            clearInterval(timer);
            Swal.fire({
                title: 'Waktu Habis!',
                icon: 'info',
                text: 'Waktu pengerjaan telah habis.',
                confirmButtonText: 'Oke'
            });
            nextButton.classList.add('hide');
        }
    }, 1000);
}

startGame();