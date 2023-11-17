export default function errorHanlder(res, msg = "Internal Server Error", statusCode = 500) {
    return res.status(statusCode).json({success : false, msg});
}