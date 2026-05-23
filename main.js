let newfile = document.querySelector('.new-file')
let home = document.querySelector('.btn-home')
let Allnots = document.querySelector('.allnots')
let div = document.querySelector('.unit')
let nots = document.querySelector('.nots')
let delite = document.querySelector('.era')
let btnsearch = document.querySelector('.search-button')
let searchinput = document.querySelector('.search-input')
let textFieldAll = document.querySelector('.textFieldAll')
let mainSite = document.querySelector('.main')
let nameText = document.querySelector('.nameTexting')
let liane = document.querySelector('.linss')
let numText = document.querySelector('.numText')
let chan = document.querySelector('.changes')
let searchButton = document.querySelector('.search-button')
let findNotesn = document.querySelector('.search-input')
let fiveFont = document.querySelector('.fiveFont')
let tenFont = document.querySelector('.tenFont')
let minfiveFont = document.querySelector('.minfiveFont')
let mintenFont = document.querySelector('.mintenFont')
let textfontSav = document.querySelector('.textfontSav')
let downloadBtn = document.querySelector('.downloads')
let save = document.querySelector('.save')
let del = document.querySelector('.Del')
let cursive = document.querySelector('.cursive')
let fattext = document.querySelector('.fattext')
let linetext = document.querySelector('.linetext')
let saveornot = document.querySelector('.saveornot')
let delText = document.querySelector('.delText')

let noteCounter = 1
let deliteMode = false

newfile.addEventListener('click', function(event) {
    event.preventDefault()
    let notesn = document.createElement('div')
    notesn.classList.add("notesn")
    notesn.setAttribute('id', `${noteCounter}`) 
    let texting = document.createElement('p')
    texting.textContent = 'Notes ' + noteCounter
    let textField = document.createElement('textarea')
    textField.classList.add('texting')
    textField.setAttribute('id', `${noteCounter}`) 
    textField.style.display = 'none' 
    textField.style.fontSize = '15px'
    textFieldAll.appendChild(textField)
    mainSite.appendChild(textFieldAll)
    notesn.appendChild(texting)
    Allnots.appendChild(notesn)
    noteCounter++
    notesn.addEventListener('click', function(event) {
        event.preventDefault()
        div.style.display = 'none'
        textFieldAll.style.display = 'flex'
        textField.style.display = 'flex'
        mainSite.style.marginLeft = '0px'
        mainSite.style.marginTop = '0px'
        nameText.style.display = 'flex'
        numText.innerHTML = 'Notes ' + notesn.id
        chan.style.display = 'block'
        if (deliteMode === true) {
            notesn.remove()
            textField.remove()
            noteCounter = noteCounter - 1
            deliteMode = false
            saveNotes()
        }
        document.querySelectorAll('.texting').forEach(textFieldItem => {
            if (textFieldItem.id === notesn.id) {
                textFieldItem.style.display = 'flex'
            } 
            else {
                textFieldItem.style.display = 'none'
            }
        })
    })
    let textFont = parseInt(getComputedStyle(textField).fontSize)
    fiveFont.addEventListener('mouseup', function () {
        textFont = Number(textFont) + 5
        textField.style.fontSize = textFont + 'px'
        textfontSav.innerHTML = 'Font Size: ' + textFont
    })
    
    tenFont.addEventListener('mouseup', function () {
        textFont = Number(textFont) + 10
        textField.style.fontSize = textFont + 'px'
        textfontSav.innerHTML = 'Font Size: ' + textFont
    })
    
    minfiveFont.addEventListener('mouseup', function () {
        textFont = Number(textFont) - 5
        textField.style.fontSize = textFont + 'px'
        textfontSav.innerHTML = 'Font Size: ' + textFont
    })
    
    mintenFont.addEventListener('mouseup', function () {
        textFont = Number(textFont) - 10
        textField.style.fontSize = textFont + 'px'
        textfontSav.innerHTML = 'Font Size: ' + textFont
    })
    colorInput.addEventListener('input', function() {
        textField.style.color = colorInput.value
    })

    fattext.addEventListener('click', function() {
        textField.style.fontWeight =  700
    })
    linetext.addEventListener('click', function() {
        textField.style.textDecoration = "underline"
    })
    cursive.addEventListener('click', function() {
        textField.style.fontFamily = "'Roboto', sans-serif"
        textField.style.fontStyle = 'italic'
    })
    delText.addEventListener('click', function() {
        textField.style.fontWeight =  400
        textField.style.fontFamily = "'Poppins', sans-serif"
        textField.style.fontStyle = 'none'
        textField.style.textDecoration = "none"
    })
    saveNotes()
})

delite.addEventListener('click', function() {
    deliteMode = true
})

del.addEventListener('click', function() {
    let textArea = document.querySelector('.texting[style*="display: flex"]')
    div.style.display = 'block'
    mainSite.style.marginLeft = '90px'
    mainSite.style.marginTop = '120px'
    textFieldAll.style.display = 'none'
    chan.style.display = 'none' 
    notesn.remove()
    textArea.remove()
    noteCounter = noteCounter - 1
    saveNotes()
})

home.addEventListener('click', function(event) {
    event.preventDefault()
    div.style.display = 'block'
    mainSite.style.marginLeft = '90px'
    mainSite.style.marginTop = '120px'
    textFieldAll.style.display = 'none'
    chan.style.display = 'none'
})

save.addEventListener('click', function() {
    saveornot.innerHTML = 'Notepad Status: saved'
    saveNotes()
})

searchButton.addEventListener('click', function() {
    let notesnAll = document.querySelectorAll('.notesn')
    let query = findNotesn.value.toLowerCase()
    
    for (let note of notesnAll) {
        let text = note.textContent.toLowerCase()
        
        if (text.includes(query)) {
            note.style.display = "flex"
        } else {
            note.style.display = "none"
        }
    }
})

let colorInput = document.querySelector('.color-input')
let realcolor = document.querySelector('.colortext')
let colorInputText = colorInput.value
colorInput.addEventListener('input', function () {
    let colorInputText = colorInput.value
    realcolor.innerHTML = 'Current color: ' + colorInputText
    saveNotes()
})


downloadBtn.addEventListener('click', function () {
    let activeTextArea = document.querySelector('.texting[style*="display: flex"]')
    let textw = activeTextArea.value
    let blob = new Blob([textw], { type: 'text/plain' })
    let link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'Notes-' + activeTextArea.id + '.txt'
    link.click()
})

function saveNotes() {
    let textareas = document.querySelectorAll('.texting')
    let data = []
    for (let textarea of textareas) {
        data.push(textarea.value)
    }
    localStorage.setItem('notes', JSON.stringify(data))
}

function loadNotes() {
    let saved = localStorage.getItem('notes')
    if (saved === null) {
        return
    }
    let data = JSON.parse(saved)
    data.forEach(note => {
        newfile.click()
        let textareas = document.querySelectorAll('.texting')
        textareas[textareas.length - 1].value = note
    })
}
loadNotes()