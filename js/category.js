// fetch, load and show the categories in html

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
    .then((data) => displayVideos(data.category
    ))
    .catch((error) => console.log(error))
}

// create display categories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories")
    categories.forEach(item => {
        // create button
        const buttonContainer = document.createElement("div")
        buttonContainer.innerHTML = `
            <button onclick="loadCategoriesVideo(${item.category_id}
)" class="btn">
                ${item.category}
            </button>
        `
        // add button to the category container
        categoryContainer.append(buttonContainer)
    });
}

loadCategories()