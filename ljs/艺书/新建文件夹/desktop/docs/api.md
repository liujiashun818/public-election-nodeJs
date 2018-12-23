# 全局对象

1. window.currentUser

这个对象包含
> publicKey 字符串
> username  创建或者登录时候输入的用户名
> getSeed函数，需要密码，返回原始seed
> getPrivateKey函数，需要密码，返回原始私钥
> getAddress函数，调用js-sdk，得到地址，传入的公钥形式是 hex 字符串，例如
  `f04488824fc92fb30ff966a92deafec4aa4c586a6d42a590565ceb2a9ae638f8` 