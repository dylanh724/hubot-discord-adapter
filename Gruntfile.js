module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg:    grunt.file.readJSON('package.json'),
        babel: {
            options: {
                sourceMap: false,
                stage: 0
            },
            dist:    {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**/*.js'],
                    dest: 'dist/'
                }]
            }
        }
    });

    grunt.registerTask('default', ['babel']);
};
