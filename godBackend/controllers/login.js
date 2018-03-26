const userModel = require('../models/users');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
//var jwt = require('jwt'), payload = {
//        scope: 'client:outgoing?clientName=matt',
//        iss: 'APP_SID',
//        expires: Math.round((new Date().getTime()/1000)) + 3600
//    },
//    token = new jwt.WebToken(JSON.stringify(payload), JSON.stringify({typ:'JWT', alg:'HS256'}));

module.exports = {

    getConnectedUser: (req, res, next) => {

        userModel.getUserByName(req.body.name).then(result => {
            let salt = bcrypt.genSaltSync(10);
            const encryptPw = bcrypt.hashSync(req.body.password, salt);
            const bool = bcrypt.compareSync(req.body.password, encryptPw);
            if (bool){
                //console.log(token.serialize('hmackey'));
                crypto.randomBytes(48, function(err, buffer) {
                    res.send("token : " + buffer.toString('hex') + "\nOui c'est pas secure mais je règle ca après !");
                });
            } else {
                res.send("wrong_password")
            }

        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    }
};