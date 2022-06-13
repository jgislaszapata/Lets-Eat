var locationInput = document.getElementById('location-input');
var priceLow = document.getElementById('price-low');
var priceMid = document.getElementById('price-mid');
var priceHigh = document.getElementById('price-high');
var priceMax = document.getElementById('price-max');
var generateResults = document.getElementById('search-button');
var resultsDiv = document.getElementById('results-area');

let apiKey = "sCOUHKS8zI6ZSmRRCMO3iPoVgWunRDXXHBEa6TaOSJqOAcxtj73t4_QlHGSfDXnFFGz38wgbmzC-DydKuW10RR4Fk6vAUY9zEKBf36fpG_q-UaioUK8y8rCUKSuhYnYx";
let queryURL = "https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972";
async function callAPI (){
  console.log("TEST!!!")
  const options = {
    headers:{
    contentType: "application/json",
    Authorization: `Bearer ${apiKey}`
    },
    mode: "no-cors"
  };
  const res = await fetch(queryURL,options);
  await res.json();
  console.log(res);
};
callAPI();