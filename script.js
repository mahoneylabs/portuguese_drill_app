let verbs = []
let currentVerb

fetch("verbs.json")
.then(response => response.json())
.then(data => verbs = data)

function newVerb(){

currentVerb = verbs[Math.floor(Math.random()*verbs.length)]

document.getElementById("verb").innerText = currentVerb.verb
document.getElementById("translation").innerText =
"Translation: " + currentVerb.translation

clearInputs()
clearColors()

document.getElementById("result").innerText=""

document.getElementById("eu").focus()

}

function clearInputs(){

let ids=["eu","tu","ele","nos","vos","eles"]

ids.forEach(id=>{
let input=document.getElementById(id)
input.value=""
input.placeholder=""
})

}

function clearColors(){

let ids=["eu","tu","ele","nos","vos","eles"]

ids.forEach(id=>{
let input=document.getElementById(id)
input.classList.remove("correct")
input.classList.remove("incorrect")
})

}

function normalize(text){
return text.trim().toLowerCase()
}

function checkAnswer(){

let score=0

let ids=["eu","tu","ele","nos","vos","eles"]

ids.forEach(id=>{

let input=document.getElementById(id)
let userAnswer=normalize(input.value)
let correctAnswer=normalize(currentVerb[id])

if(userAnswer===correctAnswer){

input.classList.add("correct")
input.classList.remove("incorrect")
score++

}else{

input.classList.add("incorrect")
input.classList.remove("correct")

input.placeholder=currentVerb[id]

}

})

document.getElementById("result").innerText="Score: "+score+"/6"

}

document.addEventListener("DOMContentLoaded", function(){

let inputs=["eu","tu","ele","nos","vos","eles"]

inputs.forEach((id,index)=>{

document.getElementById(id).addEventListener("keydown",function(e){

if(e.key==="Enter"){

e.preventDefault()

if(index<inputs.length-1){

document.getElementById(inputs[index+1]).focus()

}else{

checkAnswer()

}

}

})

})

})
