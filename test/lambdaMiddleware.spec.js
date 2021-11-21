const expect = require("chai").expect
const lambdaMiddleware = require("../lambdaMiddleware")

const fakeEvent = {
    "requestContext": {
        "requestId":  "id test"
    },
    "body": "body test",
    "queryStringParameters": {
        "publicKey": "public_key_test",
        "privateKey": "private_key_test"
    }
}

describe("Lambda Middleware", function() {
    beforeEach(() => {
        process.env.AWS_PublicKey = "aws_public_key_test"
        process.env.AWS_PrivateKey = "aws_private_key_test"
    })

    afterEach(() => {
        delete process.env.AWS_PublicKey
        delete process.env.AWS_PrivateKey
    })

    it("Get Envs", function () {
        const getEnv = lambdaMiddleware.getEnv
        expect(getEnv("AWS_PublicKey")).to.equal("aws_public_key_test")
        expect(getEnv("AWS_PrivateKey")).to.equal("aws_private_key_test")
    })

    it("Get Request Id", function () {
        const getRequestId = lambdaMiddleware.getRequestId(fakeEvent)
        expect(getRequestId()).to.equal("id test")
    })

    it("Get Body Request", function () {
        const getBodyRequest = lambdaMiddleware.getBodyRequest(fakeEvent)
        expect(getBodyRequest()).to.equal("body test")
    })

    it("Get Params", function () {
        const getParam = lambdaMiddleware.getParam(fakeEvent)
        expect(getParam("publicKey")).to.equal("public_key_test")
        expect(getParam("privateKey")).to.equal("private_key_test")
    })
})