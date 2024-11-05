// get time
function getTime(time){
    const hour = parseInt(time / 3600)
    let remainingSecond = time % 3600
    const minute = parseInt(remainingSecond / 60)
    return `${hour}h ${minute}m ago`
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
                    <p><button onclick="loadDetails('${video.video_id}')" class="btn btn-error">Details</button></p>
                </div>
            </div>
        `
        videoContainer.append(card)
    })
}

document.getElementById("input-field").addEventListener('keyup', (e)=>{
    loadVideos(e.target.value);
})

loadVideos()