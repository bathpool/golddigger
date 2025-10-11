export function sendResponse(res, code, type, data) {
    res.statusCode = code
    res.setHeader("Content-Type", type)
    res.end(data)
}