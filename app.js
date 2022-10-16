const $error = document.querySelector('.error');

let tempValor = document.getElementById('temperatura-valor'),
temDescripcion = document.getElementById('temperatura-descripcion'),
ubicacion = document.getElementById('ubicacion'),
icon = document.getElementById('icono'),
velViento = document.getElementById('viento-velocidad');

window.addEventListener('load', ()=>{

    let longitud, latitud;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(posicion => {
            // console.log(posicion.coords.latitude, posicion.coords.longitude); 
            longitud = posicion.coords.longitude;
            latitud = posicion.coords.latitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=0b23cf31ab45eb6e9b2d5a48dc8ddc42`

            // console.log(url)

            fetch(url)
            .then(res => res.ok ? res.json() : Promise.reject(res))

            .then(json => {
                console.log(json)

                let temp = Math.round(json.main.temp);
                tempValor.textContent = `${temp} °C`;

                let descripcion = json.weather[0].description;
                temDescripcion.textContent = descripcion.toUpperCase();

                let ubi = json.name;
                ubicacion.textContent = ubi.toUpperCase();

                let wind = json.wind.speed;
                velViento.textContent = `${wind} m/s`

                switch(json.weather[0].main){
                    case 'Clouds': 
                        icon.src = 'animated/cloudy-day-3.svg';
                        break;

                    case 'Clear':
                        icon.src = 'animated/day.svg';
                        break;

                    case 'Thunderstorm':
                        icon.src = 'animated/thunder.svg'
                        break;

                    case 'Drizzle':
                        icon.src = 'animated/rainy-1.svg'
                        break;

                    case 'Rain':
                        icon.src = 'animated/rainy-7.svg'
                        break;

                    case 'Snow':
                        icon.src = 'animated/snowy-6.svg'
                        break;

                    case 'Rain':
                        icon.src = 'animated/rainy-7.svg'
                        break;

                    case 'Atmosphere':
                        icon.src = 'animated/weather.svg'
                        break;

                    case 'Rain':
                        icon.src = 'animated/rainy-7.svg'
                        break;

                    default:
                        icon.src = 'animated/cloudy-day-1.svg'
                }
            })

            .catch(err => {
                console.log(err)
                let message = err.statusText || 'Ha ocurrido un error';
                $error.classList.remove('none');
                $error.innerHTML = `<p><b>Error ${err.status}: ${message}</b></p>`;
            })
        })
    }
})