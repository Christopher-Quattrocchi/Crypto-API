import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CryptoService from './crypto-service.js';
import Chart from 'chart.js';

// Business Logic

function getCoins(coin) {
  CryptoService.getCoins(coin)
    .then(function (response) {
      if (response.length > 0 && response[0].id === coin) {
        printElements(response[0], coin);
      } else {
        printError(response, coin);
      }
    });
}

function createChart(dataPoints, coin) {
  console.log("In createChart, dataPoints", dataPoints);
  console.log("In createChart, coin", coin);
  if (!dataPoints || !Array.isArray(dataPoints) || dataPoints.length === 0) {
    console.error("Invalid or empty dataPoints array");
    return;
  }

  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: dataPoints.length}, (_, i) => i),
      datasets: [{
        label: `${coin} Price over the last 7 Days`,
        data: dataPoints,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}


// UI Logic

function printElements(coinData, coin) {
  // const coinData = response[coin].usd; 
 console.log("In printElements", coinData);
 
  let sparklineArray = coinData.sparkline_in_7d.price;
  console.log("In printElements", sparklineArray);
  
  document.querySelector('#showResponse').innerText = `Coin is: ${coin}.
  The exchange rate of your chosen Cryptocurrency is ${coinData.current_price} dollars. The market cap is $${coinData.market_cap}. Trading volume over the last 24 hours is: $${coinData.total_volume}. The change in price over the last 24 hours is %${coinData.price_change_percentage_24h}`; 
  createChart(sparklineArray, coin);
}

function printError(error, coin) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the Cryptocurrency data for ${coin}: ${error}.`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  // debugger;
  const coin = document.querySelector('#cryptocurrency').value.toLowerCase();
  
  console.log(coin);
  getCoins(coin);
}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
