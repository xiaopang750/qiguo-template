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