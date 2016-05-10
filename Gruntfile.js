module.exports = function(grunt) {
	
	
	// 进行grunt初始化配置
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		uglify: {
			options: {
				banner: "/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n"
			},
			bulid: {
				src: app/
			}
		},
	});

	// 引入任务的插件
	grunt.loadNpmTasks();
	// require("load-grunt-tasks")(grunt);
	
	// 注册任务
	grunt.registerTask();

};