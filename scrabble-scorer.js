// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";

  for (let i = 0; i < word.length; i++) {

    for (const pointValue in oldPointStructure) {

      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`
      }

    }
  }
  return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //



function initialPrompt() {
  word = input.question("Let's play some scrabble! Enter a word: ")
  return word
};


let simpleScore = function(word) {
  let i = 0
  let score = 0
  while (i < word.length) {
    score = score + 1
    i++
  }
  return score
};

let vowelBonusScore = function(word) {
  let i = 0
  let score = 0
  word = word.toLowerCase()
  while (i < word.length) {
    if (word[i] === 'a' || word[i] === 'e' || word[i] === 'i' || word[i] === 'o' || word[i] === 'u') {
      score = score + 3
      i++
    } else {
      score = score + 1
      i++
    }
  }
  return score
}

let scrabbleScore = function(word) {
  word = word.toLowerCase()
  let i = 0
  let score = 0
  while (i < word.length){
    score = score + Number(newPointStructure[word[i]])
    i++
  }
  return score
};

const scoringAlgorithms = [
  {
    name: "Simple",
    description: "Each letter is worth 1 point.",
    scoringFunction: simpleScore,
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonats are 1 pt.",
    scoringFunction: vowelBonusScore,
  },
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scoringFunction: scrabbleScore,
  },
];

function scorerPrompt() {
  word = initialPrompt()
  num = input.question(`What scoring system would you like to use?\n\n0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}\n1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}\n2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}\n\nEnter 0, 1, or 2:`)

  if (num < 0 || num > 2) {
    console.log("Invalid response")
    scorerPrompt()
  } else {
    console.log(`Score for ${word}: ${scoringAlgorithms[num].scoringFunction(word)}`)
  }

}

function transform(obj) {
  let newObj = {}
  for (const key in obj) {
    let array = obj[key]
    array = array.join("")
    let word = array.toLowerCase()

    let i = 0
    while (i < word.length) {
      newObj[word[i]] = key
      i++
    }
  }
  return newObj
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  scorerPrompt()


}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScore: simpleScore,
  vowelBonusScore: vowelBonusScore,
  scrabbleScore: scrabbleScore,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt
};

