const errorAlert = document.getElementById("errorAlert");
const form = document.querySelector("form");
const frmName = document.getElementById("name");
const frmDescription = document.getElementById("description");
const frmBrand = document.getElementById("brand");
const frmImageUrl = document.getElementById("imageUrl");
const frmPrice = document.getElementById("price");
const home = document.getElementById("home");
const id = sessionStorage.getItem("id");
let btnRemove = document.createElement("button");
btnRemove.innerHTML = "DELETE";
btnRemove.setAttribute("data-bs-toggle", "modal");
btnRemove.setAttribute("data-bs-target", "#deleteModal");
const h1 = document.querySelector("h1");
const btnDelete = document.getElementById("btnDelete");


document.addEventListener("load", init());

function init() {
    if (sessionStorage.getItem("id")) {
        h1.innerHTML = `EDITING PRODUCT ID: ${id}`
        getProduct();
        form.appendChild(btnRemove);
    }
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const objProduct = {
        name: frmName.value,
        description: frmDescription.value,
        brand: frmBrand.value,
        imageUrl: frmImageUrl.value,
        price: parseInt(frmPrice.value),
    };

    //   console.log("Oggetto prodotto:", objProduct);
    if (!sessionStorage.getItem("id")) {
        postProduct(objProduct);
    }
    else {
        putProduct(objProduct);
    }
});

async function postProduct(objProduct) {
    try {
        const response = await fetch(
            "https://striveschool-api.herokuapp.com/api/product/",
            {
                method: "POST",
                headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjMDAwNWQyMjA3MTAwMTVkZTJmNTQiLCJpYXQiOjE3MzQwODI1NjUsImV4cCI6MTczNTI5MjE2NX0.sAmcXBQzFYp9u11QqxZz32enq2KKxlIfWdxeXPlWDAw",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(objProduct),
            }
        );
        if (response.ok) {
            // console.log(response);
            sessionStorage.clear();
            setTimeout(() => { location.href = "index.html"; }, 1000)
        }
        else {
            errorAlert.innerHTML = `<div class="alert alert-warning alert-dismissible fade show w-50" role="alert">
            <strong>ERRORE!</strong> Qualcosa è andato storto. &nbsp;&nbsp; ${error}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`
        }
    } catch (error) {
        console.error("post error: ", error);
        errorAlert.innerHTML = `<div class="alert alert-warning alert-dismissible fade show w-50" role="alert">
  <strong>ERRORE!</strong> Qualcosa è andato storto. &nbsp;&nbsp; ${error}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`
    }
}

home.addEventListener("click", function () {
    sessionStorage.clear();
})


async function getProduct() {
    try {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjMDAwNWQyMjA3MTAwMTVkZTJmNTQiLCJpYXQiOjE3MzQwODI1NjUsImV4cCI6MTczNTI5MjE2NX0.sAmcXBQzFYp9u11QqxZz32enq2KKxlIfWdxeXPlWDAw"
            }
        })
        const data = await response.json();
        frmName.value = data.name;
        frmBrand.value = data.brand;
        frmDescription.value = data.description;
        frmImageUrl.value = data.imageUrl;
        frmPrice.value = data.price;
    } catch (error) {
        console.error("get error: ", error);
        errorAlert.innerHTML = `<div class="alert alert-warning alert-dismissible fade show w-50" role="alert">
  <strong>ERRORE!</strong> Qualcosa è andato storto. &nbsp;&nbsp; ${error}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`
    }
}


async function putProduct(objProduct) {
    try {
        const response = await fetch(
            "https://striveschool-api.herokuapp.com/api/product/" + id,
            {
                method: "PUT",
                headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjMDAwNWQyMjA3MTAwMTVkZTJmNTQiLCJpYXQiOjE3MzQwODI1NjUsImV4cCI6MTczNTI5MjE2NX0.sAmcXBQzFYp9u11QqxZz32enq2KKxlIfWdxeXPlWDAw",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(objProduct),
            }
        );
        if (response.ok) {
            // console.log(response);
            sessionStorage.clear();
            setTimeout(() => { location.href = "index.html"; }, 1000)
        }
        else {
            errorAlert.innerHTML = `<div class="alert alert-warning alert-dismissible fade show w-50" role="alert">
            <strong>ERRORE!</strong> Qualcosa è andato storto. &nbsp;&nbsp; ${error}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`
        }
    } catch (error) {
        console.error("put error: ", error);
        errorAlert.innerHTML = `<div class="alert alert-warning alert-dismissible fade show w-50" role="alert">
  <strong>ERRORE!</strong> Qualcosa è andato storto. &nbsp;&nbsp; ${error}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`
    }
}

btnRemove.addEventListener("click", function (e) {
    e.preventDefault();
})

btnDelete.addEventListener("click", function (e) {
    e.preventDefault();
    deleteProduct();
})

async function deleteProduct() {
    try {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/product/" + id,
            {
                method: "DELETE",
                headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjMDAwNWQyMjA3MTAwMTVkZTJmNTQiLCJpYXQiOjE3MzQwODI1NjUsImV4cCI6MTczNTI5MjE2NX0.sAmcXBQzFYp9u11QqxZz32enq2KKxlIfWdxeXPlWDAw",
                    "Content-Type": "application/json",
                }
            }
        )
        sessionStorage.clear();
        location.href = "index.html"
        // console.log(response);
    } catch (error) {
        console.log("delete error: ", error);

    }
}