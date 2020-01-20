const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports={
    async index(request, response){
        console.log(request.query);

        const {latitude, longitude, conhecimentos} = request.query;

        const conhecimentosArray = parseStringAsArray(conhecimentos);
       
        const devs = await Dev.find({
            conhecimentos: {
                $in: conhecimentosArray,
            },
            location: {
                $near: {
                $geometry:{
                    type: 'Point',
                    coordinates: [longitude, latitude],
                 },
                $maxDistance: 10000,
                 },
            },
        });
        //Buscar desenvolvedores em um raio de 10km
        //Filtrar por conhecimentos
        return response.json({ devs });
    }
}