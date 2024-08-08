let words

async function generateButtons() {
    const buttons = document.createElement('div')
    buttons.className = "SitelenButtons"
    
    const Punctuation = document.createElement('div')
    Punctuation.className="Punctuaton"
    const Core = document.createElement('div')
    Core.className="Core"
    const Common = document.createElement('div')
    Common.className="Common"
    const UnCommon = document.createElement('div')
    UnCommon.className="UnCommon"
    const Obscure = document.createElement('div')
    Obscure.className = "Obscure"
    
    // get words
    const words = await getwords()
    // console.log(words)
    // create buttons
    for (var key in words) {
        // console.log(key)
        // get catagory
        const cat = words[key].usage_category
        // get unicode
        const uni = words[key].representations.ucsur
        // validate
        // console.log(cat)
        // console.log(uni)
        if (cat != null && uni != null) {
            // make button
            console.log("build button")
            const b = createButton(String.fromCodePoint("0x" + uni.substring(2)))
            b.title = key
            if (cat == "core") { Core.appendChild(b) }
            if(cat == "common"){Common.appendChild(b)}
            if(cat == "uncommon"){UnCommon.appendChild(b)}
            if (cat == "obscure") { Obscure.appendChild(b) }
        }
    }

    // punctuation
    Punctuation.appendChild(createButton("󱦐"))
    Punctuation.appendChild(createButton("󱦑"))
    
    // add button groups to buttons
    buttons.appendChild(Punctuation)
    buttons.appendChild(Core)
    buttons.appendChild(Common)
    buttons.appendChild(UnCommon)
    buttons.appendChild(Obscure)
    // add to html
    document.body.appendChild(buttons)
}

function write(char) {
    // console.log(char)
    document.getElementById("textbox").innerHTML+=char
}

function backspace() {
    // TODO more advanced backspace - unicode 2 long  - ascii 1 long
    // current method -2
    document.getElementById("textbox").innerHTML = document.getElementById("textbox").innerHTML.substring(0, document.getElementById("textbox").innerHTML.length-2)

}

function createButton(char) {
    const newButton = document.createElement('button')
    newButton.textContent = char
    newButton.style = "font-family: nasinnanpa;"
    newButton.addEventListener('click', () => { write(char); });
    return newButton
}

async function getwords() {
    const res = await fetch("https://raw.githubusercontent.com/lipu-linku/sona/main/api/raw/words.json")
    // console.log(res.json().then(data => words = data))
    return await res.json()
    
    
}