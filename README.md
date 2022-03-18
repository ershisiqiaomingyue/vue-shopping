前端页面使用的是[vue-store](https://github.com/hai-27/vue-store.git)

# 一、快速启动

## 1、下载yarn

```
npm install --global yarn
```

## 2、检查

``` 
yarn --version
```

## 3、导包

```
yarn install
```

## 4、本地启动

```
yarn serve
```

## 5、打包
```
yarn build
```

## 6、检查

```
yarn lint
```





# 二、项目结构

``` 
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── mock                   # 项目mock 模拟数据
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── plugins                # 全局公用方法
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   └── main.js                # 入口文件 加载组件 初始化等
├── vue.config.js              # vue-cli 配置
├── postcss.config.js          # postcss 配置
└── package.json               # package.json
```

# 三、接口文档

## 1、服务器

### 1.1、服务器地址

==后端已经放置服务器，可以进行调试==

本地：http://localhost:8000

线上：http://124.123.15.9:5000

后端：[goodsServer](https://github.com/ershisiqiaomingyue/goodsServer)

### 1.2、公共请求参数(还未实现) ×

每个api需要的Header请求头参数值（登录接口不需要）

| 参数名称   | 类型               | 是否必选 | 描述                   |
| ---------- | ------------------ | -------- | ---------------------- |
| token      | string             | Y        | 登录的token            |
| userTempId | string（uuid生成） | Y        | 未登录用户生成的临时id |

>   例如： 
>
>   token: d90aa16f24d04c7d882051412f9ec45b  后台生成
>
>   userTempId: b2f79046-7ee6-4dbf-88d0-725b1045460b 前台生成



## 2、登录接口

### 2.1、请求地址

/api/login

### 2.2、请求方式

post

### 2.3、参数类型

| 参数名称 | 类型   | 是否必选 | 描述 |
| -------- | ------ | -------- | ---- |
| account  | string | Y        | 账号 |
| password | string | Y        | 密码 |

### 2.4、返回示例：

#### 成功：

```json
{
    code:200
    message:"成功"
    data:{
    	nickName:"Administrator",
    	name:"Admin"
    	token:90aa16f24d04c7d882051412f9ec45b
	}
}
```

#### 失败：

```mysql
{
    code:201
    message:"失败"
}
```



## 3、主页接口

### ①、获取轮播图

#### 1.1接口类型

mock

#### 1.2接口地址

/banner

#### 1.3请求类型

get

#### 1.4参数类型

空



### ②、获取手机列表

#### 2.1接口地址

/api/product/phone

#### 2.2请求类型

get

#### 2.3参数类型

空





### ③、家电列表

#### 3.1接口地址

api/product/applianceList

#### 3.2请求方式

get

#### 3.3参数类型

空



### ④、生活电器的列表

#### 4.1接口地址

api/product/liveList

#### 4.2请求方式

get

#### 4.3参数类型

空

### ⑤、获取商品的分类

#### 5.1接口类型

mock

#### 5.2接口地址

/category

#### 5.3请求方式

get

#### 5.4参数类型

空

## 4、全部商品接口

### 1、获取所有商品

#### 1.1接口地址

api/product/allGoods

#### 1.2请求方式

post

#### 1.3参数类型

| 参数名称    | 参数类型 | 是否必选 | 描述                     |
| ----------- | -------- | -------- | ------------------------ |
| categoryID  | number   | N        | 商品分类id               |
| pageSize    | number   | Y        | 商品页每页显示的商品数量 |
| currentPage | number   | Y        | 当前页码                 |
| keyword     | String   | N        | 搜索条件                 |



### 2、获取点击的商品详细信息

#### 2.1接口地址

/api/product/details/${productID}

#### 2.2请求方式

get

## 5、购物车接口

### ①、添加购物车

#### 1.1接口地址

/api/shoppingCart/add

#### 1.2请求类型

post

#### 1.3参数类型

| 参数名称        | 参数类型 | 是否必选 | 描述                           |
| --------------- | -------- | -------- | ------------------------------ |
| user_id         | String   | Y        | 用户id                         |
| total_num       | number   | Y        | 添加商品到购物车的数量         |
| product_id      | String   | Y        | 商品id                         |
| product_price   | number   | Y        | 商品价格                       |
| product_picture | string   | Y        | 商品图片                       |
| product_name    | string   | Y        | 商品名字                       |
| is_checked      | Boolean  | Y        | 商品是否被勾选（用于结算界面） |

**上面这样传参，可以减少去数据库再次查找的成本**

==本处实际只需要传入:==

| 参数名称   | 参数类型 | 是否必选 | 描述     |
| ---------- | -------- | -------- | -------- |
| user_id    | String   | Y        | 用户id   |
| total_num  | number   | Y        | 商品数量 |
| product_id | String   | Y        | 商品id   |

==后面的参数可以后台去数据库中的product表查询，然后将指定字段传入参数中，再存入shoppingCart表==

### ②、添加喜欢

#### 2.1接口地址

/api/collect/add

#### 2.2请求类型

post

#### 2.3参数类型

| 参数名称              | 参数类型 | 是否必选 | 描述           |
| --------------------- | -------- | -------- | -------------- |
| user_id               | String   | Y        | 用户id         |
| product_selling_price | number   | Y        | 商品的售卖价格 |
| product_id            | String   | Y        | 商品id         |
| product_price         | number   | Y        | 商品的原本价格 |
| product_picture       | string   | Y        | 商品图片       |
| product_name          | string   | Y        | 商品名字       |

### ③、更新购物车的商品数量

#### 3.1接口地址

/api/shoppingCart/update

#### 3.2请求类型

post

#### 3.3参数类型

| 参数名称   | 参数类型 | 是否必选 | 描述           |
| ---------- | -------- | -------- | -------------- |
| user_id    | String   | Y        | 用户id         |
| product_id | String   | Y        | 商品id         |
| total_num  | number   | Y        | 商品的数量     |
| is_check   | Boolean  | Y        | 商品是否被勾选 |

### ④、删除购物车的商品

#### 4.1接口地址

/api/shoppingCart/delete

#### 4.2请求类型

post

#### 4.3参数类型

| 参数名称   | 参数类型 | 是否必选 | 描述   |
| ---------- | -------- | -------- | ------ |
| user_id    | String   | Y        | 用户id |
| product_id | String   | Y        | 商品id |

### ⑤、更新 单选

#### 5.1接口地址

/api/shoppingCart/updateCheck

#### 5.2请求类型

post

#### 5.3参数类型

| 参数名称   | 参数类型 | 是否必选 | 描述           |
| ---------- | -------- | -------- | -------------- |
| user_id    | String   | Y        | 用户id         |
| product_id | String   | Y        | 商品id         |
| index      | String   | Y        | 商品的信息     |
| is_check   | Boolean  | Y        | 商品是否被勾选 |

## 6、我的喜欢 接口

### ①、获取喜欢的商品

#### 1.1接口地址

/api/collect/get

#### 1.2请求类型

post

#### 1.3参数类型

| 参数名称 | 参数类型 | 是否必选 | 描述   |
| -------- | -------- | -------- | ------ |
| user_id  | String   | Y        | 用户id |

## 7、订单接口

### ①、发送订单请求

#### 1.1接口地址

/api/add

#### 1.2请求类型

post

#### 1.3参数类型

| 参数名称 | 参数类型 | 是否必选 | 描述                           |
| -------- | -------- | -------- | ------------------------------ |
| arr      | 数组     | Y        | 所由勾选的商品信息，为数组类型 |

### ②、获取订单

#### 2.1接口地址

/api/get

#### 2.2请求类型

post

#### 2.3参数类型

| 参数名称 | 参数类型 | 是否必选 | 描述   |
| -------- | -------- | -------- | ------ |
| user_id  | String   | Y        | 用户id |

## 8、注册 接口

### ①、用户名是否已经存在

#### 1.1接口地址

/api/user/account/exist

#### 1.2请求类型

post

#### 1.3参数类型

| 参数名称 | 参数类型 | 是否必选 | 描述 |
| -------- | -------- | -------- | ---- |
| account  | String   | Y        | 账号 |

### ②、注册

#### 2.1接口地址

/api/user/account/register

#### 2.2请求类型

post

#### 2.3参数类型

| 参数名称 | 参数类型 | 是否必选 | 描述 |
| -------- | -------- | -------- | ---- |
| aaccount | String   | Y        | 账号 |
| password | String   | Y        | 密码 |



# 四、技术栈

-   前端：Vue+vuex+vue-router+Element-ui+mockjs(模拟数据)+axios

-   后端：springboot(框架)+mybaits-plus(操作数据库)+log4j(日志)+fastjson(阿里的处理前端数据的jar包)+lombok(快速构建entity实体层)

-   数据库：mysql

