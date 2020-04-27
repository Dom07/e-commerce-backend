const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const models = require('../models/index')
const should = chai.should()

chai.use(chaiHttp)
const customer_id = "5e9d55c5011fd2ccb459ae18"
const shoppingCartId = "5e9d55c5011fd2ccb459ae04"
const payload = {
    shippingAddress: "1 East Street",
    totalPrice: 500,
    cardHolderName: "Tom Hanks",
    cardNumber: "29012300003491",
    expiryDate: new Date("January 20, 2023 00:00:00"),
    CVV: 213,
    products: [
        {
            productId: {
                _id: "5e9d6785e8978ff4acab6917",
            },
            quantity: 1
        },
    ],
    customer_id: customer_id,
    shoppingCartId: shoppingCartId
}

describe("Orders", () => {
    describe("#1 POST /api/order/placeOrder", () => {
        it("it should place an order for the items provided", done => {
            chai.request(app)
                .post("/api/order/placeOrder")
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property("SUCCESS")
                    res.body.should.have.property("MESSAGE")
                    chai.request(app)
                        .get("/api/shoppingCart/view/" + customer_id)
                        .end((err, res) => {
                            res.should.have.status(200)
                            res.body.should.have.property("SUCCESS")
                            res.body.SUCCESS.should.be.a("object")
                            res.body.SUCCESS.should.have.property("shoppingCart")
                            res.body.SUCCESS.shoppingCart.products.length.should.eql(0)
                            done();
                        })
                })
        })
    })

    describe("#2 POST /api/order/placeOrder", () => {
        it("it should throw an error saying product is out of stock", done => {
            chai.request(app)
                .post("/api/order/placeOrder")
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property("FAILED")
                    res.body.should.have.property("MESSAGE")
                    res.body.MESSAGE.should.be.a("array")
                    done();
                })
        })
    })

    describe("#3 GET /api/order/getOrders/:customerId", () => {
        it("it should fetch all the orders placed by the user", done => {
            chai.request(app)
            .get("/api/order/getOrders/"+customer_id)
            .end((err, res) => {
                res.body.should.have.property("SUCCESS")
                res.body.SUCCESS.should.have.property("order")
                res.body.SUCCESS.order.should.be.a("array")
                done();
            })
        })
    })
})