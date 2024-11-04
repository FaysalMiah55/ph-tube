// fetch, load and show the categories in html
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn")
    console.log(buttons);
    for(let btn of buttons){
        btn.classList.remove("active")
    }
}
// create load categories 
const loadCategories = () => {
    // fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error))
}

// load category video
const loadCategoriesVideo = (id) => {
    // fetch the data
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
        // remove active class
        removeActiveClass()
        // add active class
        const activeBtn = document.getElementById(`btn-${id}`)
        activeBtn.classList.add("active")
        displayVideos(data.category)
    })
    .catch((error) => console.log(error))
}

// create display categories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories")
    categories.forEach(item => {
        // create button
        const buttonContainer = document.createElement("div")
        buttonContainer.innerHTML = `
            <button id="btn-${item.category_id}" onclick="loadCategoriesVideo(${item.category_id})" class="btn category-btn">
                ${item.category}
            </button>
        `
        // add button to the category container
        categoryContainer.append(buttonContainer)
    });
}

loadCategories()