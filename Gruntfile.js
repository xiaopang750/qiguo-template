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
				options: {
					es6module: true
				},
				ext: '.js'
			}
		},
		babel: {
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
				options: {
					event: ['changed', 'added' , 'deleted']
				},
				tasks: ['react']
			}
		}

	});
	grunt.loadNpmTasks('grunt-react');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['watch']);
};