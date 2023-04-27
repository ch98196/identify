const tencentcloud = require("tencentcloud-sdk-nodejs-faceid")
const FaceidClient = tencentcloud.faceid.v20180301.Client;

// 云函数入口函数
exports.main = async (event) => {
    const secretId = process.env.SecretId
    const secretKey = process.env.SecretKey
    const clientConfig = {
        credential: {
            secretId: secretId,
            secretKey: secretKey,
        },
        profile: {
            httpProfile: {
                endpoint: "faceid.tencentcloudapi.com",
            },
        },
    };

    const client = new FaceidClient(clientConfig);
    const params = {
        "Name": event.Name,
        "IdCard": event.IdCard
    };
    const result = client.IdCardVerification(params).then(
        (data) => {
            data.info = event
            console.log(data);
            return data
        },
        (err) => {
            console.error(err);
            return {
                data: {
                    Description: '系统错误',
                    Result: 'error'
                }
            }
        }
    );
    return result
}