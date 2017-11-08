export default (input, latInput, lngInput, cb) => {
    if (!input) return;
    const dropdown = new window.google.maps.places.Autocomplete(input);

    dropdown.addListener('place_changed', () => {
        const place = dropdown.getPlace();
        latInput = place.geometry.location.lat();
        lngInput = place.geometry.location.lng();
        cb({location: place.formatted_address});
        cb({lat: latInput})
        cb({lng: lngInput})
    });


    input.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) e.preventDefault();
    });
};

