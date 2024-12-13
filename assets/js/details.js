const id = sessionStorage.getItem("id");
const productName = document.getElementById("name")
const description = document.getElementById("description")
const brand = document.getElementById("brand")
const imageUrl = document.getElementById("imageUrl")
const price = document.getElementById("price")
const home = document.getElementById("home")

document.addEventListener("load", init())

function init() {
    getProduct();
}

async function getProduct() {
    try {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjMDAwNWQyMjA3MTAwMTVkZTJmNTQiLCJpYXQiOjE3MzQwODI1NjUsImV4cCI6MTczNTI5MjE2NX0.sAmcXBQzFYp9u11QqxZz32enq2KKxlIfWdxeXPlWDAw"
            }
        })
        const data = await response.json();
        if (response.ok) {
            productName.innerHTML = data.name;
            brand.innerHTML = data.brand;
            description.innerHTML = data.description;
            imageUrl.setAttribute("src", data.imageUrl);
            price.innerHTML = data.price;
        } else {
            errorAlert.innerHTML = `<div class="alert alert-warning alert-dismissible fade show w-50" role="alert">
        <strong>ERRORE!</strong> Qualcosa è andato storto. &nbsp;&nbsp; ${error}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
        }
    } catch (error) {
        console.error("get error: ", error);
        errorAlert.innerHTML = `<div class="alert alert-warning alert-dismissible fade show w-50" role="alert">
        <strong>ERRORE!</strong> Qualcosa è andato storto. &nbsp;&nbsp; ${error}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
    }
}

home.addEventListener("click", function () {
    sessionStorage.clear();
})