const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.statics.findByCredentials = function(email, password){
    var User = this;
    return User.findOne({email}).then(user => {
        if(!user){ return Promise.reject(); }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if(res){ resolve(user); }
                else { reject(); }
            });
        });
    });
};

userSchema.methods.generateAuthToken = function(){
    const user = this;
    const access = 'auth';
    const token = jwt.sign( {_id: user._id.toHexString(), access},
        process.env.JWT_KEY).toString();
    
    user.tokens = user.tokens.concat({access, token});
    return user.save().then(() => { return token });
};

//removes token
userSchema.methods.removeToken = function(){
    var user = this;
    return user.update({ $pull: {tokens: {token}} });
};

module.exports = mongoose.model('user', userSchema);