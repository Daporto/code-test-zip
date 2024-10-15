const getPostalCodeInfo = async () => {
    cleanFields();
    const postalCode = document.getElementById('postalCode').value;
    console.log(postalCode);
    const url = `http://api.zippopotam.us/US/${postalCode}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Something went wrong making the request`);
        }
        const data = await response.json();
        const placeInfo = data.places[0];
        const stateAbbreviation = placeInfo['state abbreviation'];
        document.getElementById('latitude').textContent += placeInfo.latitude;
        document.getElementById('longitude').textContent += placeInfo.longitude;    
        document.getElementById('placeName').textContent += placeInfo['place name'];
        document.getElementById('state').textContent += placeInfo.state;    
        document.getElementById('stateAbbreviation').textContent += stateAbbreviation;
        const stateImage = `<img id='stateImage' src="/states/${stateAbbreviation}.svg" alt="State's Image" width="300" height="300">`;
        const container = document.getElementById('postalCodeInfoContainer')
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