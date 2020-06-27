const express = require('express')
const router = new express.Router()
const database = require('../database/database')
const { encrypt, match } =require('../../encryption/hash')
const validator = require('validator')

const {adminPermissions} = require('../permissions')

router.post('/dashboard/seller/signup', async (req, res) => {

    //console.log(req)
    //console.log(req.body)
    //console.log(req.body.file)
    let user = req.body
    console.log(user)

    //email validation
    if (!validator.isEmail(user.email)){
        return res.send('Invalid Email')
    }
    else {
        const sellersRef = database.collection('sellers')
        const snapshot = await sellersRef.where('email','==',user.email).get()
        if(!snapshot.empty){
            return res.send('Email already exists')
        }
    }

    //Phone number validation
    if (!user.phoneNo.match(/^(00880|\+880|0)1[356789][0-9]{8}$/g)){
        return res.send('Invalid phone number')
    }else {
        const phoneno = user.phoneNo
        const newno = phoneno.substr(phoneno.length-11, phoneno.length)
        console.log(newno)
        const sellersRef = database.collection('sellers')
        const snapshot = await sellersRef.where('phoneNo','==',newno).get()
        if(!snapshot.empty){
            return res.send('Phone number already exists')
        }
        user.phoneNo = newno
    }

    //password validation
    const pass = user.password
    if(pass.length < 5 ){
        return res.send('Password is too short')
    }
    else if (pass.length > 16){
        return res.send('Password is too long')
    }
    else if (!pass.match(/^((.)*[a-z](.)*[A-Z](.)*[0-9](.)*|(.)*[a-z](.)*[0-9](.)*[A-Z](.)*|(.)*[A-Z](.)*[a-z](.)*[0-9](.)*|(.)*[A-Z](.)*[0-9](.)*[a-z](.)*|(.)*[0-9](.)*[A-Z](.)*[a-z](.)*|(.)*[0-9](.)*[a-z](.)*[A-Z](.)*)$/g)){
        return res.send('Password must contain at least one capital letter, small letter and digit')
    }


    if(user.role != null && user.role === 'Admin'){
        user.permissions = adminPermissions
    }
    else {
        user.permissions = null
    }

    user.password = await encrypt(user.password)
    user.profilePicture = null

    try {
        console.log(user)
        await database.collection('sellers').add(user)
        res.send("User signed up successfully.")
    } catch (e) {
        res.status(400).send("User sign up failed.")
        console.log(e)
    }
})

router.post('/dashboard/seller/login', async (req, res) => {

})

router.post('/dashboard/seller/logout', async (req, res) => {

})

module.exports = router
