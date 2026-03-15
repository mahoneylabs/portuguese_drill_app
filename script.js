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

document.getElementById("result").innerText=""

document.getElementById("eu").focus()

}

function clearInputs(){

let ids=["eu","tu","ele","nos","vos","eles"]

ids.forEach(id=>{
document.getElementById(id).value=""
})

}

function normalize(text){
return text.trim().toLowerCase()
}

function checkAnswer(){

let score=0

let answers={
eu:document.getElementById("eu").value,
tu:document.getElementById("tu").value,
ele:document.getElementById("ele").value,
nos:document.getElementById("nos").value,
vos:document.getElementById("vos").value,
eles:document.getElementById("eles").value
}

for(let subject in answers){

if(normalize(answers[subject])===normalize(currentVerb[subject])){
score++
}

}

let resultText="Score: "+score+"/6"

if(score<6){

resultText+=" | Correct answers: "

resultText+=
"eu: "+currentVerb.eu+", "+
"tu: "+currentVerb.tu+", "+
"ele: "+currentVerb.ele+", "+
"nós: "+currentVerb.nos+", "+
"vós: "+currentVerb.vos+", "+
"eles: "+currentVerb.eles

}

document.getElementById("result").innerText=resultText

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
