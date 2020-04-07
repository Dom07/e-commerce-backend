// First test code

const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const should = chai.should()

chai.use(chaiHttp)

describe('User', () => {
    // before((done) => {
    //     Customer.remove({}, error => done())
    // })

    describe('/POST customer', ()=>{
        it('it should  respond with the customer with the specific id', done => {
            chai.request(app)
            .post('/api/customer/getCustomer')
            .send({
                emailId: "dom@gmail.com",
                password: "1234"
            })
            .end((error, resp)=>{
                resp.should.have.status(200);
                resp.body.should.have.property('name').eql('puppies')
                done();
            })
        })
    })
})




