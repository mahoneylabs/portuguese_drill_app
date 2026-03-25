let verbs=[]
let currentVerb

// Track wrong answers per verb (for weighting)
let verbStats={}

// Track wrong attempts for current verb
let wrongCounts={
eu:0,tu:0,ele:0,nos:0,vos:0,eles:0
}

fetch("verbs.json")
.then(res=>res.json())
.then(data=>{
verbs=data

// initialize weights
verbs.forEach(v=>{
verbStats[v.verb]=1
})
})

function getWeightedVerb(){

let totalWeight=0

verbs.forEach(v=>{
totalWeight+=verbStats[v.verb]
})

let rand=Math.random()*totalWeight

for(let v of verbs){

rand-=verbStats[v.verb]

if(rand<=0){
return v
}

}

return verbs[0]
}

function newVerb(){

currentVerb=getWeightedVerb()

document.getElementById("verb").innerText=currentVerb.verb
document.getElementById("translation").innerText="Translation: "+currentVerb.translation

resetInputs()
document.getElementById("result").innerText=""

document.getElementById("eu").focus()
}

function resetInputs(){

let ids=["eu","tu","ele","nos","vos","eles"]

ids.forEach(id=>{
let input=document.getElementById(id)

input.value=""
input.classList.remove("correct","incorrect")

document.getElementById(id+"-icon").innerText=""
document.getElementById(id+"-correct").innerText=""

wrongCounts[id]=0
})

}

function normalize(text){
return text.trim().toLowerCase()
}

function checkAnswer(){

let ids=["eu","tu","ele","nos","vos","eles"]
let score=0
let gotWrong=false

ids.forEach(id=>{

let input=document.getElementById(id)

let user=normalize(input.value)
let correct=normalize(currentVerb[id])

if(user===correct){

input.classList.add("correct")
input.classList.remove("incorrect")
document.getElementById(id+"-icon").innerText="✔"

score++

}else{

input.classList.add("incorrect")
input.classList.remove("correct")
document.getElementById(id+"-icon").innerText="✖"

wrongCounts[id]++
gotWrong=true

if(wrongCounts[id]>=3){
document.getElementById(id+"-correct").innerText="Correct: "+currentVerb[id]
}

}

})

// Increase difficulty weight if any wrong
if(gotWrong){
verbStats[currentVerb.verb]+=2
}else{
// slowly normalize
verbStats[currentVerb.verb]=Math.max(1,verbStats[currentVerb.verb]-1)
}

document.getElementById("result").innerText=
"You got "+score+" out of 6 correct"
}

// ENTER KEY SUPPORT (desktop + mobile)
document.addEventListener("DOMContentLoaded",()=>{

let fields=["eu","tu","ele","nos","vos","eles"]

fields.forEach((id,index)=>{

document.getElementById(id).addEventListener("keydown",function(e){

if(e.key==="Enter" || e.key==="Go" || e.key==="Done"){

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
