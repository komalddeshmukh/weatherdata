//get the countries data

let url = "https://restcountries.com/v2/all"

//creat a function with name getUser
async function getUser() {
    let users;
    try {

        const data = await fetch(url, {
            method: "GET",
            header: {
                "content-type": "application/json;"
            }
        })
        users = await data.json() //check data recived in console or not
        // console.log(users);
    } catch (err) {
        console.log(err);
    }
    return users;
}
//getCountry()

//display the data from getUser to diplay user using DOM
async function displayUser() {
    let users = await getUser()
    //console.log(users)



    users.forEach((user, ind) => {
        const div = document.createElement("div");
        div.className = "col-lg-4"
        //console.log(user); //get data in console so not problem
        div.innerHTML += ` 
        
        <div class="text-center">
        <span class="border border-secondary">
        <div class="user-container">
          <h1>${user.name}</h1>
           <img class="user-flags" src="${user.flags.png}">
           <h3> ${user.capital}<h3>
            <h3> ${user.region}<h3>
            <h3> ${user.latlng}<h3>
            <h3> ${user.numericCode}<h3>
             <button class="btn btn-primary"  type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample${ind}" aria-expanded="false" aria-controls="collapseExample"  onclick="weatherData()">
               Click for Weather
              </button>
             <div class="collapse mydiv" id="collapseExample${ind}">
               This is the text where weather data is to be displayed.
              <div class="info">
             </div>
        </div> 
          
    </div>
    </span>
    </div>


    
      `
        async function getWeather() {
            let weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${user.capital}&appid=7ae326a7b1cfa067b29e76c1850b3397`)
            const res = await weatherData.json()
            // console.log(res);

            localStorage['jsonData'] = JSON.stringify(res);
            const getClass = document.querySelector(`#collapseExample${ind}`);

            getClass.innerHTML = `<p class="card-text">Humidity:${res.main.humidity}</p>
                                   <p class="card-text">Temperature:${res.main.temp}</p>
                                   <p class="card-text">Pressure:${res.main.pressure}</p>
                                   <p class="card-text">Visibility:${res.visibility}</p>                                                                
                                  `
        }
        document.querySelector(".row").appendChild(div);

        getWeather() //calling function to get weather
    })
}

displayUser();



