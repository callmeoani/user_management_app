
const { response } = require('express');
let Userdb = require('../model/model');

//create and save new user
exports.create = (req, res) => {
    //validate request
    if (!req.body) {
       return res
        .status(404)
        .send({ message: "This field cannot be empty" });
    }

    //new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })


    console.log(req.body.name);

    //save user in the database
    user //i.e the database
        .save(user) //i.e the object you wanna save
        // .then(package => package.JSON())
        .then(data => {
            // res.send(data)
            res.redirect('/')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while carrying out the operation."
            });
        });

}

//retrive and return all users/ retrieve and return a single user
exports.find = (req, res) => {

    if(req.query.id){
        //return the particular user
        const id = req.query.id;

        Userdb.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({message: `Cannot find user with such ID: ${id}`})
            
            } else {
                res.send(data)
            }
        })

        .catch(err=>{
            res.status(500).send({message: `Error retrieving use with ID: ${id}`})
        })


    } else {
        //return all users
        Userdb.find()
            .then(user => {
            res.send(user)
            })
            .catch(err => {
            res.status(500).send({message: err.message || 'Error occured while retrieving the users information.'})
    })

    }


}

//update a new identified user by user_id
exports.update = (req, res) => {
    if(!req.body){
        return res
        .status(400)
        .send({message: 'Data to update cannot be empty.'})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({messasge: `Can not update use with ${id}. Maybe user does not exist.`})
            } else {
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({message: 'Error encountered while updating user information'})
        })


}

//delete a user with specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({message: `Cannot delete thid use with id ${id}. Maybe ID is wrong.`})
        } else {
            res.send({message: 'User was deleted successfully!'})
        }
    })
    .catch(err=> {
        res.status(500).send ({
        message: `Sorry, could not delete the user with ID: ${id}.`
        });

    
    });
        
}
