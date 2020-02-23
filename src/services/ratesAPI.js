//TODO remove proxy at some point
const PROXY = 'https://cors-anywhere.herokuapp.com/';
const URLBEGINNING = 'https://query1.finance.yahoo.com/v7/finance/chart/';
const URLENDING = '=x?indicators=close&includeTimestamps=false&range=3mo&interval=1d';

const RatesAPI = {
    getData: async(currency1='USD', currency2='CUP') => {
        try {
            return await fetch(PROXY + URLBEGINNING + currency1 + currency2 + URLENDING,)
                .then(data => data.json())
                // .then(data => this.setState({data, loading: false}))
                .then((data) => {
                        console.log('FROM RatesAPI.js', data);
                        return data;
                    }
                );
        }
        catch(e)
        {
            console.log("SOMETHING WENT WRONG BRO O_O", e);
        }
    }
};

export default RatesAPI;