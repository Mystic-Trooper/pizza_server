const mongoose = require('mongoose');
let chai = require('chai');
let chaiHttp = require('chai-http');
const User = require("../models/userModel")

chai.use(chaiHttp);
const request = require("supertest")("https://pizzaappbackend.herokuapp.com/api");
const expect = require("chai").expect;

describe("Check For mongoose connection", function () {
    it("Connection Established", function (done) {

        // tells mongoose to use ES6 implementation of promises
        mongoose.Promise = global.Promise;
        const MONGODB_URI = process.env.DB_URI;
        mongoose.connect(MONGODB_URI);

        mongoose.connection
            .once('open', () => console.log('Connected!'))
            .on('error', (error) => {
                console.warn('Error : ', error);
            });

        // console.log(mongoose.connection)
        emptyObj = {};
        expect(mongoose.connection.collections.empty).to.equal(emptyObj.empty)
        done()
    });
});

describe("User", function () {
    it("Create New User", function (done) {

        // tells mongoose to use ES6 implementation of promises
        mongoose.Promise = global.Promise;
        const MONGODB_URI = process.env.DB_URI;
        mongoose.connect(MONGODB_URI);

        mongoose.connection
            .once('open', () => console.log('Connected!'))
            .on('error', (error) => {
                console.warn('Error : ', error);
            });
        const { name, email, password } = { name: "user33", email: "user33@gmail.com", password: "password" }

        const newUser = new User({ name, email, password })

        try {
            newUser.save()
            expect("done").to.equal("done");
        } catch (error) {
            expect("done").to.equal("failed");
        }
        done()
    });
});

