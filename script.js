const apiKey = '2d3d1e05453ce8f5a04181ccc7407e99';
let currentCity = 0;
const cityNames = ['Kraljevo', 'Belgrade', 'Seattle'];
const fetchUrl = `https://api.openweathermap.org/data/2.5/weather?appId=${apiKey}&units=metric&`;


/**
 * Dohvata temperaturu za zadati grad i vraca rezultat u obliku { temp, temp_max, temp_min }
 * 
 * @param {strign} cityName Ime grada za koji dohvatamo temperaturu.
 */
function getTemperatureDataForCity(cityName) {
    return fetch(fetchUrl + `q=${cityName}`)
        .then(response => response.json())
        .then(r => {
            const { temp, temp_max, temp_min } = r.main;
            return { temp, temp_max, temp_min };
        })
}

/**
 * Dohvata podatke za trenutni grad, uvecava indeks za trenutni grad i upisuje rezultate u html elemente
 */
function setData() {
    // Uzmemo trenutni grad iz niza
    const city = cityNames[currentCity];

    // Dohvatimo podatke za trenutni grad.
    getTemperatureDataForCity(city).then(({ temp, temp_max, temp_min }) => {
        // Upisemo podatke u html.
        document.getElementById('city').innerHTML = `${city}`;
        document.getElementById('currentTemp').innerHTML = `${temp} celzijusa`;
        document.getElementById('minTemp').innerHTML = `${temp_min} celzijusa`;
        document.getElementById('maxTemp').innerHTML = `${temp_max} celzijusa`;
    });

    // Uvecava indeks trenutnog grada. Vraca na 0 kada dodje do kraja.
    currentCity = (currentCity + 1) % cityNames.length;
}

// Poziva setData prvi put jer setInterval prvi poziv radi tek nakon 5000ms
setData();

// Na svakih 5000ms pozovi setData
window.setInterval(setData, 5000);

// Dodaj listener da na svaki click na element sa id main prikaze alert
document.getElementById('main').addEventListener('click', () => alert(`Prikazujemo prognozu za ${cityNames[currentCity]}`));
