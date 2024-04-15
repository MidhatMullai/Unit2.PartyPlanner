const COHORT = "2310-fsa-et-web-pt-sf";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/artists`;

const state = {
  artists: [],
};

const artistList = document.querySelector("#artists");

const addArtistForm = document.querySelector("#addArtist");
addArtistForm.addEventListener("submit", addArtist);

/**
 * Sync state with the API and rerender
 */
async function render() {
  await getArtists();
  renderArtists();
}
render();

/**
 * Update state with artists from API
 */
async function getArtists() {
  try {
    const response = await fetch(API_URL)
    const json = await response.json
    state.artist = json.data
  } catch(error){
    console.error(error)
  }
  // TODO
}

/**
 * Render artists from state
 */
function renderArtists() {
  if (!state.artists.length){
    artistList.innerHTML = "<li> No Artists.</li>"
    return;
  }
  const artistCards = state.artist.map((artists) =>{
    const li = document.createElement("li")
    li.innerHTML = `
    <h2>${artist.name}</h2>
    <img src = "${artist.imageURL}" alt = "${artist.name}" />
    <p>${artist.description}</P>
    <button class="delete-btn" data-artist-id="${artist.id}">Delete</button>
    `;
    return li
  })
  artistList.replaceChildren(artistCards)

  const deleteBtn = li.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', function() {
    removePlayer(this.getAttribute('data-artist-id'));
  });
  // TODO
}

function attachDeleteEventListeners() {
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function() {
      const artistId = this.getAttribute('data-artist-id');
      removePlayer(artistId);
    });
  });
}
/**
 * Ask the API to create a new artist based on form data
 * @param {Event} event
 */
async function addArtist(event) {
  event.preventDefault();
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: addArtistForm.name.value,
        description: addArtistForm.description.value,
        imageUrl: addArtistForm.imageUrl.value,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to create artist");
    }

    render();
  } catch (error) {
    console.error(error);
  }// TODO
}
  
