
const youtubeResultsWrapper = document.getElementById("youtubeResultsWrapper");

const apiKey = "AIzaSyDEV6gypzaxRf3LMlmJzsLkpEeJsolbnUY";


export async function youtubeVideoSearch(title){
    try {
            const response = await fetch(
                 `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(title)}&type=video&safesearch=strict&maxResults=9&key=${apiKey}`
            );

            if (!response.ok) throw new Error("YouTube API request failed");

            const data = await response.json();
            console.log("YouTube Results:", data.items);
            displayYoutubeResults(data.items); // array of videos

    } catch (error) {
        console.error("Error fetching YouTube videos:", error);
        return []; // fallback to empty array
    }

}


function displayYoutubeResults(data) {
    data.forEach(video => {
    // create recipe card div
    const videoCard = document.createElement('a');
    videoCard.classList.add('video-card');

    videoCard.setAttribute('href', `https://www.youtube.com/watch?v=${video.id.videoId}`)
    videoCard.target = "_blank";
    videoCard.textContent = video.snippet.title;
    videoCard.classList.add("youtube-link");

   

    const thumbnail = document.createElement('img');
    thumbnail.src = video.snippet.thumbnails.medium.url; // small thumbnail
    thumbnail.alt = video.snippet.title;
    videoCard.appendChild(thumbnail);


    


    // append the recipe card to the container
    youtubeResultsWrapper.appendChild(videoCard);
  });
}