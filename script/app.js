// _ = helper functions
let _calculateTimeDistance = (startTime, endTime) => {
	// Bereken hoeveel tijd er tussen deze twee periodes is.
	// Tip: werk met minuten.
	let time = startTime.split(':');
	let time2 = endTime.split(':');
	//console.log(time);
	let timetotal = (time2[0]*60 + parseInt(time2[1])) - (time[0]* 60 + parseInt(time[1]));
	//console.log(timetotal);
	return timetotal;
}

// Deze functie kan een am/pm tijd omzetten naar een 24u tijdsnotatie, deze krijg je dus al. Alsjeblieft, veel plezier ermee.
let _convertTime = (t) => {
	/* Convert 12 ( am / pm ) naar 24HR */
	let time = new Date('0001-01-01 ' + t);
	let formatted = time.getHours() + ':' + ('0' + time.getMinutes()).slice(-2);
	return formatted;
}

// 5 TODO: maak updateSun functie

// 4 Zet de zon op de juiste plaats en zorg ervoor dat dit iedere minuut gebeurt.
let placeSunAndStartMoving = ( totalMinutes, sunrise ) => {
	// In de functie moeten we eerst wat zaken ophalen en berekenen.
	let timeLeft = document.getElementsByClassName("js-time-left")[0];
	timeLeft.innerHTML = totalMinutes;

	let date = new Date();
	
	let currentTime= date.getHours().toString()+":"+date.getMinutes().toString();


	//console.log(currentHour,currentMinutes);

	// Haal het DOM element van onze zon op en van onze aantal minuten resterend deze dag.
	// Bepaal het aantal minuten dat de zon al op is.
	

	SunUpMinutes = totalMinutes - (_calculateTimeDistance(sunrise,CurrentTime));

	console.log(SunUpMinutes);
	



	// Nu zetten we de zon op de initiële goede positie ( met de functie updateSun ). Bereken hiervoor hoeveel procent er van de totale zon-tijd al voorbij is.
	// We voegen ook de 'is-loaded' class toe aan de body-tag.
	// Vergeet niet om het resterende aantal minuten in te vullen.


	// Nu maken we een functie die de zon elke minuut zal updaten
	// Bekijk of de zon niet nog onder of reeds onder is
	
	// Anders kunnen we huidige waarden evalueren en de zon updaten via de updateSun functie.
	// PS.: vergeet weer niet om het resterend aantal minuten te updaten en verhoog het aantal verstreken minuten.
}

// 3 Met de data van de API kunnen we de app opvullen
let showResult = ( queryResponse ) => {
	// We gaan eerst een paar onderdelen opvullen
	// Zorg dat de juiste locatie weergegeven wordt, volgens wat je uit de API terug krijgt.
	// Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
	let sunrise = _convertTime (queryResponse.astronomy.sunrise);
	let sunset = _convertTime(queryResponse.astronomy.sunset);
	console.log(sunrise,sunset);

	let city = queryResponse.location.city;
	let country = queryResponse.location.country;
	
	// Hier gaan we een functie oproepen die de zon een bepaalde postie kan geven en dit kan updaten.
	let totalmin = _calculateTimeDistance(sunrise,sunset);

	placeSunAndStartMoving(totalmin,sunrise);
	// Geef deze functie de periode tussen sunrise en sunset mee en het tijdstip van sunrise.
};

// 2 Aan de hand van een longitude en latitude gaan we de yahoo wheater API ophalen.
let getAPI = ( lat, lon ) => {
	// Eerst bouwen we onze url op
	const ENDPOINT = 'https://query.yahooapis.com/v1/public/yql?q=';
	// en doen we een query met de Yahoo query language
	let query = `select astronomy, location from weather.forecast where woeid in (select woeid from geo.places(1) where text="(${lat},${lon} )")`;
	// Met de fetch API proberen we de data op te halen.
	fetch(`${ENDPOINT}${query}&format=json`)
	.then(function(response){
		return response.json();
	})
	.then(function(jsonResponse){
		console.log(jsonResponse.query.results.channel);
		showResult(jsonResponse.query.results.channel)
	})
	.catch(function(error){
		console.error("Eror: ",error);
	});
	// Als dat gelukt is, gaan we naar onze showResult functie.

}

document.addEventListener( 'DOMContentLoaded', function () {
	// 1 We will query the API with longitude and latitude.
	getAPI( 50.8027841, 3.2097454 );
});
