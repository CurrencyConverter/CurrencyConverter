const currencyURL = 'http://www.convertmymoney.com/rates.json';
const PROXY = 'https://cors-anywhere.herokuapp.com/';

const currencyAPI = {
    getData: async (currency1 = 'USD', currency2 = 'CUP') => {
        try {
            return await fetch(PROXY + currencyURL)
                .then(data => data.json())
                // .then(data => this.setState({data, loading: false}))
                .then((data) => {
                        console.log('FROM currencyAPI.js', data);
                        return data.rates;
                    }
                );
        } catch (e) {
            console.log("currencyAPI WENT WRONG BRO O_O", e);
        }
    }
};

export default currencyAPI;