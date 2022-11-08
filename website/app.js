/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();
// openWeatherMap.org api server url
const url = "https://api.openweathermap.org/data/2.5/weather?zip=";
// Personal API Key for OpenWeatherMap API
const apiKey = ',&appid=6d7f13dcd920fd66273399b61015b73f&units=metric';
// zip code
const zipCode = document.getElementById('zip');
// feelings text
const feelings = document.getElementById('feelings');
// generate button
const gen = document.getElementById('generate');
// show content
const content = document.getElementById('content');
// show temperature
const temp = document.getElementById('temp');
// show date
const day = document.getElementById('day');
// entryHolder
const entryHolder = document.getElementById('entryHolder');

// Event listener to add function to existing HTML DOM element
gen.addEventListener('click', getWetherStatus);
/* Function called by event listener */
function getWetherStatus() {
  //zip code value
  const zipValue = zipCode.value;
  //feelings value
  const feel = feelings.value;
  //getApiData promise function
  getApiData(zipValue).then((data) => {
    //check data and if found it store it
    if (data) {
      console.log(data)
      const temp = data.main.temp;
      // object that will stored in server
      const tempFeel = {
        temp: Math.round(temp), // to get integer number
        feel,
      }
      // send object to sever to store it
      postData('http://localhost:3000/add', tempFeel);
      // show data to ui
      retrieveData();
    }

  })
}
/* Function to GET Web API Data*/
const getApiData = async (zip) => {
  try {
    const response = await fetch(`${url}${zip}${apiKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  console.log(data);

  const response =await fetch(url, {
    method: 'post',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (err) {
    console.log('error:', err);
  }
}


/* Function to GET Project Data */
const retrieveData = async () => {
  const request = await fetch('http://localhost:3000/all');
  try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    temp.innerHTML ='temperature: ' + Math.round(allData.temp) + 'degrees';
    content.innerHTML ='feelings: ' + allData.feel;
    day.innerHTML ='Date: ' + newDate;

    // scrollIntoView content
    content.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }
  catch (error) {
    console.log("error", error);
  }
}