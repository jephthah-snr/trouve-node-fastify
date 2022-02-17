const {User} = require('../../DataBase/data')
const { v4: uuidv4 } = require('uuid');

const registerHandler = async (req, reply) => {
    const {firstname, lastname, email, password1, password2} = req.body

    if (password1 !== password2){
        reply.status(403).send("password fields don't match")
    }
    var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    if(String(email).search (filter) != -1 === false){
        return 'email format not correct it requires "@"'
    }else{
        validemail = email
    }
    // const id =  uuidv4(),
    let id = uuidv4()
    data = User.push(id, firstname, lastname, validemail, password1, password2)
    reply.status(201).send(User)
};


const loginHandler = async (req, reply) => {
    const {email, password} = req.body
    const user = User.find(e => e.email == email)
    if (!user){
        reply.status(401).send('Incorrect credentials')
    }
    if (password == user.password){
        currentUser = user
        reply.status(200).send('user logged in')
    }
}

const currentUser = [

]

module.exports = {registerHandler, loginHandler}