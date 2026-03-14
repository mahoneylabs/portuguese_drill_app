let verbs = []
let currentVerb

fetch("verbs.json")
.then(response => response.json())
.then(data => verbs = data)

function newVerb(){
 currentVerb = verbs[Math.floor(Math.random()*verbs.length)]
 document.getElementById("verb").innerText = currentVerb.infinitive
}

function checkAnswer(){
 let answer = document.getElementById("answer").value

 if(answer === currentVerb.present){
   document.getElementById("result").innerText = "Correct!"
 } else {
   document.getElementById("result").innerText = "Wrong. Answer: " + currentVerb.present
 }
}
