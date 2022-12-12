const lists = document.querySelectorAll(".list");
const button = document.querySelector("#adder");
const boards = document.querySelectorAll(".boards");
const removeBtn = document.querySelector(".remove__item-btn");
const listItem = document.querySelectorAll(".list__item");
const boardItem = document.querySelectorAll(".boards__item");
console.log(boardItem);



//реализация добавление задач
function addTask(){
    const btn = document.querySelector(".add__btn");
    const addBtn = document.querySelector(".add__item-btn");
    const cancelBtn = document.querySelector(".cancel__item-btn");
    // const removeBtn = document.querySelector(".remove__item-btn");
    const textarea = document.querySelector(".textarea");
    const form = document.querySelector(".form");

    let value 

    //добавить карточку
    btn.addEventListener('click', () =>{
        form.style.display = "block";
        btn.style.display = "none";
        addBtn.style.display = "none";
        
        textarea.addEventListener('input', e =>{
            value = e.target.value
            if(value){
                addBtn.style.display = "block";
            } else{
                addBtn.style.display = "none";
            }
        })
    })

//отмена
    cancelBtn.addEventListener('click', e =>{
        textarea.value = ''
        value = ''
        form.style.display = "none";
        btn.style.display = "flex";


    })

    // //для удаления стартовой карточки
    // function removeTask(){
    //     const removeBtn = document.querySelector(".remove__item-btn");
    //     const newItem = document.querySelector(".list__item");
  
    //     removeBtn.addEventListener("click", () =>{
    //         newItem.style.display = "none"
    //     })
        
    // }
    // removeTask()

//добавление
    addBtn.addEventListener("click", () =>{

        const newItem = document.createElement("div");
        newItem.classList.add("list__item");
        newItem.draggable = true;
        newItem.textContent = value;
        lists[0].append(newItem);
        

        textarea.value = ""
        value = ""
        form.style.display = "none";
        btn.style.display = "flex";
        
        
        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove__item-btn");
        removeBtn.textContent = "X";
        newItem.append(removeBtn);
        
        removeBtn.addEventListener("click", ()=>{
            newItem.style.display = "none"
        })  


        drgNdrop()
        
      
    })


}
addTask()


// реализация добавление доски
function addBoard(){
    const boards = document.querySelector(".boards");
    const board = document.createElement("div");

    board.classList.add("boards__item");
    board.innerHTML = `
    <span contenteditable="true" class="title">Введите название</span>
                <div class="list">
                    <div class="list__item" draggable="true">Карточка 1</div>
                </div>
                
    `
    boards.append(board);
    changeTitle()
    drgNdrop()
}
button.addEventListener("click", addBoard)



function changeTitle(){
    const titles = document.querySelectorAll(".title");
 
    titles.forEach(title =>{
        title.addEventListener("click", e =>{
            e.target.textContent = ""
        })
    })
}


changeTitle()

let dragEl= null;
let dropEl = null;


function drgNdrop(){
    const listItems = document.querySelectorAll(".list__item");
    const lists = document.querySelectorAll(".list");
    const boards = document.querySelectorAll(".boards");
   
    const boardItem = document.querySelectorAll(".boards__item");

   listItems.forEach(item =>{
        item.addEventListener("dragstart", function(e){
            dragEl = e.target;
            setTimeout(() =>{
                item.style.display = "none"
            
            },0)
        })

        item.addEventListener("dragend", () =>{
            setTimeout(() => {
                item.style.display = "block"
                dragEl = null
            }, 0);
        })
        
   })


   lists.forEach(board =>{

       
        board.addEventListener("dragover", e => e.preventDefault())

        board.addEventListener("dragenter", function (e) {
            e.preventDefault();
            this.style.backgroundColor = 'rgba(0,0,0,.3)'
        })

        board.addEventListener("dragleave", function(e) {
            this.style.backgroundColor = 'rgba(0,0,0,0)'
        
        })

        board.addEventListener("drop", function(e) {
            this.append(dragEl)
        })
        
    })

    boardItem.forEach(b =>{

        b.addEventListener("dragover", e => {
            e.preventDefault();
            dropEl = e.target;
            e.target.classList.add("dragOver");
        })

        b.addEventListener("dragleave", e => {
            e.stopPropagation();
            e.preventDefault();
            b.style = null;   
            });

            b.addEventListener("drop", function(e) {
                e.preventDefault();
                e.stopPropagation();
                // let dropTag = e.dataTransfer.getData("text/html");
                if (dropEl === this) {
                    this.appendChild(dragEl);
                } else {
                  
                    dropEl.classList.remove("dragOver");
                    dropEl = null;
                }
            });

            
    })




}    

drgNdrop()