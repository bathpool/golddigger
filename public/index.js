

const priceSection = document.getElementById("price-display")
const input = document.getElementById("investment-amount")
const inputBtn = document.getElementById("invest-btn")
const dialogSection = document.getElementById("dialog-section")
const dialogDisplay = document.getElementById("investment-summary")


const res = await fetch('/price')
const data = await res.text()
console.log(data)
priceSection.textContent = data
