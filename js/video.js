// get time
function getTime(time){
    const hour = parseInt(time / 3600)
    let remainingSecond = time % 3600
    const minute = parseInt(remainingSecond / 60)
    return `${hour}h ${minute}m ago`
}

// fetch load and show the video in html
const loadVideos = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
    .catch(error => console.log(error));
}

// {
//     "category_id": "1001",
//     "video_id": "aaad",
//     "thumbnail": "https://i.ibb.co/f9FBQwz/smells.jpg",
//     "title": "Smells Like Teen Spirit",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/k4tkc42/oliviar-harris.jpg",
//             "profile_name": "Oliver Harris",
//             "verified": true
//         }
//     ],
//     "others": {
//         "views": "5.4K",
//         "posted_date": "1672656000"
//     },
//     "description": "'Smells Like Teen Spirit' by Oliver Harris captures the raw energy and rebellious spirit of youth. With over 5.4K views, this track brings a grunge rock vibe, featuring powerful guitar riffs and compelling vocals. Oliver's verified profile guarantees a quality musical journey that resonates with fans of dynamic, high-energy performances."
// }

// display videos
const displayVideos = (videos) => {
    const videoContainer = document.getElementById("videos")
    videoContainer.innerHTML = "";
    videos.forEach(video => {
        console.log(video);
        const card = document.createElement('div')
        card.classList = "card"
        card.innerHTML = `
            <figure class="h-[200px] relative rounded-lg">
                <img class="h-full w-full object-cover" src=${video.thumbnail} />
                ${video.others.posted_date?.length == 0 ? "" : `
                    <span class="absolute text-[10px] right-2 bottom-2 text-white bg-black p-1 rounded">${getTime(video.others.posted_date)}</span>
                    `}
                
            </figure>
            <div class="px-0 py-2 flex gap-2">
                <div>
                    <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} />
                </div>
                <div>
                    <h3 class="text-[16px] font-bold"> ${video.title} </h3>
                    <div class="flex gap-2 items-center">
                        <p class="text-[#171717B3] text-sm">${video.authors[0].profile_name} </p>
                        ${video.authors[0].verified ? '<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" />' : ''}
                        
                    </div>
                    <p></p>
                </div>
            </div>
        `
        videoContainer.append(card)
    })
}

loadVideos()