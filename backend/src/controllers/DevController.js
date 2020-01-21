const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

//idex, show, update, destroy

module.exports = {

    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store (request, response) {
        const { github_username, conhecimentos, latitude, longitude } = request.body;
    
        //verificar se já existe um DEV cadastrado com essess dados. 
        let dev = await Dev.findOne({ github_username });
        
        if (!dev){

        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
        let {name = login , avatar_url, bio} = apiResponse.data;
    
        const conhecimentosArray = parseStringAsArray(conhecimentos);
    
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        }
    
        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            conhecimentos: conhecimentosArray,
            location,
        })
    }  
    
        return response.json(dev);
    },
    
    async update (){

    },

    async destroy(){

    },
};