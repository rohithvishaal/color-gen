import { generateHexCode, getRGBFromHex, getHSLFromHex, getCMYKFromHex } from "./colorConverters.js"

function getModeNodes(){
    return document.querySelectorAll('.nav-items li')
}

function getColorValue(mode){
    if(mode === 'HEX'){
        return currentHexCode
    }
    else if(mode === 'RGB'){
        return getRGBFromHex(currentHexCode).text
    }
    else if(mode === 'HSL'){
        return getHSLFromHex(currentHexCode).text
    }
    else if(mode === 'CYMK'){
        return getCMYKFromHex(currentHexCode).text
    }
    else if(mode === 'RANDOM'){
        const randIndex = Math.floor(Math.random()*availableModes.length-1)+1
        return getColorValue(availableModes[randIndex])
    }
}

function updateUI(colorValue){
    let bgText = document.querySelector('.color-container h1')
    const text = `${colorValue}`
    bgText.innerText = text
}

function setActiveNode(node){
    node.classList.add("active")
}

function handleMode(mode){
    const allNodes = getModeNodes()
    allNodes.forEach((node)=>{
        if (node.innerText !== mode.innerText){
            node.classList.remove("active")
        }
    })
    setActiveNode(mode)
    currentMode = mode.innerText
    updateUI(getColorValue(currentMode))
}

function clickMeHandler(){
    currentHexCode = generateHexCode()
    const bgColor = document.querySelector('.color-container')
    bgColor.style.backgroundColor = currentHexCode
    updateUI(getColorValue(currentMode))
}

const modes = getModeNodes()
let availableModes = []

modes.forEach((mode)=>{
    mode.addEventListener('click', ()=>{handleMode(mode)})
    availableModes.push(mode.innerText)
})

const randIndex = Math.floor(Math.random()*availableModes.length)
let currentMode = availableModes[randIndex]
let currentHexCode = '#FFFFFF'
updateUI(getColorValue(currentMode))
const changeColorButton = document.getElementById('click-me')
changeColorButton.addEventListener('click', clickMeHandler)




