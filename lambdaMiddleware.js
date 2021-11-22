const getEnv = (key) => process.env[key]
const getRequestId = (event) => () => event["requestContext"]["requestId"]
const getBodyRequest = (event) => () => event["body"]
const getParam = (event) => (key) => event["queryStringParameters"][key]

const headers = { 
    public: {
        "Access-Control-Allow-Origin" : "*" 
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

const getResponse = (statusCode) => (headers) => (bodyObj) => {
    const body = JSON.stringify(bodyObj)
    return { statusCode, headers, body }
}

module.exports = { getEnv, getRequestId, getBodyRequest, getParam, getResponse, headers, statusCodes }