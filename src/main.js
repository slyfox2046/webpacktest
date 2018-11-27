//项目js入口文件
console.log("hello webpack");
import './css/index.css'
import './css/index.scss'
import './css/index.less'

//注意：如果通过路径的形式，去引入node_modules中相关的文件，可以直接省略路径前面的node_modules 这一层目录，直接写包的名称，然后后面跟上具体的文件路径
//不写node_modules这一层目录，默认就会去node_modules中寻找
import 'bootstrap/dist/css/bootstrap.css'
