const axios = require('axios');
const Dev = require('../Models/DevModels')
module.exports = {

    async index(req, res) {
        const {loggedUserId} = req.body;
        const loggedDev = await Dev.findOne({_id: loggedUserId})
        const users = await Dev.find({
            $and: [
                { _id: { $ne: loggedDev._id } },
                { _id: { $nin: loggedDev.likes } },
                { _id: { $nin: loggedDev.dislikes } },
            ],
            })

        return res.json(users)
    },

    async like (req, res) {
        const {targetUserId, loggedUserId} = req.body;
        const loggedDev = await Dev.findOne({_id: loggedUserId})
        const targetDev = await Dev.findOne({_id: targetUserId})
        if(targetDev){
            loggedDev.likes.push(targetDev._id)
            await loggedDev.save();
            if(targetDev.likes.includes(loggedDev._id)){
                req.io.to(loggedDev.SocketId).emit('match',targetDev)
                req.io.to(targetDev.SocketId).emit('match',loggedDev)
            }else{
                return res.json(loggedDev)
            }

        }else{
            return res.status(400).json({err: 'Dev not found'})
        }
    },
    async dislike (req, res) {
        const {targetUserId, loggedUserId} = req.body;
        const loggedDev = await Dev.findOne({_id: loggedUserId})
        const targetDev = await Dev.findOne({_id: targetUserId})
        if(targetDev){
            loggedDev.dislikes.push(targetDev._id)
            await loggedDev.save();

            return res.json(loggedDev)
        }else{
            return res.status(400).json({err: 'Dev not found'})
        }
    },

    async store (req, res ) {
        const {username} = req.body;
        const userExists = await Dev.findOne({username: username.toLowerCase()});
        if( userExists ){
            return res.json(userExists);
        }else{
            try {
                const response = await axios.get(`https://api.github.com/users/${username}`);
                const dev = await Dev.create({    
                name: response.data.name,
                username,
                avatar: response.data.avatar_url,
                bio:response.data.bio,
            });
                return res.json(dev);
                
            } catch (error) {
                return res.status(404).json({message:'Dev not found'})
            }
            

           
        }
       
    }

};