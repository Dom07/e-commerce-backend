const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const models = require('../models')
const should = chai.should()

chai.use(chaiHttp)
const categories = ["Electronics", "Clothing", "Entertainment"]
let products = []

const getProducts = async () => {
    products = await models.Product.find({}, "_id")
}


describe("Product", () => {
    getProducts()
    describe("#4 GET /api/product/getFeatured", () => {
        categories.map(category => {
            it("it should get all featured products based on " + category, (done) => {
                chai.request(app)
                    .get("/api/product/getFeatured/" + category)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.have.property("SUCCESS")
                        res.body.SUCCESS.should.be.a("array")
                        res.body.SUCCESS.length.should.eql(5)
                        done();
                    })
            });
        })
    });

    describe("#5 GET /api/product/:id", () => {
        it("it should return an error saying product not found", (done) => {
            chai.request(app)
                .get("/api/product/5e7fecd7e83f80ed49493109")
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property("ERROR")
                    done();
                })
        })
    })

    describe("#6 GET /api/product/:id", () => {
        it("it should return a product with the given product id", (done) => {
            chai.request(app)
                .get("/api/product/" + products[Math.floor(Math.random() * products.length)]._id)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property("SUCCESS")
                    res.body.SUCCESS.should.have.property("image")
                    res.body.SUCCESS.should.have.property("review")
                    res.body.SUCCESS.should.have.property("name")
                    res.body.SUCCESS.should.have.property("description")
                    res.body.SUCCESS.should.have.property("price")
                    res.body.SUCCESS.should.have.property("quantity")
                    done();
                })
        })
    })


    describe("#7 GET /api/product/getProductBySubCategory/:id", () => {
        it("it should return a list of products based on subCategory Id", (done) => {
            chai.request(app)
                .get("/api/product/getProductBySubCategory/5e7fdf226fb4f9a851167704")
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property("SUCCESS")
                    res.body.SUCCESS.should.be.a("array")
                    done();
                })
        })
    })

    let product = {
        name: "Test Laptop",
        description: "1 TB SSD, RTX 2080",
        price: 99,
        category: "5e7fdbd2b856e24dd80c1dcf",
        subCategory: "5e7fdf196fb4f9a851167703",
        quantity: 10,
        image: "https://cnet4.cbsistatic.com/img/vlQzy10h_O2t6OMpH7hEtKg6HVo=/1200x675/2019/11/04/c1f95af0-2ef3-41ca-b5bb-9143fce906b8/surface-laptop-3-8.jpg"
    }

    describe("#8 POST /api/product/add", () => {
        it("it should add product to the database", (done) => {
            chai.request(app)
                .post("/api/product/add")
                .send(product)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('SUCCESS')
                    done();
                })
        })
    })

    describe("#9 POST /api/product/add", () => {
        it("it should throw a failed messages saying product already exists", (done) => {
            chai.request(app)
                .post("/api/product/add")
                .send(product)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('FAILED')
                    done();
                })
        })
    })

    describe("#10 POST /api/product/delete", () => {
        it("it should delete the product for the provided id", (done) => {
            models.Product.findOne({ name: "Test Laptop" }, "_id")
                .then(product => {
                    chai.request(app)
                        .delete("/api/product/delete")
                        .send({ id: product._id })
                        .end((err, res) => {
                            res.should.have.status(200)
                            res.body.should.be.a('object')
                            res.body.should.have.property('SUCCESS')
                            done();
                        })
                })
        })
    })
})
