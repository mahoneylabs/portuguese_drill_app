let verbs=[]
let currentVerb

fetch("verbs.json")
.then(res=>res.json())
.then(data=>verbs=data)

function newVerb(){

currentVerb=verbs[Math.floor(Math.random()*verbs.length)]

document.getElementById("verb").innerText=currentVerb.verb
document.getElementById("translation").innerText="Translation: "+currentVerb.translation

resetInputs()

document.getElementById("eu").focus()

}

function resetInputs(){

let ids=["eu","tu","ele","nos","vos","eles"]

ids.forEach(id=>{

let input=document.getElementById(id)

input.value=""
input.classList.remove("correct")
input.classList.remove("incorrect")

document.getElementById(id+"-icon").innerText=""
document.getElementById(id+"-correct").innerText=""

})

document.getElementById("result").innerText=""

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

input.classList.add("correct")

document.getElementById(id+"-icon").innerText="✔"

score++

}else{

input.classList.add("incorrect")

document.getElementById(id+"-icon").innerText="✖"

document.getElementById(id+"-correct").innerText="Correct: "+currentVerb[id]

}

})

document.getElementById("result").innerText=
"You got "+score+" out of 6 correct"

}

document.addEventListener("DOMContentLoaded",()=>{

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
