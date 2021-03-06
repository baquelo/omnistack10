const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index (request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store (request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }
    
        return response.json(dev);
    },

    async update(request, response) {
        const { id } = request.params;
        const { name, techs, bio, latitude, longitude, avatar_url } = request.body;

        const techsArray = parseStringAsArray(techs);

        const dev = await Dev.findOne({_id: id});

        dev.name = name;
        dev.bio = bio;
        dev.location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };
        dev.avatar_url = avatar_url;
        dev.techs = techsArray;

        dev.save();

        return response.json(dev);
    },

    async destroy(request, response) {
        const { id } = request.params;

        const dev = await Dev.findOne( { _id: id });

        dev.remove();

        return response.json(dev);
    },
};