const cardsDiv = document.getElementById("cardsDiv");
const edit =document.getElementById("edit");
document.addEventListener("load", init());

function init(){
    getApi();
}

async function getApi() {
    try {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjMDAwNWQyMjA3MTAwMTVkZTJmNTQiLCJpYXQiOjE3MzQwODI1NjUsImV4cCI6MTczNTI5MjE2NX0.sAmcXBQzFYp9u11QqxZz32enq2KKxlIfWdxeXPlWDAw"
            }
        })
        const data = await response.json();
        console.log(data);

        printProducts(data);
    } catch (error) {
        console.log(error);
    }
}

function printProducts(data) {    
    for(let i=0; i<data.length; i++){
        const cards =document.createElement("div")
        cards.setAttribute("class", "card col-3")
        cards.innerHTML = `
                <img src="${data[i].imageUrl}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${data[i].name}</h5>
                    <h6 class="card-subtitle">${data[i].brand}</h6>
                    <p class="card-text">${data[i].description}</p>
                    <p class="card-text">${data[i].price}€</p>
                    <a href="details.html" class="btn btn-primary btnView">VIEW</a>
                    <a href="form.html" class="btn btn-primary btnEdit">EDIT</a>
                </div>
        `
        cardsDiv.appendChild(cards)
    }
    const btnEdit = document.querySelectorAll(".btnEdit");
    for (let i = 0; i < data.length; i++) {
        btnEdit[i].addEventListener("click", function() {
            sessionStorage.setItem("id", data[i]._id);
        });
    }
    const btnView = document.querySelectorAll(".btnView");
    for (let i = 0; i < data.length; i++) {
        btnView[i].addEventListener("click", function() {
            sessionStorage.setItem("id", data[i]._id);
        });
    }
}