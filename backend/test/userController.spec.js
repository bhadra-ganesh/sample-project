const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const { get_users } = require('../controllers/userControllers');
const { create_user } = require('../controllers/authControllers');
const User = require("../models/user_model");
const { userValidator } = require("../validators/body_validators");
const bodyValidators = require('../validators/body_validators');
describe('testing controllers', function() {
    afterEach(function() {
        sinon.restore();
    });

    it('should return a list of users when users exist', async () => {
        const users = [{ name: 'John Doe' }, { name: 'Jane Doe' }];
        const userMock = sinon.mock(User).expects('find').once().resolves(users);

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };

        await get_users({}, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith({
            no_of_users: users.length,
            status: "success",
            data: users,
            message: "Users fetched successfully"
        })).to.be.true;

        userMock.verify();
    });

    it('should return status 201 when creating user', async () => {
        const userData = {
            username: 'john_doe',
            email: 'john@example.com',
            password: 'password123',
            status: 'active'
        };

        const userMock = sinon.mock(User);
        userMock.expects('create').once().resolves(userData);

        const req = {
            body: userData
        };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };

        await create_user(req, res);

        expect(res.status.calledWith(201)).to.be.true;
        expect(res.json.calledWith({
            status: "success",
            data: userData,
            message: "User registered successfully",
        })).to.be.true;

        userMock.verify();
    });
    describe('testing create_user with empty fields', function() {
        afterEach(function() {
            sinon.restore();
        });
    
        it('should return status 500 when creating user with empty fields', async () => {
            const userData = {
                username: '',
                email: '',
                password: '',
                status: ''
            };
    
            // Stub the userValidator function directly
            sinon.stub(bodyValidators, 'userValidator').returns(Error({       status: "error",
                message: "\"username\" is not allowed to be empty"      }));
    
            const req = {
                body: userData
            };
    
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };
           
            await create_user(req, res);
            // console.log(res);
             expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({
                
                    status: "error",
                    message: "\"username\" is not allowed to be empty"
                
            })).to.be.true;
        });
    });

});
