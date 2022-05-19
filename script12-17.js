const inputHeight = document.querySelector(".height")
const inputWidth = document.querySelector(".width")
const inputBgColor = document.querySelector(".bg-color")
const inputPadding = document.querySelector(".padding")
const inputMargin = document.querySelector(".margin")
const inputBorder = document.querySelector(".border")
const inputBorderRadius = document.querySelector(".border-radius")
const preview = document.querySelector(".preview")
const category = document.querySelector(".category")
const subcategory = document.querySelector(".subcategory")
const button = document.querySelectorAll(".btn")
const gallery = document.querySelector(".gallery")
const cardEl = document.createElement('div')
const results = document.createElement("div")
results.classList.add("results")
cardEl.classList.add("card")

let trigger = true

function propertyFieldsClear() {
    inputHeight.value = ""
    inputWidth.value = ""
    inputBgColor.value = ""
    inputPadding.value = ""
    inputMargin.value = ""
    inputBorder.value = ""
    inputBorderRadius.value = ""
}
function categoryFieldsClear() {
    category.value = ""
    subcategory.value = ""

}
function buttonsOpacity() {
    button[0].style.opacity = '1'
    button[1].style.opacity = '1'
    button[2].style.opacity = '1'
}


button[0].onclick = () => {
    if (trigger) {

        if (inputHeight.value !== "" && inputWidth.value !== "" && inputBgColor.value !== "" && inputPadding.value !== "" &&
            inputMargin.value !== "" && inputBorder.value !== "" && inputBorderRadius.value) {
            cardEl.style.height = `${inputHeight.value}px`
            cardEl.style.width = `${inputWidth.value}px`
            cardEl.style.backgroundColor = `${inputBgColor.value}`
            cardEl.style.padding = `${inputPadding.value}px`
            cardEl.style.margin = `${inputMargin.value}px`
            cardEl.style.border = `${inputBorder.value}`
            cardEl.style.borderRadius = `${inputBorderRadius.value}%`
            preview.appendChild(cardEl)

        } else {
            alert('At least one property is not filled')
        }
        button[0].style.opacity = '0.5'
    }
    trigger = false
}

let clone

button[1].onclick = () => {

    if (!trigger) {
        if (category.value !== "" && subcategory.value !== "") {
            fetch(`http://167.99.138.67:8281/random/${category.value}/${subcategory.value}`)
                .then(res => res.json())
                .catch(onerror => {
                    alert("Server error")
                })
                .then(data => {
                    if (data.success) {
                        let itemGot = data.item
                        if (itemGot.includes("http")) {
                            cardEl.innerHTML =
                                `<img src="${itemGot}" alt=""/>`
                        } else {
                            cardEl.innerHTML =
                                `<p>${itemGot}</p>`
                        }
                        clone = cardEl.cloneNode(true)
                    } else {
                        alert(`${data.message}`)
                        trigger = false
                        button[1].style.opacity = '1'
                        categoryFieldsClear()
                    }
                })
        } else {
            alert('Category and/or subcategory is not filled')
        }
        button[1].style.opacity = '0.5'
    }
    trigger = true
}


button[2].onclick = () => {
    if (trigger) {
        console.log(clone)
        results.prepend(clone)
        gallery.append(results)
        button[2].style.opacity = '0.5'
    }
    trigger = false

}

button[3].onclick = () => {
    trigger = true
    preview.innerHTML = ""
    cardEl.innerHTML = ""
    buttonsOpacity()
    propertyFieldsClear()
    categoryFieldsClear()

}



