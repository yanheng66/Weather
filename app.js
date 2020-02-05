
//page loads之后run箭头之后的function
window.addEventListener('load', ()=>{
	let long;
	let lat;
	//document.querySelector是和html里面的class互动，替换
	let temperatureDescription = document.querySelector(".temperature-description");
	let temperatureDegree = document.querySelector(".temperature-degree");
	let locationTimezone = document.querySelector(".location-timezone");
	let degreeSection = document.querySelector(".temperature");
	const degreeSpan = document.querySelector(".temperature span");

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const api = `${proxy}https://api.darksky.net/forecast/b3cc72e76ff4295c0110e0ad2267c681/${lat},${long}`;
		
			fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data => {
					console.log(data);
					// const 不能再assign其他的值
					//{}declaring objects
					//get "temperature" "summary" "icon" from API
					const { temperature, summary, icon } = data.currently;
					console.log('1111111')
					console.log(temperature)
					console.log(summary)
					console.log('22222') 
					//Set DOM Elements from API
					temperatureDegree.textContent = temperature;
					temperatureDescription.textContent = summary;
					locationTimezone.textContent = data.timezone;
					//set icon (call the fuction)
					setIcons(icon, document.querySelector(".icon"));

					//formula to celsius
					let celsius = (temperature - 32)*(5/9)

					//change temperature to Celsius/Farenheit
					degreeSection.addEventListener('click', () =>{
						if(degreeSpan.textContent === "F"){
							degreeSpan.textContent = "C";
							temperatureDegree.textContent = Math.floor(celsius);
						}else{
							degreeSpan.textContent = "F";
							temperatureDegree.textContent = temperature;
						}
						});
				});
		});

	}
	//以下关于小天气图标skycon
	//每个小skycon有自己的id
	function setIcons(icon, iconID){
		const skycons = new Skycons({"color": "pink"});
		//replace every "-" by "_"
		//因为darksky里面icon两个词间隔是- 但是skycon里面的间隔是_
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}

});