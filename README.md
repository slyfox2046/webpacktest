# Webpack 学习

[TOC]

------



### 一、01.复习-webpack基本配置1

视频：[01复习-webpack基本配置1](https://www.bilibili.com/video/av27969216/?p=102)

安装

```js
npm init -y //init package.json
npm i webpack-dev-server webpack webpack-cli -D

npm i html-webpack-plugin -D //安装html-webpack-plug插件

```



运行后生成的js到‘/’根路径

![afaf](https://www.jianguoyun.com/c/tblv2/CK-VGhIgmJw47OeT270uIqk0X3Ph8lczHdHcMaPfeHoI694Gdwk/DOUxE_SD-Jg/l)



### 二、02.复习-webpack基本配置2

视频：[02复习-webpack基本配置2](https://www.bilibili.com/video/av27969216/?p=103)

 **html-webpack-plugin 插件安装**

```js
npm i html-webpack-plugin -D //安装插件
```

​	

![img](https://www.jianguoyun.com/c/tblv2/CK-VGhIgaPcstQ1hU2hAPPJqZy5_1y9_2Trg__qq0UA-2OgITcE/Q9CsnjvdYq0/l)

提示无法处理index.css，需要安装loader

**处理css、sass、less安装loader**

```js
npm i style-loader css-loader -D 
npm i less-loader less  -D

npm i sass-loader -D
npm i node-sass -D

```



### 三、03.webpack中处理url-loader的使用

视频：[03.webpack中处理url-loader的使用](https://www.bilibili.com/video/av27969216/?p=104)

默认情况下，webpack无法处理css中的url地址，不管事图片还是字体库，只要是url地址，都处理不了

```scss
html,body{
  .box{
    width: 220px;
    height: 120px;
    background: url("../images/dog.jpg");
    background-size: cover;
    //background-color: red;
  }
}
```

显示错误：

![](https://www.jianguoyun.com/c/tblv2/CLCVGhIgW4s56ihbPahVvs7Zg3d_6E7XOZL4J2Boy7nZCmaFAmY/39YK2tXMtxc/l)

需要安装url-loader，url-loader内部依赖file-loader ，一起安装

```javascript
npm i url-loader file-loader -D
```

配置见webpack.config.js

```js
//module:rules:[] 中
{test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader'},//处理图片路径url链接的loader
```

url转码base64

```scss
html .box, body .box {
    width: 220px;
    height: 120px;
    background: url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgK…4NuJpBIryFhnoa7i244HSlSquS1MKtJRehZpKQk00mui5jYccUxuKMmmsTSbGkFFMzRU3Lsf/Z);
    background-size: cover;
}
```

可以增加参数：limit,限制要转码的文件大小

```JS
//module:rules:[] 中
{test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=111'},//处理图片路径url链接的loader（limit限制转换成base64文件的大小）
```



增加参数name，可以引用原来的名称

```JS
//module:rules:[] 中            
{test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=111&name=[hash:8]-[name].[ext]'},//处理图片路径url链接的loader
            //limit给定的值，是图片的大小，单位是byte，如果我们引用的图片，大于或等于给定的limit值，则不会被转为base64格式的字符串，
            // 如果图片小于给定的limit值，则会被转为base64的字符串

            //name参数给定后，图片名称用原来的名称(name)和后缀(ext),(hash)值取前8位，防止应用不同目录中的相同文件名称
```



### 四、04.webpack中使用url-loader处理字体文件

视频：[04.webpack中使用url-loader处理字体文件](https://www.bilibili.com/video/av27969216/?p=105)

安装：bootstrap

```js
npm i bootstrap --save -D//可能还要安装jquery
```



index.html中添加代码：

```HTML
<sapn class="glyphicon glyphicon-heart" aria-hidden="true"></sapn>
```



main.js中代码

```js
//注意：如果通过路径的形式，去引入node_modules中相关的文件，可以直接省略路径前面的node_modules 这一层目录，直接写包的名称，然后后面跟上具体的文件路径
//不写node_modules这一层目录，默认就会去node_modules中寻找
import 'bootstrap/dist/css/bootstrap.css'
```



webpack.config.js添加代码

```js
//添加对字体文件的处理，否则也会报错：
//ERROR in ./node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf 1:0
//Module parse failed: Unexpected character ' ' (1:0)

{test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},//处理字体文件的loader
```



### 五、05.关于webpack和npm中几个问题的说明

视频：[05.关于webpack和npm中几个问题的说明](https://www.bilibili.com/video/av27969216/?p=106)

1. **json文件中不能写注释**

   ```json
   json文件中不能写注释，下面注释会报错
   //"test": "echo \"Error: no test specified\" && exit 1", 
   ```

2. **'wepack-dev-server'不是内部或外命令，也不是可运行的程序**

   ```js
   npm i //
   或
   npm i webpack-dev-server -D //本地安装
   ```

3. **装包装一半** 

   最好把原来node_modules目录删除，重新装一下



### 六、06.webpack中的babel的配置

视频：[06.webpack中的babel的配置](https://www.bilibili.com/video/av27969216/?p=107)

main.js添加代码：

```js
//class关键字，是ES6中提供的新语法，是用来实现ES6中面向对象编程的方式
class Person {
    //使用static关键字，可以定义静态属性
    //所谓的静态属性，就是可以直接通过类名，直接访问的属性
    //实例属性：只能通过类的实例，来访问的属性，叫做实例属性
    static info = {name:"张三",age:20}

}
//java c#实现面向对象的方式完全一样了，class是从后端语言中借鉴过来的
var p1 = new Person();
```



npm run dev 后报错，缺少loader：

==Module parse failed: Unexpected token (16:16)==
==You may need an appropriate loader to handle this file type.==



**通过babel，可以帮我们将高级的语法转换为低级的语法**

1. 在webpack中，可以运行如下两套命令，安装两套安装包，去安装babel相关的loader功能：

   1.1第一套包：npm i babel-core babel-loader babel-plugin-transform-runtime -D

   1.2第二套包：npm i babel-preset-env babel-preset-stage-0 -D

   ==实际安装后包的版本之间冲突，参考以下版本：==

   ```json
       "babel-core": "^6.22.1",
       "babel-loader": "^7.1.1",
       "babel-plugin-transform-runtime": "^6.23.0",
       "babel-preset-env": "^1.7.0",
       "babel-preset-stage-0": "^6.24.1",
   ```

2. 打开webpack的配置文件，在module节点下的rules数组种，添加一个新的匹配规则：

   2.1{test:/\.js$/,use :'babel-loader',exclude:/node_modules/}

   webpack.config.js中：

   ```js
   {test:/\.js$/,use :'babel-loader',exclude:/node_modules/}//配置babel来转换高级的ES语法
   ```



   2.2注意：在配置babel的loader规则的时候，必须把node_modules目录，通过exclude选项排除掉，原因有俩:	

   2.2.1 如果不排除node_modules，则bable会把node_modules中所有的第三方js文件，都打包编译，这样，会非常消耗cpu，同时打包速度非常慢

   2.2.2 哪怕最终babel把所以node_modules中的js转换完毕了，但是项目也无法正常运行！

3. 在项目的根目录中，新建一个叫做.babelrc的babel配置文件，这个配置文件属于json格式，所以在写.babelrc配置的时候，必须符合json语法规范，不能写注释，字符串必须用双引号

   3.1在.babelrc写如下配置

   {

   ​     "presets":["env","stage-0"],

   ​     "plugins":["transform-runtime"]

    }

   ```json
   {
     "presets":["env","stage-0"],
     "plugins":["transform-runtime"]
   }
   ```

4. 了解：目前，我们安装的babel-preset-env,是比较新的ES语法，之前，我们安装的是babel-preset-es2015,现在出了一个更新的语法插件，叫做babel-preset-env，它包含了所有的和es***相关的语法






















### 附件：

**webpack.config.js 配置文件**

```js
//由于webpack是基于node进行构建的，所以webpack的配置文件中，任何合法的node代码都是支持的
var path = require("path");

//在内存中，根据指定的模板页面，生成一份内存中的首页，同时自动把打包好的bundle注入到页面底部
//如果要配置插件，需要在导出的对象中，挂载一个plugins节点
var htmlWebpackPlugin = require("html-webpack-plugin");

//当以命令行形式webpack 或 webpack-dev-server的时候，工具会发现，我们并没有提供要打包的文件的入口和出口文件，
// 此时，他会检查项目根目录中的配置文件，并读取这个文件，就拿到了导出的这个配置对象，然后根据这个对象，进行打包构建
module.exports = {
    entry: path.join(__dirname,'./src/main.js') , //人口文件
    output: {
        path:path.join(__dirname,'./dist'),//输出路径
        filename: 'bundle.js' //输出文件名
    },

    //此处添加plugin插件
    plugins:[//所有webpack插件的配置节点
        new htmlWebpackPlugin({
            template: path.join(__dirname,'./src/index.html'),//指定模板文件路径
            filename :"index.html" //设置生成的内存页面名称
        })
    ],

    //处理css，less，scss模块的loader
    module:{//配置第三方loader模块的
        rules:[//第三方模块的匹配规则
            {test:/\.css$/,use:['style-loader','css-loader']},//处理css文件的loader,注意loader顺序
            {test:/\.less/,use:['style-loader','css-loader','less-loader']},//处理less的loader
            {test:/\.scss/,use:['style-loader','css-loader','sass-loader']},//处理scss的loader

            {test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=111&name=[hash:8]-[name].[ext]'},//处理图片路径url链接的loader
            //limit给定的值，是图片的大小，单位是byte，如果我们引用的图片，大于或等于给定的limit值，则不会被转为base64格式的字符串，
            // 如果图片小于给定的limit值，则会被转为base64的字符串

            //name参数给定后，图片名称用原来的名称(name)和后缀(ext),(hash)值取前8位，防止应用不同目录中的相同文件名称

            {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},//处理字体文件的loader
        ]
    }
}

//


```



**index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <!--<script src="/bundle.js"></script>-->
    <!--<link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.css">-->
</head>
<body>
<div class = "box"></div>
<div class = "box2"></div>
<span class="glyphicon glyphicon-asterisk" aria-hidden="true"></span>
<span class="glyphicon-class">glyphicon glyphicon-asterisk</span>
</body>
</html>
```

**main.js**

```JS
//项目js入口文件
console.log("hello webpack");
import './css/index.css'
import './css/index.scss'
import './css/index.less'

//注意：如果通过路径的形式，去引入node_modules中相关的文件，可以直接省略路径前面的node_modules 这一层目录，直接写包的名称，然后后面跟上具体的文件路径
//不写node_modules这一层目录，默认就会去node_modules中寻找
import 'bootstrap/dist/css/bootstrap.css'

//class关键字，是ES6中提供的新语法，是用来实现ES6中面向对象编程的方式
class Person {
    //使用static关键字，可以定义静态属性
    //所谓的静态属性，就是可以直接通过类名，直接访问的属性
    //实例属性：只能通过类的实例，来访问的属性，叫做实例属性
    static info = {name:"张三",age:20}

}

//通过babel，可以帮我们将高级的语法转换为低级的语法
//1.在webpack中，可以运行如下两套命令，安装两套安装包，去安装babel相关的loader功能：
//1.1第一套包：npm i babel-core babel-loader babel-plugin-transform-runtime -D
//1.2第二套包：npm i babel-preset-env babel-preset-stage-0 -D
//2.打开webpack的配置文件，在module节点下的rules数组种，添加一个新的匹配规则：
//2.1{test:/\.js$/,use :'babel-loader',exclude:/node_modules/}
//2.2注意：在配置babel的loader规则的时候，必须把node_modules目录，通过exclude选项排除掉，原因有俩：
//2.2.1 如果不排除node_modules，则bable会把node_modules中所有的第三方js文件，都打包编译，这样，会非常消耗cpu，同时打包速度非常慢
//2.2.2 哪怕最终babel把所以node_modules中的js转换完毕了，但是项目也无法正常运行！
//3.在项目的根目录中，新建一个叫做.babelrc的babel配置文件，这个配置文件属于json格式，所以在写.babelrc配置的时候，必须符合json语法规范，不能写注释，字符串必须用双引号
//3.1在.babelrc写如下配置
// {
//     "presets":["env","stage-0"],
//     "plugins":["transform-runtime"]
// }
//4.了解：目前，我们安装的babel-preset-env,是比较新的ES语法，之前，我们安装的是babel-preset-es2015,现在出了一个更新的语法插件，叫做babel-preset-env，它包含了所有的和es***相关的语法

//java c#实现面向对象的方式完全一样了，class是从后端语言中借鉴过来的
var p1 = new Person();
console.log(Person.info);

```

index.css

```CSS
html,body{
    margin:0;
    padding:0;
    background-color: cyan;

}
```



index.scss

```SCSS
html,body{
  .box{
    width: 220px;
    height: 120px;
    background: url("../images/dog.jpg");
    background-size: cover;
    //background-color: red;
  }
  .box2{
    width: 220px;
    height: 120px;
    background: url("../images2/dog.jpg");
    background-size: cover;
    //background-color: red;
  }

}
```



package.json

```js
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    //浏览器打开，port:3000 ,基础目录src ，hot热启动
    "dev": "webpack-dev-server --open --port 3000 --contentBase src  --hot"
  },
      ...
 "devDependencies": {
    "babel-core": "^6.22.1",
    "babel-loader": "^7.1.1",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-env": "^1.7.0",
    "babel-preset-stage-0": "^6.24.1",
    "bootstrap": "^3.3.7",
    "css-loader": "^1.0.1",
    "file-loader": "^2.0.0",
    "less": "^3.8.1",
    "less-loader": "^4.1.0",
    "node-sass": "^4.10.0",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "url-loader": "^1.1.2",
    "webpack": "^4.26.1",
    "webpack-cli": "^3.1.2",
    "webpack-dev-server": "^3.1.10"
  },
  "dependencies": {
    "bootstrap": "^3.3.7"
  }
```



.babelrc

```JSON
{
  "presets":["env","stage-0"],
  "plugins":["transform-runtime"]
}
```

