let words

async function generateButtons() {
    const buttons = document.createElement('div')
    buttons.className = "SitelenButtons"
    

    const Punctuation = document.createElement('div')
    Punctuation.className = "Punctuaton"
    
    const Ideograph = document.createElement('div')
    Ideograph.className = "Ideograph"

    
    // get words
    const words = await getwords()
    // console.log(words)
    // create buttons
    for (const element of words) {
        // console.log(element)
        const b = createButton(String.fromCodePoint("0x" + element.uscr), element.name)



        if (element.type == "Ideograph") {
            Ideograph.appendChild(b)
        } else {
            Punctuation.appendChild(b)
        }

    }

    // add button groups to buttons
    buttons.appendChild(Punctuation)
    buttons.appendChild(Ideograph)
    // add to html
    document.getElementById("buttons").appendChild(buttons)
}

function write(char) {
    // console.log(char)
    document.getElementById("textbox").value+=char
}

function createButton(char,name) {
    const newButton = document.createElement('button')
    newButton.textContent = char
    newButton.addEventListener('click', () => { write(char); });
    newButton.title = name
    newButton.className = "button"
    return newButton
}

async function getwords() {
    const res = await fetch("./KKConverter/sitelen.json")
    // console.log(res)
    return await res.json()
    
    
}