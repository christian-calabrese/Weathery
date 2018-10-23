const icons = {'01d':'🌞', '01n':'🌑', '02d':'⛅', '02n':'⛅', '03d':'☁', '03n':'☁', '04d':'☁', '04n':'☁', '09d':'🌧', '09n':'🌧', '10d':'🌦', '10n':'🌦', '11d':'⛈', '11n':'⛈', '13d':'🌨', '13n':'🌨', '50d':'🌫', '50n':'🌫'}
const lelat = 39.8005967976
const lelng = 18.35416525
const lename = 'Leuca'

if(window.localStorage.getItem('lng') && window.localStorage.getItem('lat') && window.localStorage.getItem('city')) {
    setResult(window.localStorage.getItem('lat'), window.localStorage.getItem('lng'), window.localStorage.getItem('city'));
} else {
    setResult(lelat, lelng, lename)
}

$('#searchform').on('submit', (e) => {
    const form = e.target;
    const cityname = $('#gotcity').val()
    const lat = $('#lat').val()
    const lng = $('#lng').val()
    window.localStorage.setItem('lng', lng)
    window.localStorage.setItem('lat', lat)
    window.localStorage.setItem('city', cityname)
    setResult(lat, lng, cityname)
    
    e.preventDefault()
})

function setResult(lat, lng, cityname) {
    fetch(`/weather?lat=${lat}&lon=${lng}`, {
        method: 'GET',
        headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
        }
    })
    .then(res=>res.json())
    .then((res)=> {
        const city = $('#city')
        const temp = $('#temp')
        const img = $('#weatherimage')
        const desc = $('#weatherdesc')
        const mintemp = $('#temp_min')
        const maxtemp = $('#temp_max')

        city.text(cityname)
        temp.text(`${Math.round(res.main.temp)}°`)
        desc.text(res.weather[0].description)
        mintemp.text(`${Math.round(res.main.temp_min)}°`)
        maxtemp.text(`${Math.round(res.main.temp_max)}°`)
        img.text(icons[res.weather[0].icon])
    })
}