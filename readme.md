## 前提条件

首先，你得有：
- 一个企业实名认证的腾讯云账号
- 该腾讯云账号已开通人脸核身

[点此查看开通指引](https://cloud.tencent.com/document/product/1007/30999)

其次，你要有：
- 一个小程序（可以是企业主体、个人主体、甚至是[测试号](https://developers.weixin.qq.com/miniprogram/dev/devtools/sandbox.html)，但如果你要发布，建议已认证的企业主体账号）
- 该小程序已开通云开发（如果是环境共享，需要修改本项目部分代码，可参考[此文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/resource-sharing/)）
- 已安装`微信开发者工具`和`nodejs`v10及以上版本

## 使用

### Step1 小程序代码

在页面`wxml`中使用`form`组件，在`bindsubmit`属性中绑定`submit`方法，以传递参数

|参数|类型|说明|
|---|---|---|
|Name|string|姓名|
|IdCard|string|身份证号|

[组件参考](https://developers.weixin.qq.com/miniprogram/dev/component/form.html)

### Step2 云函数配置

1. 在`/cloudfunction`文件夹右键菜单点击`新建Node.js云函数`，在`index.js`使用本项目`cloudfunction.js`的代码
2. 在云开发控制台进入云函数页面，在相应云函数那一行右侧点击`版本与配置`，进入后第一行右侧点击`配置`
3. 展开`高级配置`，配置环境变量

|Key|Value|
|---|---|
|SecretId|`腾讯云SecretId`|
|SecretKey|`腾讯云SecretKey`|

`SecretId`、`SecretKey`需要从腾讯云控制台获取，详情见：[申请安全凭证](https://cloud.tencent.com/document/api/213/30654#.E7.94.B3.E8.AF.B7.E5.AE.89.E5.85.A8.E5.87.AD.E8.AF.81)

4. 上传云函数（云端安装依赖）

### Step3 使用云函数

1. 在小程序`app.js`中使用`wx.cloud.init()`初始化云环境
2. 在页面`js`中使用本项目`miniprogram.js`的代码
3. 从返回的`res.result`中获取认证结果 [返回值说明](https://cloud.tencent.com/document/product/1007/33188#3.-.E8.BE.93.E5.87.BA.E5.8F.82.E6.95.B0)