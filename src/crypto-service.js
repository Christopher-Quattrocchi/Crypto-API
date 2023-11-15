export default class CryptoService {
  static getCoins(coin) {
    // console.log("In weatherservice", coin);
    return fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin}&order=market_cap_desc&per_page=1&page=1&sparkline=true&price_change_percentage=24h&locale=en`) //Maybe get &precision=2 to work later
      .then(function (response) {
        if (!response.ok) {
          return response.json()
            .then(function (apiErrorMessage) {
              const errorMessage = `${response.status} ${response.statusText}
            ${apiErrorMessage.message}`;
              throw new Error(errorMessage);
            });
        } else {
          return response.json();
        }
      })
      .catch(function (error) {
        return error;
      });
  }
}
