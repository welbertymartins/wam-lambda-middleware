const expect = require("chai").expect
const lambdaMiddleware = require("../lambdaMiddleware")

const fakeEvent = {
    "requestContext": {
        "requestId":  "id test",
        "domainName": "teste.com"
    },
    "body": "body test",
    "queryStringParameters": {
        "publicKey": "public_key_test",
        "privateKey": "private_key_test"
    },
    "rawPath": "/test/15"
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

    it("Get Domain", function () {
        const getDomain = lambdaMiddleware.getDomain
        expect(getDomain(fakeEvent)).to.equal('https://teste.com')
    })

    it("Get Response", function () {
        const getResponse = lambdaMiddleware.getResponse
        expect(getResponse(lambdaMiddleware.statusCodes.ok)(lambdaMiddleware.headers.api.json.public)({ ok: true }) ).to.deep.equal({
            statusCode: 200,
            headers: { 
                "Access-Control-Allow-Origin" : "*",
                "Content-Type": "application/json"
            },
            body: { ok: true }
        })
    })

    it("Get PathParts", function () {
        const getPathPart = lambdaMiddleware.getPathPart(fakeEvent)
        const pathCodes = lambdaMiddleware.pathCodes
        expect(getPathPart(pathCodes.service)).to.equal("test")
        expect(getPathPart(pathCodes.input.a)).to.equal("15")
    })

    it("Get Params", function () {
        const getParam = lambdaMiddleware.getParam(fakeEvent)
        expect(getParam("publicKey")).to.equal("public_key_test")
        expect(getParam("privateKey")).to.equal("private_key_test")
    })

    it("Get Envs", function () {
        const getEnv = lambdaMiddleware.getEnv
        expect(getEnv("AWS_PublicKey")).to.equal("aws_public_key_test")
        expect(getEnv("AWS_PrivateKey")).to.equal("aws_private_key_test")
    })

    it("Get Headers", function () {
        const headers = lambdaMiddleware.headers
        expect(headers.api.json.public).to.deep.equal({
            "Access-Control-Allow-Origin" : "*",
            "Content-Type": "application/json"
        })
        expect(headers.site).to.deep.equal({
            "Access-Control-Allow-Origin" : "*",
            "Content-Type": "text/html"
        })
    })

    it("Get Status Codes", function () {
        const statusCodes = lambdaMiddleware.statusCodes
        expect(statusCodes.ok).to.equal(200)
        expect(statusCodes.created).to.equal(201)
        expect(statusCodes.movedPermanently).to.equal(301)
        expect(statusCodes.notModified).to.equal(304)
        expect(statusCodes.unauthorized).to.equal(401)
        expect(statusCodes.notFound).to.equal(404)
        expect(statusCodes.serviceUnavailable).to.equal(503)
    })

    it("Get Request Id", function () {
        const getRequestId = lambdaMiddleware.getRequestId(fakeEvent)
        expect(getRequestId()).to.equal("id test")
    })

    it("Get Body Request", function () {
        const getBodyRequest = lambdaMiddleware.getBodyRequest(fakeEvent)
        expect(getBodyRequest()).to.equal("body test")
    })

})