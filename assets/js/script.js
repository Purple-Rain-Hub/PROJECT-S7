const cardsDiv = document.getElementById("cardsDiv");

async function getApi() {
    try {
        await fetch("https://striveschool-api.herokuapp.com/api/product/", {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjMDAwNWQyMjA3MTAwMTVkZTJmNTQiLCJpYXQiOjE3MzQwODI1NjUsImV4cCI6MTczNTI5MjE2NX0.sAmcXBQzFYp9u11QqxZz32enq2KKxlIfWdxeXPlWDAw"
            }
        })
            .then((response) =>{ 
                data = response.json();
                printProducts(data);
            })
    } catch (error) {
        console.log(error);
    }
}

function printProducts(data) {
    for(let i=0; i<data.lenght; i++){
        cardsDiv.innerHTML = `
        <div class="card col-3">
                <img src="${data[i].imageUrl}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${data[i].name}</h5>
                    <h6 class="card-subtitle">${data[i].brand}</h6>
                    <p class="card-text">${data[i].description}</p>
                    <p class="card-text">${data[i].price}€</p>
                    <a href="#" class="btn btn-primary">ciao</a>
                </div>
            </div>
        `
    }
}