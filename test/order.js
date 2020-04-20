const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const models = require('../models/index')
const should = chai.should()

chai.use(chaiHttp)
const customer_id = "5e9d55c5011fd2ccb459ae18"
const shoppingCartId = "5e9d55c5011fd2ccb459ae04"

describe("Orders", () => {
    describe("POST /api/order/placeOrder", () => {
        it("it should place an order for the items provided", done => {
            const data = {
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
                    {
                        productId: {
                            _id: "5e9d739854a7d80f15a2f8ba"
                        },
                        quantity: 1
                    }
                ],
                customer_id: customer_id,
                shoppingCartId: shoppingCartId
            }
            chai.request(app)
                .post("/api/order/placeOrder")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property("SUCCESS")
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
})