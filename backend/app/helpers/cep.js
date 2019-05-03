const rp = require('request-promise');

function getCep(cep){    

let uri = `https://viacep.com.br/ws/${cep}/json/`;

    let options = { 
        uri : uri, 
        method : 'GET',
        json: true,
        resolveWithFullResponse: true
    };
    
    return rp(options);
};

module.exports = {
    getCep
};