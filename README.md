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
npm i bootstrap -S//可能还要安装jquery
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



