const getEnv = (key) => process.env[key]
const getParam = (event) => (key) => event["queryStringParameters"][key]
const getRequestId = (event) => () => event["requestContext"]["requestId"]
const getBodyRequest = (event) => () => event["body"]
const getPathPart = (event) => (part) => String(event.rawPath).split("/")[part]

const headers = { 
    api: {
        json: {
            public: {
                "Access-Control-Allow-Origin" : "*",
                "Content-Type": "application/json"
            }
        }
    },
    site: {
        "Access-Control-Allow-Origin" : "*",
        "Content-Type": "text/html"
    },
    plainText: {
        public: {
            "Access-Control-Allow-Origin" : "*",
            "Content-Type": "text/plain"
        }
    }
}

const statusCodes = {
    ok: 200,
    created: 201,
    movedPermanently: 301,
    notModified: 304,
    badRequest: 400,
    unauthorized: 401,
    notFound: 404,
    serviceUnavailable: 503
}

const pathCodes = {
    service: 1,
    input: {
        a: 2,
        b: 3,
        c: 4,
        d: 5,
        e: 6,
        f: 7,
        g: 8,
        h: 9,
        i: 10
    }
}

const getResponse = (statusCode) => (headers) => (body) => {
    return { statusCode, headers, body }
}

module.exports = { getEnv, getPathPart, getRequestId, getBodyRequest, getParam, getResponse, headers, statusCodes, pathCodes }