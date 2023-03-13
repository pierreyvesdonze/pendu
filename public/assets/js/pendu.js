const wordEl       = document.querySelector('#word');
const wrongLetters = document.querySelector('#wrong-letters');
const replayBtn    = document.querySelector('#play-button');
const popup        = document.querySelector('#popup-container');
const notification = document.querySelector('#notification-container');
const finalMessage = document.querySelector('#final-message');
const figurePart   = document.querySelectorAll('.figure-part');

// Help to start object words as an array
const words = ['poisson', 'pain', 'signature', 'ordinateur', 'concombre', 'armature', 'chat', 'casser', 'jouer', 'pendu', 'sapin'];

// Fetch collection of words from backend
function fetchWords() {
    $.ajax(
        {
            url: Routing.generate('app_pendu_words'),
            method: "GET",
        }).done(function (response) {
            response.forEach(word => {
                words.push(word);
            });
        }).fail(function (jqXHR, textStatus, error) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(error);
        });
}

// Select a word to play
let selectedWord = words[Math.floor(Math.random() * words.length)];

const rightLettersArr = [''];
const wrongLettersArr = [];

// Show hidden word
function showWord() {
    wordEl.innerHTML = `
        ${selectedWord
            .split('')
            .map(
                letter => `
                    <span class="letter">
                        ${rightLettersArr.includes(letter) ? letter : ''}
                    </span>
                `
            )
            .join('')
        }
    `;
    const internalWord = wordEl.innerText.replace(/\n/g, '');

    if (internalWord === selectedWord) {
        finalMessage.innerText = 'Bravo ! Tu as gagné !';
        popup.style.display = 'flex';
    }
};

// Wrong letters
function updateWrongLettersEl() {

    //Show wrong letters
    wrongLetters.innerHTML = `
        ${wrongLettersArr.map(letter => `<span> ${letter}</span>`)}
    `;

    // Show bonhomme
    figurePart.forEach((part, index) => {
        const errors = wrongLettersArr.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    })

    // Check if loose
    if (wrongLettersArr.length === figurePart.length) {
        finalMessage.innerText = "Perdu ! :'( ! Le mot était "+selectedWord
        popup.style.display = 'flex';
    }
}

// Show notification
function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show')
    }, 2000);
}

// Desktop event listener
window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!rightLettersArr.includes(letter)) {
                rightLettersArr.push(letter);

                showWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLettersArr.includes(letter)) {
                wrongLettersArr.push(letter)

                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
})

// Mobile event listener
let virtualKeyboard = document.querySelectorAll('.virtual-key');

for(let i=0; i<virtualKeyboard.length; i++) {
    virtualKeyboard[i].addEventListener('click', (e) => {
        const letter = e.target.innerText.toLowerCase();

        if (selectedWord.includes(letter)) {
            if (!rightLettersArr.includes(letter)) {
                rightLettersArr.push(letter);

                showWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLettersArr.includes(letter)) {
                wrongLettersArr.push(letter)

                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    })
}

// Restart new game
replayBtn.addEventListener('click', () => {
    rightLettersArr.splice(0);
    wrongLettersArr.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)]

    showWord();
    updateWrongLettersEl();

    popup.style.display = 'none';
})

fetchWords();
showWord();
