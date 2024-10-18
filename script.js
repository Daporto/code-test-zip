const getPostalCodeInfo = async () => {
    const postalCode = document.getElementById('postalCode').value;
    const url = `http://api.zippopotam.us/US/${postalCode}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Something went wrong making the request`);
        }
        const data = await response.json();
        const placeInfo = data.places[0];
        const stateAbbreviation = placeInfo['state abbreviation'];
        document.getElementById('latitude').textContent = `Latitude: ${placeInfo.latitude}`;
        document.getElementById('longitude').textContent = `Longitude: ${placeInfo.longitude}`;    
        document.getElementById('placeName').textContent = `Place name: ${placeInfo['place name']}`;
        document.getElementById('state').textContent = `State: ${placeInfo.state}`;    
        document.getElementById('stateAbbreviation').textContent = `State abbreviation: ${stateAbbreviation}`;
        const stateImage = `<img id='stateImage' src="/states/${stateAbbreviation}.svg" alt="State Image" width="200" height="200">`;
        const currentImage = document.getElementById('stateImage');
        if(currentImage) currentImage.remove();
        const container = document.getElementById('imageContainer');
        container.style.display = 'flex';
        container.insertAdjacentHTML('beforeend', stateImage);
    } catch (error) {
        alert(error.message)
    }
}

const cleanFields = () => {
    document.getElementById('latitude').textContent = 'latitude: ';
    document.getElementById('longitude').textContent = 'longitude:';
    document.getElementById('placeName').textContent = 'Place name: ';
    document.getElementById('state').textContent = 'State: ';
    document.getElementById('stateAbbreviation').textContent = 'State abbreviation: ';
    const stateImage = document.getElementById('stateImage');
    if(stateImage) stateImage.remove();
}