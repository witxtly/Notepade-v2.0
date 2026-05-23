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
let colorInput = document.querySelector('.color-input')
let realcolor = document.querySelector('.colortext')

let noteCounter = 1
let deliteMode = false

// Отслеживаем активную заметку и активное текстовое поле
let activeNote = null
let activeTextArea = null

// ─── Слушатели на кнопки управления — ОДИН РАЗ, вне newfile ───────────────

del.addEventListener('click', function () {
    if (!activeNote || !activeTextArea) return
    div.style.display = 'block'
    mainSite.style.marginLeft = '90px'
    mainSite.style.marginTop = '120px'
    textFieldAll.style.display = 'none'
    chan.style.display = 'none'
    activeNote.remove()
    activeTextArea.remove()
    noteCounter--
    activeNote = null
    activeTextArea = null
    saveNotes()
})

fiveFont.addEventListener('mouseup', function () {
    if (!activeTextArea) return
    let textFont = parseInt(activeTextArea.style.fontSize) || 15
    textFont += 5
    activeTextArea.style.fontSize = textFont + 'px'
    textfontSav.innerHTML = 'Font Size: ' + textFont
})

tenFont.addEventListener('mouseup', function () {
    if (!activeTextArea) return
    let textFont = parseInt(activeTextArea.style.fontSize) || 15
    textFont += 10
    activeTextArea.style.fontSize = textFont + 'px'
    textfontSav.innerHTML = 'Font Size: ' + textFont
})

minfiveFont.addEventListener('mouseup', function () {
    if (!activeTextArea) return
    let textFont = parseInt(activeTextArea.style.fontSize) || 15
    textFont -= 5
    activeTextArea.style.fontSize = textFont + 'px'
    textfontSav.innerHTML = 'Font Size: ' + textFont
})

mintenFont.addEventListener('mouseup', function () {
    if (!activeTextArea) return
    let textFont = parseInt(activeTextArea.style.fontSize) || 15
    textFont -= 10
    activeTextArea.style.fontSize = textFont + 'px'
    textfontSav.innerHTML = 'Font Size: ' + textFont
})

fattext.addEventListener('click', function () {
    if (!activeTextArea) return
    activeTextArea.style.fontWeight = 700
})

linetext.addEventListener('click', function () {
    if (!activeTextArea) return
    activeTextArea.style.textDecoration = 'underline'
})

cursive.addEventListener('click', function () {
    if (!activeTextArea) return
    activeTextArea.style.fontFamily = "'Roboto', sans-serif"
    activeTextArea.style.fontStyle = 'italic'
})

delText.addEventListener('click', function () {
    if (!activeTextArea) return
    activeTextArea.style.fontWeight = 400
    activeTextArea.style.fontFamily = "'Poppins', sans-serif"
    activeTextArea.style.fontStyle = 'none'
    activeTextArea.style.textDecoration = 'none'
})

colorInput.addEventListener('input', function () {
    let colorInputText = colorInput.value
    realcolor.innerHTML = 'Current color: ' + colorInputText
    if (activeTextArea) {
        activeTextArea.style.color = colorInput.value
    }
    saveNotes()
})

// ─── Создание новой заметки ────────────────────────────────────────────────

newfile.addEventListener('click', function (event) {
    event.preventDefault()

    let notesn = document.createElement('div')
    notesn.classList.add('notesn')
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

    notesn.addEventListener('click', function (event) {
        event.preventDefault()

        // Если режим удаления — удаляем сразу при клике на заметку
        if (deliteMode === true) {
            notesn.remove()
            textField.remove()
            noteCounter--
            deliteMode = false
            saveNotes()
            return
        }

        // Запоминаем активные элементы
        activeNote = notesn
        activeTextArea = textField

        div.style.display = 'none'
        textFieldAll.style.display = 'flex'
        mainSite.style.marginLeft = '0px'
        mainSite.style.marginTop = '0px'
        nameText.style.display = 'flex'
        numText.innerHTML = 'Notes ' + notesn.id
        chan.style.display = 'block'

        // Показываем только нужное поле
        document.querySelectorAll('.texting').forEach(function (textFieldItem) {
            if (textFieldItem.id === notesn.id) {
                textFieldItem.style.display = 'flex'
            } else {
                textFieldItem.style.display = 'none'
            }
        })
    })

    saveNotes()
})

// ─── Режим удаления ────────────────────────────────────────────────────────

delite.addEventListener('click', function () {
    deliteMode = true
})

// ─── Домой ────────────────────────────────────────────────────────────────

home.addEventListener('click', function (event) {
    event.preventDefault()
    div.style.display = 'block'
    mainSite.style.marginLeft = '90px'
    mainSite.style.marginTop = '120px'
    textFieldAll.style.display = 'none'
    chan.style.display = 'none'
    activeNote = null
    activeTextArea = null
})

// ─── Сохранение ───────────────────────────────────────────────────────────

save.addEventListener('click', function () {
    saveornot.innerHTML = 'Notepad Status: saved'
    saveNotes()
})

// ─── Поиск ────────────────────────────────────────────────────────────────

searchButton.addEventListener('click', function () {
    let notesnAll = document.querySelectorAll('.notesn')
    let query = findNotesn.value.toLowerCase()

    for (let note of notesnAll) {
        let text = note.textContent.toLowerCase()
        note.style.display = text.includes(query) ? 'flex' : 'none'
    }
})

// ─── Скачать ──────────────────────────────────────────────────────────────

downloadBtn.addEventListener('click', function () {
    if (!activeTextArea) return
    let textw = activeTextArea.value
    let blob = new Blob([textw], { type: 'text/plain' })
    let link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'Notes-' + activeTextArea.id + '.txt'
    link.click()
})

// ─── localStorage ─────────────────────────────────────────────────────────

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
    if (saved === null) return
    let data = JSON.parse(saved)
    data.forEach(function (note) {
        newfile.click()
        let textareas = document.querySelectorAll('.texting')
        textareas[textareas.length - 1].value = note
    })
}

loadNotes()
