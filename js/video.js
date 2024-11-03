// fetch load and show the video in html
const loadVideos = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
    .catch(error => console.log(error));
}



// display videos
const displayVideos = (videos) => {
    const videoContainer = document.getElementById("videos")
    
    videos.forEach(video => {
        console.log(video);
        const card = document.createElement('div')
        card.classList = "card card-compact"
        card.innerHTML = `
            <figure>
                <img src=${video.thumbnail} />
            </figure>
            <div class="card-body">
                <h2 class="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        `
        videoContainer.append(card)
    })
}

loadVideos()