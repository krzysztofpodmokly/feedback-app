// write a function to retrieve a blob of json
// make an ajax request! use the 'fetch' function.
// http://rallycoding.herokuapp.com/api/music_albums

// Promise => .then()
function fetchAlbums() {
    fetch('http://rallycoding.herokuapp.com/api/music_albums')
        .then(res => res.json())
        .then(json => console.log(json));
}

// async => await
async function fetchAlbums() {
    const response = await fetch('http://rallycoding.herokuapp.com/api/music_albums');
    const json = await response.json();

    console.log(json);
}

const fetchAlbums = async () => {
    const response = await fetch('http://rallycoding.herokuapp.com/api/music_albums');
    const json = await response.json();

    console.log(json);
}

fetchAlbums()





