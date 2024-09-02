// Ambil referensi elemen
const video = document.getElementById('gameVideo');
const questionContainer = document.getElementById('questionContainer');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');

// Array pertanyaan dan jawaban dengan pilihan ganda
const questions = [
    { question: 'Makanan apakah ini?', options: ['Sosis bakar', 'Pentol', 'Pizza'], answer: 'Pizza' },
    { question: 'Kartun apakah ini?', options: ['Upin & Ipin', 'Shaun the Sheep', 'Adit Sopo Jarwo'], answer: 'Shaun the Sheep' },
    { question: 'kota apakah ini?', options: ['Bandung', 'Surabaya', 'Jakarta'], answer: 'Jakarta' },
    { question: 'Siapakah dia?', options: ['Donald Trump', 'Joko Widodo', 'Pak Asep'], answer: 'Donald Trump' },
    { question: 'Tempat apakah ini?', options: ['Rita Super Mall', 'Pantai', 'SMA Negeri 4 PWT'], answer: 'Pantai' }
];

let currentQuestionIndex = 0; // Indeks pertanyaan saat ini
const stopTimes = [10, 20, 30, 40, 50]; // Waktu berhenti pada setiap 10 detik

// Fungsi untuk menghentikan video pada waktu tertentu
video.addEventListener('timeupdate', () => {
    if (currentQuestionIndex < stopTimes.length && video.currentTime >= stopTimes[currentQuestionIndex]) {
        video.pause();
        displayQuestion(currentQuestionIndex);
    }
});

// Fungsi untuk menampilkan pertanyaan
function displayQuestion(index) {
    const currentQuestion = questions[index];
    questionText.textContent = `Dari video sebelumnya, ${currentQuestion.question}`;

    // Clear previous options
    optionsContainer.innerHTML = '';

    // Render pilihan ganda
    currentQuestion.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.innerHTML = `
            <input type="radio" id="${option}" name="answer" value="${option}" class="mr-2">
            <label for="${option}">${option}</label>
        `;
        optionsContainer.appendChild(optionElement);
    });

    questionContainer.classList.remove('hidden');
}

// Fungsi untuk memeriksa jawaban
function checkAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');

    if (!selectedOption) {
        Swal.fire({
            icon: 'warning',
            title: 'Pilih jawaban terlebih dahulu!',
            confirmButtonText: 'OK'
        });
        return;
    }

    const userAnswer = selectedOption.value;
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (userAnswer === correctAnswer) {
        if (currentQuestionIndex < questions.length - 1) {
            Swal.fire({
                icon: 'success',
                title: 'Jawaban benar!',
                text: 'Video akan dilanjutkan.',
                confirmButtonText: 'Lanjutkan'
            }).then(() => {
                currentQuestionIndex++;
                questionContainer.classList.add('hidden'); // Sembunyikan pertanyaan
                video.play();
            });
        } else {
            // Semua pertanyaan telah dijawab
            Swal.fire({
                icon: 'success',
                title: 'Selamat!',
                text: 'Anda telah menyelesaikan semua pertanyaan.',
                confirmButtonText: 'Kembali ke Beranda'
            }).then(() => {
                window.location.href = 'beranda.html'; // Arahkan pengguna ke beranda
            });
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Jawaban salah',
            text: 'Coba lagi!',
            confirmButtonText: 'OK'
        });
    }
}
