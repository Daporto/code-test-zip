const getPostalCodeInfo = async () => {
    const postalCode = document.getElementById('postalCode').value;
    const url = `http://api.zippopotam.us/US/${postalCode}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`The postal code ${postalCode} was not found`);
        }
        const data = await response.json();
        const placeInfo = data.places[0];
        showPLaceInformation(placeInfo);
    } catch (error) {
        alert(error.message)
    }
}

const showPLaceInformation = (placeInfo) => {
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
}