var buttonAddElement = document.querySelector('.add')
var buttonEditElement = document.querySelector('.edit')
var inputElement = document.querySelector('.input')
var ulElement = document.querySelector('.my-list')
var deleteButtonElement = document.querySelector('.delete-button')

function refreshPage() {
    var getlocalStorage = localStorage.getItem('keyListArray')
    if (getlocalStorage == null) {
        var listArray = [];
    } else {
        listArray = JSON.parse(getlocalStorage)
    }
    var ulArray = listArray.map(function (value, key) {
        return `<li><span class="span" onclick= "editListInput(${key})" >${value}</span><button class="delete-button" onclick = "deleteElement(${key})">x</button></li>`
    })
    ulElement.innerHTML = ulArray.join('')
}

refreshPage()

buttonAddElement.addEventListener('click', makelistArray)
inputElement.addEventListener('keyup', enterkey)
function enterkey(e) {
    if (e.which == 13) {
        makelistArray()
    }
}
function makelistArray() {

    // make listArray and localStorage

    var getlocalStorage = localStorage.getItem('keyListArray')
    if (getlocalStorage == null) {
        var listArray = [];
    } else {
        listArray = JSON.parse(getlocalStorage)
    }

    if (!inputElement.value) {
        alert('Vui long nhap du lieu')
        console.log(!inputElement.value)
    } else {
        listArray.unshift(inputElement.value)
        localStorage.setItem('keyListArray', JSON.stringify(listArray))
    }

    // listArray to ulArray 
    var ulArray = listArray.map(function (value, key) {
        return `<li><span class="span" onclick= "editListInput(${key})" >${value}</span><button class="delete-button" onclick = "deleteElement(${key})">x</button></li>`
    })

    //  add ulArray to HTML
    ulElement.innerHTML = ulArray.join('')

    // delete value input
    inputElement.value = ''
}

function deleteElement(key) {

    var getlocalStorage = localStorage.getItem('keyListArray')

    var listArray = JSON.parse(getlocalStorage)

    listArray.splice(key, 1)

    localStorage.setItem('keyListArray', JSON.stringify(listArray))

    var ulArray = listArray.map(function (value, key) {
        return `<li><span class="span" onclick= "editListInput(${key})" >${value}</span><button class="delete-button" onclick = "deleteElement(${key})">x</button></li>`
    })

    ulElement.innerHTML = ulArray.join('')
}

function editListInput(key) {

    var getlocalStorage = localStorage.getItem('keyListArray')

    var listArray = JSON.parse(getlocalStorage)

    inputElement.value = listArray[key]

    buttonAddElement.classList.add('hidden')

    buttonEditElement.classList.remove('hidden')

    var spanElement = document.querySelector(`li:nth-child(${key + 1}) .span`)

    var lengthArray = listArray.length

    for(var i=0 ; i < lengthArray; i++ ) {
        var spanElementAll = document.querySelector(`li:nth-child(${i + 1}) .span`)
        spanElementAll.classList.remove('red')
    }

    spanElement.classList.add('red')

    buttonEditElement.onclick = function addListEdit() {
        if (!inputElement.value) {
            alert('vui long nhap du lieu chinh sua')
        } else {

            var getlocalStorage = localStorage.getItem('keyListArray')

            var listArray = JSON.parse(getlocalStorage)
            
            listArray.splice(key, 1, inputElement.value)
            localStorage.setItem('keyListArray', JSON.stringify(listArray))
            var ulArray = listArray.map(function (value, key) {
                return `<li><span class="span" onclick= "editListInput(${key})" >${value}</span><button class="delete-button" onclick = "deleteElement(${key})">x</button></li>`
            })

            ulElement.innerHTML = ulArray.join('')

            buttonEditElement.classList.add('hidden')

            buttonAddElement.classList.remove('hidden')

            spanElementAll.classList.remove('red')

            inputElement.value = ''

        }
    }
}

