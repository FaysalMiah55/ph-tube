// get time
function getTime(time){
    const hour = parseInt(time / 3600)
    let remainingSecond = time % 3600
    const minute = parseInt(remainingSecond / 60)
    return `${hour}h ${minute}m ago`
}
// Helper function to convert views to a number (handles 'k' and 'M')
function parseViews(viewString) {
    if (viewString.endsWith('M')) {
        return parseFloat(viewString) * 1_000_000;
    } else if (viewString.endsWith('K')) {
        return parseFloat(viewString) * 1_000;
    } else {
        return parseFloat(viewString);  // If the views are already numbers
    }
}

// fetch load and show the video in html
const loadVideos = (searchText = '') => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
    .catch(error => console.log(error));
}

//load category details 
const loadDetails = async(video_id) => {
    console.log(video_id);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`
    const res = await fetch(url)
    const data = await res.json()
    displayDetails(data.video)

}
const displayDetails = (video) => {
    console.log(video);
    const detailContainer = document.getElementById("modal-content")
    detailContainer.innerHTML = `
        <img src=${video.thumbnail} />
        <p class="mt-2">${video.description}<p/>
    `

    // way-1
    document.getElementById("showModalData").click()
    // way-2
    // document.getElementById("customModal").showModal()
}
// display videos
const displayVideos = (videos) => {
    const videoContainer = document.getElementById("videos")
    videoContainer.innerHTML = "";
    if(videos.length == 0){
        videoContainer.classList.remove("grid")
        videoContainer.innerHTML = `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
            <img src="assets/Icon.png" />
            <h2 class="text-center text-[32px] font-bold">Oops!! Sorry, There is no content here</h2>
        </div>
        `;
        return;
    }else{
        videoContainer.classList.add("grid")
    }
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
                    <div class="flex gap-10 justify-between items-center text-xs text-[#171717B3] mt-1">
                        <p>${video.others.views} views</p>
                        <p><button onclick="loadDetails('${video.video_id}')" class="underline">Details</button><p>
                    </div>
                </div>
            </div>
        `
        videoContainer.append(card)
    })
}

// sort video
document.getElementById("sort-items").addEventListener('click', ()=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos`)
    .then(res => res.json())
    .then(data => {
        // Sort the videos array by views
        const sortedVideos = data.videos.sort((a, b) => {
            const viewsA = parseViews(a.others.views);
            const viewsB = parseViews(b.others.views);
            return viewsB - viewsA; // Sort in descending order (highest views first)
        });
        // Display the sorted videos
        displayVideos(sortedVideos);
    })
    .catch(error => console.log(error));
})

// filter in search
document.getElementById("input-field").addEventListener('keyup', (e)=>{
    loadVideos(e.target.value);
})

loadVideos()