const questionContainer = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const questionNumbersContainer = document.getElementById('question-numbers');
const timerDisplay = document.getElementById('timer');
const timerBar = document.getElementById('timer-bar'); // Tambahkan elemen untuk bar timer
const currentQuestionDisplay = document.getElementById('current-question');

const questions = [
    {
        question: 'Siapakah dia?',
        image: 'https://cdn.britannica.com/19/180119-138-29F20103/Overview-invention-telephone-focus-work-Alexander-Graham.jpg?w=800&h=450&c=crop',
        answers: [
            { text: 'Thomas Shelby', correct: false },
            { text: 'Alexander Graham Bell', correct: true },
            { text: 'Nikola Tesla', correct: false },
            { text: 'Albert Einstein', correct: false }
        ]
    },
    {
        question: 'Siapa nama tokoh dibawah ini?',
        image: 'https://img.okezone.com/content/2023/10/13/337/2900388/kisah-jenderal-ahmad-yani-pernah-perintahkan-anak-buahnya-menangkap-jenderal-ah-nasution-1kweSVETmr.jpg',
        answers: [
            { text: 'Pierre Tendean', correct: false },
            { text: 'Suprapto', correct: false },
            { text: 'Jenderal Ahmad Yani', correct: true },
            { text: 'AH Nasution', correct: false }
        ]
    },
    {
        question: 'Tokoh ini terkenal karena kejatuhan apel',
        image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTxQA1CrbHpxnHxxvaDoB9r1vOt5dZ2pECMGw-iRa1jbnk3yYkl-NZExB8i2b86tHAYkUxWwP_i-b4hpJbiMy1qucbR3pTfg9550VBF4Cs',
        answers: [
            { text: 'Isaac Newton', correct: true },
            { text: 'Thomas Alfa Edison', correct: false },
            { text: 'Rudolf Diesel', correct: false },
            { text: 'George', correct: false }
        ]
    },
    {
        question: 'Tokoh ini terkenal karena lukisan perempuan',
        image: 'https://asset-a.grid.id/crop/0x0:0x0/x/photo/2023/07/23/whatsapp-image-2023-07-23-at-00-20230723120339.jpeg',
        answers: [
            { text: 'Burj Khalifa', correct: false },
            { text: 'Pablo Picasso', correct: false },
            { text: 'Leonardo da Vinci', correct: true },
            { text: 'Raden Saleh', correct: false }
        ]
    },
    {
        question: 'Film ini mengisahkan pencurian lukisan penentangan pada zaman Belanda',
        image: 'https://media.suara.com/pictures/653x366/2022/05/31/51863-mencuri-raden-saleh.jpg',
        answers: [
            { text: 'Dua Garis Biru', correct: false },
            { text: 'Budi Pekerti', correct: false },
            { text: 'Kuyang', correct: false },
            { text: 'Mencuri Raden Saleh', correct: true }
        ]
    },
    {
        question: 'Alat ini sering digunakan oleh dokter',
        image: 'https://sehatnegeriku.kemkes.go.id/wp-content/uploads/2024/06/stethoscope-isolated-white-surface-scaled.jpg',
        answers: [
            { text: 'Tensimeter', correct: false },
            { text: 'Stetoskop', correct: true },
            { text: 'Nebulizer', correct: false },
            { text: 'Pulse Oximeter', correct: false }
        ]
    },
    {
        question: 'Metode ini memperbanyak tanaman dengan vegetatif',
        image: 'https://akcdn.detik.net.id/visual/2023/05/03/mencangkok-tanaman_169.jpeg?w=400&q=90',
        answers: [
            { text: 'Mencangkok', correct: true },
            { text: 'Setek', correct: false },
            { text: 'Rundukan', correct: false },
            { text: 'Budding', correct: false }
        ]
    },
    {
        question: 'Dia merupakan seorang panglima perang',
        image: 'https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/p1/294/2023/11/24/Patih-Gajah-Mada-1156297685.jpg',
        answers: [
            { text: 'Anoman', correct: false },
            { text: 'Pangeran Diponegoro', correct: false },
            { text: 'Gajah Mada', correct: true },
            { text: 'Yudistira', correct: false }
        ]
    },
    {
        question: 'Salah satu presiden Indonesia',
        image: 'https://www.suaramuhammadiyah.id/storage/posts/image/Dari_BJ_Habibie_Hingga_FX_Silaban.jpeg',
        answers: [
            { text: 'Megawati Soekarno Putri', correct: false },
            { text: 'BJ Habibie', correct: true },
            { text: 'Joko Widodo', correct: false },
            { text: 'Gusdur', correct: false }
        ]
    },
    {
        question: 'Keluarga Toyota',
        image: 'https://astradigitaldigiroomprd.blob.core.windows.net/storage-prd-001/20240419T063210701Zreview%20mesin%20toyota%20yaris%20cross%20hybrid.webp',
        answers: [
            { text: 'Fortuner', correct: false },
            { text: 'Veloz', correct: false },
            { text: 'Kijang Innova', correct: false },
            { text: 'Yaris Cross Hybrid', correct: true }
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
        title: 'Mulai Tebak Gambar',
        text: "Apakah Anda siap untuk memulai tebak gambar?",
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
    currentQuestionDisplay.innerText = `Nomor ${currentQuestionIndex + 1}`;
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
    let resultHTML = `<h2>Tebak Gambar Selesai!</h2>
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