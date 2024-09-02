const questionContainer = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const questionNumbersContainer = document.getElementById('question-numbers');
const timerDisplay = document.getElementById('timer');
const timerBar = document.getElementById('timer-bar'); // Tambahkan elemen untuk bar timer
const currentQuestionDisplay = document.getElementById('current-question');

const questions = [
    {
        question: 'Apa nama bangunan di bawah ini?',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Burj_Khalifa_2021.jpg/1200px-Burj_Khalifa_2021.jpg',
        answers: [
            { text: 'Burj Khalifa', correct: true },
            { text: 'Eiffel Tower', correct: false },
            { text: 'Statue of Liberty', correct: false },
            { text: 'Sydney Opera House', correct: false }
        ]
    },
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
    // Tambahkan lebih banyak soal jika diperlukan
];

let currentQuestionIndex = 0;
let currentScore = 0;
let answeredQuestions = new Set();
let correctAnswersCount = 0;
let timer;
let timePerQuestion = 10; // Waktu per soal dalam detik (1 menit)

function startGame() {
    Swal.fire({
        title: 'Mulai Kuis',
        text: "Apakah Anda siap untuk memulai kuis?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Mulai',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            currentQuestionIndex = 0;
            answeredQuestions.clear();
            correctAnswersCount = 0;
            nextButton.classList.add('hide');
            showQuestion(questions[currentQuestionIndex]);
            generateQuestionNumbers();
            startTimer();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            window.location.href = 'beranda.html';  // Arahkan ke halaman beranda
        }
    });
}

function showQuestion(question) {
    currentQuestionDisplay.innerText = `Soal ${currentQuestionIndex + 1}`;
    questionContainer.innerHTML = ''; // Clear previous content

    const questionText = document.createElement('div');
    questionText.innerText = question.question;
    questionContainer.appendChild(questionText);

    // Check if question has an image
    if (question.image) {
        const img = document.createElement('img');
        img.src = question.image;
        img.alt = 'Soal Gambar';
        questionContainer.appendChild(img);
    }

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
    clearInterval(timer); // Hentikan timer saat jawaban dipilih
    const correct = answer.correct;
    let points = 0;
    let message = '';

    if (correct) {
        points = 2000;
        message = `Jawaban Benar! +${points} Poin`;
        Swal.fire({
            title: 'Benar!',
            icon: 'success',
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false
        });
        correctAnswersCount++;
    } else {
        points = -100;
        message = `Jawaban Salah! ${points} Poin`;
        Swal.fire({
            title: 'Salah!',
            icon: 'error',
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false
        });
    }

    currentScore += points; // Update the current score
    document.getElementById('current-score').innerText = `${currentScore} Poin 🔥`;

    answeredQuestions.add(currentQuestionIndex);
    questions[currentQuestionIndex].answers.forEach(ans => ans.selected = ans === answer);
    updateQuestionNumbers();
    showNotification(message, correct ? 'success' : 'error');
    setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        nextButton.classList.add('hide');
        startTimer();
    } else {
        showResult();
    }
}

function showResult() {
    let unansweredCount = 0;
    let incorrectAnswersCount = 0;

    // Hitung jumlah soal yang tidak terjawab dan yang salah
    questions.forEach((question, index) => {
        if (!answeredQuestions.has(index)) {
            unansweredCount++;
        } else {
            const isIncorrect = question.answers.some(answer => !answer.correct && answer.selected);
            if (isIncorrect) {
                incorrectAnswersCount++;
            }
        }
    });

    // Hitung jumlah soal yang benar
    const correctAnswersCount = questions.length - unansweredCount - incorrectAnswersCount;

    // Tampilkan hasil akhir
    let resultHTML = `<h2>Quiz Selesai!</h2>
        <h3>Rincian Hasil:</h3>
        <p>Jawaban Terjawab: ${correctAnswersCount}</p>
        <p>Jawaban Salah: ${incorrectAnswersCount}</p>
        <p>Jawaban Tidak Terjawab: ${unansweredCount}</p>`;

    resultHTML += '<button class="btn" onclick="startGame()">Mulai Lagi</button>';
    questionContainer.innerHTML = resultHTML;
    answerButtons.innerHTML = ''; // Hilangkan pilihan jawaban
    nextButton.classList.add('hide');
    stopTimer();

    // Sembunyikan elemen yang menampilkan nomor soal saat quiz selesai
    currentQuestionDisplay.innerText = '';
}

function generateQuestionNumbers() {
    questionNumbersContainer.innerHTML = '';
    questions.forEach((_, index) => {
        const button = document.createElement('button');
        button.innerText = index + 1;
        button.classList.add('btn');
        button.classList.add('inactive');
        questionNumbersContainer.appendChild(button);
    });
}

function updateQuestionNumbers() {
    const buttons = questionNumbersContainer.querySelectorAll('button');
    buttons.forEach((button, index) => {
        if (answeredQuestions.has(index)) {
            button.classList.remove('inactive');
            button.classList.add('active');
            const question = questions[index];
            const isCorrect = question.answers.some(answer => answer.correct && answer.selected);
            const isIncorrect = question.answers.some(answer => !answer.correct && answer.selected);
            button.classList.toggle('correct', isCorrect);
            button.classList.toggle('incorrect', isIncorrect);
        } else {
            button.classList.remove('active', 'correct', 'incorrect');
            button.classList.add('inactive');
        }
    });
}

function startTimer() {
    let time = timePerQuestion; // Waktu untuk soal saat ini

    timerBar.style.width = '100%'; // Mulai dari penuh
    timerDisplay.innerText = `0:${time < 10 ? '0' : ''}${time}`; // Tampilkan waktu awal

    timer = setInterval(() => {
        time--;
        timerDisplay.innerText = `0:${time < 10 ? '0' : ''}${time}`;

        const percentage = (time / timePerQuestion) * 100;
        timerBar.style.width = `${percentage}%`; // Perbarui lebar bar

        if (time <= 0) {
            clearInterval(timer);
            Swal.fire({
                title: 'Waktu Habis!',
                icon: 'error',
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false
            });
            nextQuestion();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

const notification = document.getElementById('notification');

function showNotification(message, type) {
    notification.innerText = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000); // Tampilkan notifikasi selama 2 detik
}

startGame();
