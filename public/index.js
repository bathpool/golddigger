
const priceSection = document.getElementById("price-display")
const input = document.getElementById("investment-amount")
const inputBtn = document.getElementById("invest-btn")
const dialogSection = document.getElementById("dialog-section")
const dialogDisplay = document.getElementById("investment-summary")
const confirmBtn = document.getElementById("confirm-btn")

getCurrentPrice()

//create EventSource obj
const eventSource = new EventSource('live')

//property as event handler to trigger for every event
eventSource.onmessage = (event) => {
     
    priceSection.textContent = event.data
}


inputBtn.addEventListener("click", async (event) => {
    event.preventDefault()

    if (input.value) {
        const currentTime = new Date()
        const sentData = {
            time: currentTime,
            value: input.value,
        }

        const resInvest = await fetch('/invest', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sentData),
        })
        
        
    }
    
    dialogSection.showModal()
    dialogDisplay.textContent = `
    You just bought ${(input.value / priceSection.textContent).toFixed(4)} ounces (ozt) for $${input.value}. \n You will receive documentation shortly.
    `
    input.value = ""
})

confirmBtn.addEventListener("click",  () => {
    dialogSection.close()
    getCurrentPrice()
})

async function getCurrentPrice() {
    const res = await fetch('/price')
    const data = await res.text()
    priceSection.textContent = data
}