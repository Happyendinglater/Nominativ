const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "_____ Handy funktioniert nicht richtig.",
        choice1: "Mein",
        choice2: 'Mir',
        choice3: 'Mich',
        choice4: 'Ich',
        answer: 1,
    },
    {
        question: "_____arbeite morgen sicher nicht.",
        choice1: "Ich",
        choice2: "Mich",
        choice3: "Mir",
        choice4: "Mein",
        answer: 1,
    },
    {
        question: "_____ hat meine tollen Schuhe an.",
        choice1: "Sich",
        choice2: "Seine",
        choice3: "Sein",
        choice4: "Er",
        answer: 4,
    },
    {
        question: "_____ Tante isst furchtbar gerne Knoblauch.",
        choice1: "Ihrem",
        choice2: "Ihres",
        choice3: "Ihre",
        choice4: "Ihren",
        answer: 3,
    },
    {
        question: "_____ _____ Blume ist eine Rose.",
        choice1: "Dem, roten",
        choice2: "Den, rotes",
        choice3: "Die, rote",
        choice4: "Die, roten",
        answer: 3,
    },
    {
        question: "_____ Hund von David ist sehr groß.",
        choice1: "Den",
        choice2: "Dem",
        choice3: "Der",
        choice4: "Des",
        answer: 3,
    },
    {
        question: "_____ _____ Katze klettert gerne auf den Baum.",
        choice1: "Meinem, schwarze",
        choice2: "Meine, schwarze",
        choice3: "Meine, schwarzen",
        choice4: "Meinem, schwarz",
        answer: 2,  
    },
    {
        question: "_____ Geschwister laufen schnell davon.",
        choice1: "Den",
        choice2: "Die",
        choice3: "Des",
        choice4: "Der",
        answer: 2,
    },
    {
        question: "Morgen wollen _____ zusammen einkaufen gehen.",
        choice1: "unseren",
        choice2: "unser",
        choice3: "wir",
        choice4: "unseres",
        answer: 3,
    },
    {
        question: "_____ Schwester ist sehr nett und freundlich.",
        choice1: "Seine",
        choice2: "Sein",
        choice3: "Seinen",
        choice4: "Seiner",
        answer: 1,
    },
    {
        question: "_____ _____ Hemd passt gut zur grauen Hose.",
        choice1: "Die, blaue",
        choice2: "Der, blauer",
        choice3: "Das, blaues",
        choice4: "Das, blaue",
        answer: 4,
    },
    {
        question: "_____ Hund jagt die Katze des Nachbarn.",
        choice1: "Sein",
        choice2: "Seines",
        choice3: "Seiner",
        choice4: "Seinem",
        answer: 1,
    },
    {
        question: "_____ Knoblauch stinkt in der ganzen Küche.",
        choice1: "Frischer",
        choice2: "Frischem",
        choice3: "Frischen",
        choice4: "Frische",
        answer: 1,
    },
    {
        question: "Dort spielen _____ Kinder mit meiner Katze.",
        choice1: "ihre",
        choice2: "ihres",
        choice3: "ihrer",
        choice4: "ihren",
        answer: 1,
    },
    {
        question: "_____ _____ Kinder sind jeden Tag ",
        choice1: "Des, fröhlicher",
        choice2: "Das, fröhlichen ",
        choice3: "Die, fröhlichen",
        choice4: "Der, fröhlicher",
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 15

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
