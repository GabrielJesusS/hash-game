let isModalOpen = false
let isPlayer1 = true

const modal = document.getElementById("modal")


function toggleModal(){
   modal.classList.toggle('modal-open')
}

function setSpace(event){
    event.preventDefault()
    console.log(event.target.innerText = "x")
}