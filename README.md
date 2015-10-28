# koa grunt webpack react构建的一个项目

> ### 目录结构

```
	├── Gruntfile.js 				  # grunt任务,主要用来实时编译jsx,供后台渲染react模块使用
	├── README.md
	├── dist						  # 前台静态文件build的目标目录
	│   ├── css						  # 每个页面对应的入口css page1.html 就对应 build后的 page1.css
	│   │   ├── page1.css
	│   │   └── page1.css.map
	│   ├── img 					  # 通过 webpack 的 fileloader 生成的过来的图片
	│   │   └── hello_test.jpg
	│   └── js 						  # 通过 webpack 的 entry 配置 生成每个页面的 入口 js
	│       ├── page1.js
	│       ├── page1.js.map
	│       ├── page2.js
	│       └── page2.js.map
	├── package.json 				  # npm 模块依赖 以及项目的信息
	├── routes 						  # 路由
	├── server.js 					  # koa 项目启动的入口文件 node server.js 或 用pm2启动
	├── static 						  # 前台静态文件的source目录
	│   ├── css 					  # 存放一些公共的样式，这里用的 stylus 例如 公共样式 
	│   │   └── test.styl
	│   ├── img                       # 存放项目的一些公共背景，图标，button，icon
	│   │   └── test.jpg
	│   └── js 						  # 存放react模块，以及页面的入口jsx文件
	│       ├── components            # 存放一些共用的组件， 像 日历 选项卡 什么的
	│       │   ├── hello
	│       │   │   ├── hello_test.jpg
	│       │   │   ├── index.js
	│       │   │   ├── index.jsx
	│       │   │   ├── list.jade
	│       │   │   └── test.styl
	│       │   └── world
	│       │       ├── index.js
	│       │       └── index.jsx
	│       ├── lib                   # 如果不用bowser 作为前台的npm的话，可以把公共库放在里面，例如jquery
	│       ├── modules               # 存放一些 页面带业务逻辑的 模块 例如header footer list列表， 他们由 components
	│       │   └── header              以及一些 业务逻辑构成
	│       │       ├── index.js
	│       │       └── index.jsx
	│       └── page                  # 页面的入口文件，页面的入口文件由若干个 modules 页面模块组成
	│           ├── page1.js
	│           ├── page1.jsx
	│           ├── page2.js
	│           └── page2.jsx
	├── views                         # 存放 koa 的视图文件, 这里使用的jade 作为模板
	│   ├── index.jade
	│   └── index2.jade
	└── webpack.config.js
```

> ### 环境依赖

```
1. 建议nodejs 的版本 >4.0 这样就可以完全使用 es6的语法 
   之前的 0.11.13 的版本我也测过也可以使用。

2. 执行 npm install 下载项目的依赖

3. node server.js

```

> ### 说明

```
项目模板还在逐渐完善中，现在是这个项目模板主要以说明怎么搭建react开发环境的完整流程

```

> ### 目录结构构建详细说明

```
1. 首先react的jsx 语法 类似  <input type="text" ref="myTextInput" /> 解析肯定会报错
   所以首先要通过 webpack 的 loaders 把 上面的语法 转成 js 的语法 类似 
   React.createElement("input", {type: "text", ref: "myTextInput"})

2. webpack 是一种项目的构建工具， 如果你原来熟悉 grunt , gulp的话。你就应该知道构建工具
   所要做的就是编译，合并，压缩，把src目录的文件build后生成到dist目录。webpack的目的也是
   如此，不过他的性能和速度可能要比你自己构建逻辑要稍微快一点，因为你不用考虑哪些未改动的
   文件是否需要重新编译合并压缩，他会自动帮你计算这些，而你所要做的就是为改动哪些使用哪些
   loader做一些简单的配置。而且他也帮我们实现了amd 和 cmd 也就是说 可以直接在前台的 js
   文件中写 require, 通过 babel loader的话 也可以使用 jsx 和 es6的语法。这样前后台就统一
   了写法。这里指的统一是指后台使用的nodejs。所以可以直接这样写:
   var React = require('react');
   var Hello = require('../../components/hello/index.js');
   var World = require('../../components/world/index.js');
   react 模块 webpack会默认从 node_modules目录里面寻找, 也可以配置其他目录。
   这样对于用惯了 require.js 和 sea.js 的 人来说 就可以不用写 define了
   页面也不需要引入 require.js 或者 sea.js了. webpack的 babel-loader 在编译的过程中
   会帮我们实现一套前台的require机制。

3. 因为我之前只用过 grunt 所以就对比下grunt 来说明 webpack
   (1) 首先 webpack 和 grunt 一样 都是通过一个配置文件来说明构建的逻辑.
   (2) grunt 是 Gruntfile.js ,webpack是 webpack.config.js
   (3) grunt 是 通过 loadNpmTasks 一些构建模块 然后再 regist 一个命令
       这个命令对应 一个 task数组 数组里面填的是构建流程，比如:
	    module.exports = function(grunt) {
			grunt.initConfig({
				react: {
					dynamic_mappings: {
						expand: true,
						cwd: 'static/js',
						src: [
							'**/*.jsx'
						],
						dest: 'static/js',
						ext: '.js'
					}
				},
				watch: {
					jsx: {
						files: [
							'static/js/**/*.jsx'
						],
						tasks: ['react']
					}
				}

			});
			grunt.loadNpmTasks('grunt-react');
			grunt.loadNpmTasks('grunt-contrib-watch');
			grunt.registerTask('default', ['watch']);
		};   
		react,watch就是一个一个的 grunt模块， 
		dynamic_mappings, jsx 就是 他们的子任务。
		每个grunt模块可以有多个子任务.
		这里要做的是把 static 中所有的 jsx模块编译成 js模块，
		并且跟当前这个被编译的jsx文件生成在一起。
		如果不考虑后台渲染react模块的话，这个步骤也可以不需要。
		后台如果不做预编译加载jsx模块的话会很慢。
		比如这样，在server.js 中写：
		var register = require('babel/register');
		register({
			only: [
				'static',
				'views'
			]
		});
		这样在启动服务时，会编译jsx文件，这个过程不算太快，所以要预编译。
		这里预编译为什么不用webpack,因为webpack的设计是为webapp设计的
		一个页面对应一个入口的js文件，像这样build文件到不同的目录反而对于
		webpack来说不太方便，所以这里用了grunt来配合webpack。
		上面的watch任务是指，只要static目录中的jsx文件保存了，就会执行
		react的编译任务，把jsx变成js。


		再看下这个项目中webpack的配置文件

		var webpack = require('webpack');
		var definePlugin = new webpack.DefinePlugin({
			__DEV__: !process.env.NODE_ENV
		});
		var ExtractTextPlugin = require("extract-text-webpack-plugin");

		/*var commonsPlugin =
		  new webpack.optimize.CommonsChunkPlugin('common.js');*/

		module.exports = {
			entry: {
				page1: './static/js/page/page1.js',
				page2: './static/js/page/page2.js'
			},
			output: {
				path: __dirname + "/dist",
				publicPath: '/',
				filename: '/js/[name].js'
			},
			module: {
				loaders: [{
					test: /\.css$/,
					exclude: ['node_modules'],
					loader: ExtractTextPlugin.extract("style-loader", "css-loader")
				}, {
					test: /\.styl$/,
					exclude: ['node_modules'],
					loader: ExtractTextPlugin.extract("style-loader", "css-loader!stylus-loader")
				}, {
					test: /\.(png|jpg)$/,
					exclude: ['node_modules'],
					loader: 'file-loader',
					query: {
						name: 'img/[name].[ext]'
					}
				}, {
					test: /\.jsx$/,
					exclude: ['node_modules'],
					loader: 'babel-loader'
				},{
					test: /\.jade$/,
					exclude: ['node_modules', 'views'],
					loader: 'jade-loader'
				}]
			},
			plugins: [
				definePlugin,
				new ExtractTextPlugin("/css/[name].css"),
				new ExtractTextPlugin("/deji/[name].js")
			]
		};

		entry:  入口文件的配置
		        比如: page1页面 对应 page1.js page2 页面对应 page2.js 
				page1, page2并没有什么实际意义
		
		output: 输出目录的配置
				path: 配置输出的根目录

				publicPath: 是配置静态文件的 如 img 的 跟目录
				比如 页面中 require 了一个图片 require('./test.jpg');
				然后我们用file-loader 让图片生成到 dist目录中
				webpack会帮我们引入这张图片，引入图片的路径会加上 publicPath
				比如生成到 :
				dist - 
					img -
						hello_test.jpg
				如果 publicPath 是 / 就是 /img/hello_test.jpg
				如果 publicPath 是 http://xxx.cdn.com  就是  http://xxx.cdn.com/img/hello_test.jpg
				这个 可以根据环境变量来设置不同的publicPath
				这样在本地就用 / 线上或者测试 就用 cdn的地址
				当然静态文件的加载还要根据koa 的 koa-static-cache这个中间件来考虑
				比如这里配置的
				app.use(staticCache(path.join(__dirname, 'dist'), {
					dynamic: true
				}));
				定义了 dist为 静态文件的跟目录. 那么本地开发 publicPath就可以填 / 了
				这里设置 dynamic参数是为了 当你添加文件的时候 不需要重启服务

				filename: 定义生成的文件名 [name] 代表上面 entry 配置的 page1, page2这个别名
						  [ext] 代表扩展名, 这里可以根据实际情况来配置。

		module: 里面就是各种loader 相当于 grunt 处理文件的各个模块.
				test 代表匹配的意思, 当webpack匹配到这些文件时会触发
				对应loader中的任务。比如当你更改任意 jsx文件时，会触发
				babel-loader这个任务，babel-loader 最重要的是把jsx 的
				语法转换成js的语法，然后把es6 转成 es5的语法，因为es6在
				客户端的兼容性不是太好。如果需要兼容ie7 8 就需要引入两个
				js。	
				<!--[if lt IE 9]>
			    script(src="//cdn.bootcss.com/es5-shim/4.1.14/es5-shim.min.js")
			    script(src="//cdn.bootcss.com/es5-shim/4.1.14/es5-sham.min.js")    
			    <![endif]--> 
			    这里用jade的语法来说明
				这样就可以使ie 78 这样不支持 es5的浏览器支持es5 不报错。
				如果要使用ie6的话，就建议不要使用react

				exclude: 代表你不想哪些目录中的文件被更改时，触发对应loader中的任务

				loader: 就是loader的具体任务， 构建这个 koa + react 的任务不需要太多
						的loader,常用的就几种。
						css: style-loader css-loader css-loader 合并依赖 , style-loader创建style标签append 合并的css 
						jsx: babel-loader 上面已经说明
						img: file-loader 当你require了一个静态文件时，file-loader可以帮你创建link 或者 img标签引入文件
						styl: jade-loader 把stylus的语法转换为 css的语法
						jade: jade-loader 把jade语法编译成js 返回的是一个function 
						      如 var listTemplate = require('./list'); listTempate(data); 就可以渲染出数据
						      在react的项目中可以不用jade模板，毕竟 react 也可以算一种html模板

						loader的顺序是从右往左，不是从左往右 !代表连接的意思
						比如 style-loader!css-loader 这样代表先执行 css-loader这个任务 再
						执行 style-laoder
						loader的参数有两种写法 一种是直接已链接的形式表示 如 css-loader?name=param1&name2=param2
						还有一种是json的标示方式
						query: {
							name1: param1,
							name2: param2
						}

				plugins是webpack的插件，这里用到主要是webpack的一个官方插件，主要实现的把css 像 js 一样生成到dist目录
				实现一个页面对应一个入口css

				webpack这里主要描述的是这个项目模板中用到的，具体还有一些细节以后会继续补充。

4. 关于react的教程就不详细说明了，这里的目录结构简单的说就是基础组件组成页面上的业务逻辑模块

   各个业务逻辑模块组成一个页面。

5. 如果要用服务端，渲染react模块的话。

   需要引入这个两个模块：

   var React = require('react/lib/ReactWithAddons');
   var ReactDOMServer = require('react-dom/server');

   ReactWithAddons应该代表不稳定的以后会新增的一些方法的react模块
   react-dom/server 是react用来服务端渲染的模块。
   他需要做的就是把 React.createElement("input", {type: "text", ref: "myTextInput"})
   转成html字符串 "<input type="text">" 然后渲染到页面上。

    var page2 = React.createFactory(require('./static/js/page/page2'));
    var data = {count: 22};
    var counterHTML = ReactDOMServer.renderToStaticMarkup(page2({
		pageInfo: data
    }));
	console.log(counterHTML); 

	这里page2是引入的 一个通过grunt预编译的一个 js文件 返回的是一个函数
	data 可以理解为从数据库查出来的数据
	ReactDOMServer.renderToStaticMarkup  就是把 page2(data)
	编译成 html字符串
	这里类似 tmodjs 一个artTemplate的预编译工具， 也类似上面jade-loader
	
	如果某个react模块中用了一些事件，就需要前台重新渲染一遍。
	因为如果前台不触发render 事件就不会生效。

	if(global.document) {
  		ReactDom.render(<Page1 />, global.document.getElementById('wrap'));
	}

	可以这样做一下兼容处理

	还有如果这个前后台共用的react模块中 var img1 = require('./hello_test.jpg');
	你require了一个 img
	对于koa 来说 他并没有执行 file-loader
	在编写项目时 require 一个 img文件 也会触发 img 对应的loader 
	触发loader不只是在改对应匹配的文件时
	他是一个双向的，跟grunt不一样。grunt只能 在处理js 模块中处理js
	如果你要混合处理只能自己开发一个新模块

	对于后台来说我们可以做一下简单的处理
	var staticPath = env === 'production' ? 'http://cdn.com' : '/img/';
		require.extensions['.jpg'] = function(module, filename) {
		module.exports = staticPath + path.basename(filename);
	};
	这样上面 img1的返回值 就是一个 图片的有效路径了。

6. 说明下webpack 中不需要 grunt-watch那样的模块  他自带watch webpack --watch

7. 关于调试webpack 也可以自动生成source-map 这样调试的时候也不用抓瞎 webpack --watch -d 

8. 最后说明下webpack 的模块是需要npm install 的。

9. 该文档说明的还不是很清楚，以后会继续补充。	
```





