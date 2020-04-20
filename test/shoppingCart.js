const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const models = require('../models/index')
const should = chai.should()

chai.use(chaiHttp)
const customer_id = "5e9d55c5011fd2ccb459ae18"
const product_id = "5e9d55c9011fd2ccb459ae24"

describe("Shopping Cart", () => {
    after(done => {
        models.ShoppingCart.findByIdAndUpdate("5e9d55c5011fd2ccb459ae04", {
            products: []
        }, {useFindAndModify: false})
        .then(() => done())
        .catch(error => console.log(error))
    })

    describe("PUT /api/shoppingCart/add", () => {
        it("it should add product to cart", (done) => {
            let data = {
                customer_id: customer_id,
                product_id: product_id
            }
            chai.request(app)
                .put("/api/shoppingCart/add")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property("SUCCESS")
                    done();
                })
        });
    });

    describe("GET /api/shoppingCart/view/:customer_id", () => {
        it("it should get all products in the cart", done => {
            chai.request(app)
            .get("/api/shoppingCart/view/"+customer_id)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.have.property("SUCCESS")
                res.body.SUCCESS.should.be.a("object")
                res.body.SUCCESS.should.have.property("shoppingCart")
                res.body.SUCCESS.shoppingCart.products.should.be.a("array")
                done();
            })
        })
    })

    describe("PUT /api/shoppingCart/removeItem", () => {
        it("it should remove an item from the cart", done => {
            chai.request(app)
            .put("/api/shoppingCart/removeItem")
            .send({
                customer_id: customer_id,
                productId: product_id
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.have.property("SUCCESS")
                done();
            })
        })
    })
})