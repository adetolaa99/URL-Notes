let myNotes = []
const inputEl = document.getElementById("input");
const saveBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul");
const deleteBtn = document.getElementById("delete-btn");
const notesFromLocalStorage = JSON.parse(localStorage.getItem("myNotes"));
const tabBtn = document.getElementById("tab-btn");

if(notesFromLocalStorage) {
    myNotes = notesFromLocalStorage
    render(myNotes) //passing in myNotes as an argument i.e telling renderNotes to render myNotes
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    myNotes.push(tabs[0].url) //push value to myNotes array. get url
    localStorage.setItem("myNotes", JSON.stringify(myNotes)) //save array to local storage i.e myNotes key is set to a string version of myNotes array. array to string
    render(myNotes)
    })    
})


function render(notes) {
    let listItems = ""
    for(let i=0; i<notes.length; i++) {
    // ulEl.textContent += myNotes[i] + " " - rendering text
    //listItems += "<li><a target='_blank' href='" + myNotes[i] + "'>" + myNotes[i]  + "</a></li>"
    listItems += `<li>
        <a target='_blank' href='${notes[i]}'>
            ${notes[i]}
        </a>
    </li>`
}
    ulEl.innerHTML = listItems
}

saveBtn.addEventListener("click", function() {
    myNotes.push(inputEl.value)  
    inputEl.value = ''
    localStorage.setItem("myNotes", JSON.stringify(myNotes))
    render(myNotes)
})

deleteBtn.addEventListener("click", function() {
    localStorage.clear()
    myNotes = []
    render(myNotes)
})

/*const li= document.createElement("li")
    li.textContent = myNotes[i]
    ulEl.append(li) */

