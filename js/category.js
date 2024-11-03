// fetch, load and show the categories in html

// create load categories 
const loadCategories = () => {
    // fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error))
}
// create display categories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories")
    categories.forEach(item => {
        // create button
        const button = document.createElement("button")
        button.classList = "btn"
        button.innerText = item.category
        // add button to the category container
        categoryContainer.append(button)
    });
}

loadCategories()