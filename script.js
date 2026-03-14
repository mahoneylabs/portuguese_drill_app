let verbs = []
let currentVerb
let subject

const subjects = ["eu","tu","ele","nos","vos","eles"]

fetch("verbs.json")
.then(response => response.json())
.then(data => verbs = data)

function newVerb(){

 currentVerb = verbs[Math.floor(Math.random()*verbs.length)]

 subject = subjects[Math.floor(Math.random()*subjects.length)]

 document.getElementById("verb").innerText =
   currentVerb.verb + " (" + subject + ")"

 document.getElementById("translation").innerText =
   "Translation: " + currentVerb.translation

 document.getElementById("answer").value = ""

 document.getElementById("result").innerText = ""

}

function checkAnswer(){

 let answer = document.getElementById("answer").value.trim().toLowerCase()

 let correct = currentVerb[subject].toLowerCase()

 if(answer === correct){

   document.getElementById("result").innerText =
   "✅ Correct!"

 } else {

   document.getElementById("result").innerText =
   "❌ Incorrect. Correct answer: " + currentVerb[subject]

 }

}
