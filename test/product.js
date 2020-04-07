const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const should = chai.should()

chai.use(chaiHttp)
const categories = ["Electronics", "HealthCare", "Clothing", "Entertainment"]

describe("Product", () => {
    describe("GET /api/product/getFeatured", () => {
        categories.map(category => {
            it("it should get all featured products based on "+category, (done) => {
                chai.request(app)
                    .get("/api/product/getFeatured/"+category)
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
})
