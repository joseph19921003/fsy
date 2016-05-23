module.exports = function(grunt) {
	
	
	// 进行grunt初始化配置
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		concat: {
		  options: {
		    // 定义一个用于插入合并输出文件之间的字符
		    separator: ';'
		  },
		  dist: {
		    // 将要被合并的文件
		    src: ['app/**/*.js'],
		    // 合并后的JS文件的存放位置
		    dest: 'app/dist/fuck.js'
		  }
		},
		uglify: {
			dist: {
				src: ['app/dist/fuck.js'],
				dest: 'app/dist/fuck.min.js'
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-concat");

	// 引入任务的插件
	// require("load-grunt-tasks")(grunt);
	
	// 注册任务
	grunt.registerTask("default", ["concat", "uglify"]);
};
var a = 1;
console.log(`nihaoa ${a}
	happy`);
