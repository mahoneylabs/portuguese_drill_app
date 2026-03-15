let verbs = []
let currentVerb

fetch("verbs.json")
.then(res => res.json())
.then(data => verbs = data)

function newVerb(){

currentVerb = verbs[Math.floor(Math.random()*verbs.length)]

document.getElementById("verb").innerText = currentVerb.verb
document.getElementById("translation").innerText =
"Translation: " + currentVerb.translation

resetInputs()

document.getElementById("eu").focus()

}

function resetInputs(){

let ids=["eu","tu","ele","nos","vos","eles"]

ids.forEach(id=>{
let input=document.getElementById(id)

input.value=""
input.placeholder=""

input.style.background="white"
input.style.borderColor="#ccc"

})

}

function normalize(text){
return text.trim().toLowerCase()
}

function checkAnswer(){

let ids=["eu","tu","ele","nos","vos","eles"]
let score=0

ids.forEach(id=>{

let input=document.getElementById(id)

let userAnswer=normalize(input.value)
let correctAnswer=normalize(currentVerb[id])

if(userAnswer===correctAnswer){

input.style.background="#d7ffd9"
input.style.borderColor="#58cc02"

score++

}else{

input.style.background="#ffd9d9"
input.style.borderColor="#ff4b4b"

input.placeholder=currentVerb[id]

}

})

document.getElementById("result").innerText="Score: "+score+"/6"

}

document.addEventListener("DOMContentLoaded", () => {

let fields=["eu","tu","ele","nos","vos","eles"]

fields.forEach((id,index)=>{

document.getElementById(id).addEventListener("keydown",function(e){

if(e.key==="Enter"){

e.preventDefault()

if(index<fields.length-1){

document.getElementById(fields[index+1]).focus()

}else{

checkAnswer()

}

}

})

})

})
