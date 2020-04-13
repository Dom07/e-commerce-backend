const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../index')
const models = require('../../models/index')
const should = chai.should()

chai.use(chaiHttp)
const categories = ["Electronics", "HealthCare", "Clothing", "Entertainment"]

describe("Product", () => {
    beforeEach((done) => {
        models.Product.remove({ name: "Test Laptop" }, err => {
            done();
        })
    })

    describe("GET /api/product/getFeatured", () => {
        categories.map(category => {
            it("it should get all featured products based on " + category, (done) => {
                chai.request(app)
                    .get("/api/product/getFeatured/" + category)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.have.property("SUCCESS")
                        res.body.SUCCESS.should.be.a("array")
                        // res.body.SUCCESS.length.should.eql(5)
                        done();
                    })
            });
        })
    });

    describe("GET /api/product/:id", () => {
        it("it should return an object that describes the product", (done) => {
            chai.request(app)
                .get("/api/product/5e7fecd7e83f80ed49493109")
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

    describe("GET /api/product/getProductBySubCategory/:id", () => {
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

    describe("POST /api/product/add", () => {
        it("it should add product to the database", (done) => {
            let product = {
                name: "Test Laptop",
                description: "1 TB SSD, RTX 2080",
                price: 99,
                category: "5e7fdbd2b856e24dd80c1dcf",
                subCategory: "5e7fdf196fb4f9a851167703",
                quantity: 10,
                image: "https://cnet4.cbsistatic.com/img/vlQzy10h_O2t6OMpH7hEtKg6HVo=/1200x675/2019/11/04/c1f95af0-2ef3-41ca-b5bb-9143fce906b8/surface-laptop-3-8.jpg"
            }
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
})
