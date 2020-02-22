//TODO remove proxy at some point
const PROXY = 'https://cors-anywhere.herokuapp.com/';
const URLBEGINNING = 'https://query1.finance.yahoo.com/v7/finance/chart/';
let urlMiddle = 'USDCUP';
const URLENDING = '=x?indicators=close&includeTimestamps=flase&range=3mo&interval=1d';

const API = {
    getData: async(currency1, currency2) => {
        try {
            await fetch(PROXY + URLBEGINNING + currency1 + currency2 + URLENDING, )
                .then(data => data.json())
                // .then(data => this.setState({data, loading: false}))
                .then( (data) => console.log(data)
            )
        }
        catch(e)
        {
            console.log("SOMETHING WENT WRONG BRO O_O", e);
        }
    }
};

export default API;