let clickcount = 0
let clickMultiplier = 100
let powerProb = .993
function incrementCount() {
    clickcount = clickcount + clickMultiplier
    let clicks = document.getElementById('counter')
    clicks.innerText = 'Clicks: '+clickcount
    if (Math.random() >= powerProb) {
        powerUp()
    }
    if (clickcount >= 238900) {
        document.getElementById('win').click()
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function powerUp() {
    poweruptxt = document.getElementById('powerup')
    moonimg = document.getElementById('moonimage')
    for (let i = 0; i <31; i++) {
        poweruptxt.style.opacity = 1
        moonimg.click()
        await sleep(60)
        if(i % 5 == 0) {
            console.log('it werkzzz')
            poweruptxt.style.opacity = 0
        }

    }

}

function purchase(cost, mult, luck, toBuy) {
    if (clickcount >= cost) {
        clickcount += -cost
        let clicks = document.getElementById('counter')
        clicks.innerText = 'Clicks: '+clickcount
        clickMultiplier += mult
        powerProb -= luck
        toBuy = document.getElementById(toBuy)
        toBuy.innerText = 'Sold'
        toBuy.style.backgroundColor = '#B89C79'
        toBuy.style.pointerEvents = 'none'
        toBuy.onclick = null
        if (toBuy.id == 'rocket') {
            addRocketFuel()
        }

    }
}

function purchaseAll() {
    buttonArr = document.getElementsByClassName('buybutton')
    console.log(buttonArr)
    for (let i = 1; i < buttonArr.length; i++) {
        buttonArr[i].click()
    } 

}
//known bug, will buy rocketfuel immedietly upon unlocking if the player can afford it.
//Solved!
function addRocketFuel() {
    let moonshop = document.getElementById('moonshop')
    let newRow = document.createElement('tr')
    moonshop.appendChild(newRow)
    let name = document.createElement('td')
    let descr = document.createElement('td')
    let cost = document.createElement('td')
    let buy = document.createElement('td')
    newRow.appendChild(name)
    newRow.appendChild(descr)
    newRow.appendChild(cost)
    newRow.appendChild(buy)
    name.innerText = 'Rocket Fuel'
    descr.innerText = 'Did you think it would work without fuel?'
    cost.innerText = '3000 Clicks'
    buy.className = 'buybutton'
    buy.id = 'fuel'
    buy.innerText = 'Buy'
    fuel = "fuel"
    buy.setAttribute('onclick', 'purchase(3000, 2, 1, "fuel")')
}