const {User, registered} = require('../../DataBase/data')
const { v4: uuidv4 } = require('uuid');
var bcrypt = require('bcryptjs');


function ValidateEmail(email){
    var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    if(String(email).search (filter) != -1 === false){
        return 'email format not correct it requires "@"'
    }else{
        return validemail = email
    }
}


const registerHandler = async (req, reply) => {
    const {firstname, lastname, email, password1, password2} = req.body

    if (password1 !== password2){
        reply.status(403).send("password fields don't match")
    }
    const normalizeEmail = (email) => {
        return email.toLowerCase()
    } 
    normalizeEmail(email)
    ValidateEmail(email)
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash("B4c0/\/", salt, function(err, hash) {
    //         // Store hash in your password DB.
    //     });
    // });
    // const id =  uuidv4(),
    let id = uuidv4()
    data = User.push(id, firstname, lastname, validemail, password1, password2)
    reply.status(201).send(User)
};


const loginHandler = async (req, reply) => {
    let {email, password} = req.body
    let user = registered.find(e => e.email == email)
    if (!user){
        reply.status(401).send('Incorrect credentials')
    }
    if (password != user.password){
        reply.status(401).send('incorrect credentials')
       
    }
    currentUser = user
    reply.status(200).send(`user logged in`)
}

let currentUser = [

]

module.exports = {registerHandler, loginHandler}