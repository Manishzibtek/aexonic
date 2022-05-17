const express = require('express');
const UserModel = require('../model/userModel')
const mongoose = require('mongoose')
const stringFile = require('../common/string.json')
const md5 = require('md5')
const jwt = require('jsonwebtoken');
const _env = require('../middleware/config');
const {
    resolve
} = require('path');
var ObjectId = mongoose.Types.ObjectId;
module.exports = class UserController {
    static createUser(req) {
        return new Promise(async (resolve, reject) => {
            let body = req.body;
            try {
                let userCreate = await UserModel.findOne({
                    "email": body.email
                })
                if (userCreate) {
                    resolve({
                        message: stringFile.USER_ALREADY_EXISTS
                    })
                } else {
                    var user = new UserModel({
                        email: body.email,
                        password: md5(body.password),
                        firstName: body.firstName,
                        lastName: body.lastName,
                        mobileNumber: body.mobileNumber,
                        address: body.address
                    })
                    let data = await user.save();
                    if (data) {
                        return resolve({
                            message: "User created successfully"
                        })
                    }
                }

            } catch (err) {
                reject({
                    message: err.message
                })
            }
        })
    }

    static login(req) {
        return new Promise(async (resolve, reject) => {
            let body = req.body;
            try {
                var user = await UserModel.findOne({
                    "email": body.email,
                    "password": md5(body.password)
                })
                if (user == null) {
                    reject({
                        message: "user not found"
                    })
                }
                const payload = {
                    email: user.email,
                    _id: user._id
                }
                const secret = _env.jwtKey;
                const token = jwt.sign(payload, secret);
                resolve({
                    message: stringFile.SUCCESS_MESSAGE,
                    data: {
                        email: user.email,
                        _id: user._id,
                        status: stringFile.SUCCESS_STATUS_CODE,
                        token: token
                    }
                })

            } catch (err) {
                reject(err);
            }
        })
    }

    static updateUser(req) {
        return new Promise(async (resolve, reject) => {
            try {
                var id = ObjectId(req.params._id)
                var body = req.body;
                console.log(id)
                var update = await UserModel.findByIdAndUpdate({
                    _id: id
                }, {
                    $set: {
                        firstName: body.firstName,
                        lastname: body.lastName,
                        address: body.address,
                        mobileNumber: body.mobileNumber
                    }
                })
                if (update) {

                    resolve({
                        message: "user updated successfully"
                    })
                }

            } catch (err) {
                reject({
                    message: err
                })
            }
        })
    }

    static getAllUser(req) {
        return new Promise(async (resolve, reject) => {
            try {
                var skip = req.query.skip  || 0;
                var limit = req.query.limit || 10;
                console.log(skip, limit)
                var result = await UserModel.find({}).skip(skip * limit).limit(skip)
                if (result) {
                    resolve({
                        data: result
                    })
                }
            } catch (err) {
                reject({
                    message: err
                })
            }
        })
    }
    static searchUser(req) {
        return new Promise(async (resolve, reject) => {
            try {
                var skip = req.query.skip || 0;
                var limit = req.query.limit || 10;
                var firstname = req.query.firstName;
                var lastname = req.query.lastName;
                var email = req.query.email;
                var searchResult = await UserModel.find({
                    $or: [{
                            firstName: {
                                $regex:  `${firstname}`
                            },
                        },
                        {
                            lastName: {
                                $regex: `${lastname}`
                            },
                        }, {
                            email: {
                                $regex: `${email}`
                            },
                        },
                        
                    ]
                }).skip(skip * limit).limit(skip)
                if(searchResult){
                    resolve({message: searchResult})
                }
            } catch (err) {
                reject({
                    message: err
                })
            }
        })
    }

}
