'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'lodash'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp',
            // dev: ['<%= yeoman.app %>/styles/tmp', '<%= yeoman.app %>/scripts/templates.js']
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    baseUrl: '<%= yeoman.app %>/scripts',
                    optimize: 'none',
                    paths: {
                        'jquery': '../../<%= yeoman.app %>/bower_components/jquery/dist/jquery'
                    },
                    dir: 'requirejs-out',
                    // TODO: Figure out how to make sourcemaps work with grunt-usemin
                    // https://github.com/yeoman/grunt-usemin/issues/30
                    //generateSourceMaps: true,
                    // required to support SourceMaps
                    // http://requirejs.org/docs/errors.html#sourcemapcomments
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true
                    //uglify2: {} // https://github.com/mishoo/UglifyJS2
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/login.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        // htmlmin: {
        //     dist: {
        //         options: {
        //             /*removeCommentsFromCDATA: true,
        //             // https://github.com/yeoman/grunt-usemin/issues/44
        //             //collapseWhitespace: true,
        //             collapseBooleanAttributes: true,
        //             removeAttributeQuotes: true,
        //             removeRedundantAttributes: true,
        //             useShortDoctype: true,
        //             removeEmptyAttributes: true,
        //             removeOptionalTags: true*/
        //         },
        //         files: [{
        //             expand: true,
        //             cwd: '<%= yeoman.app %>',
        //             src: '*.html',
        //             dest: '<%= yeoman.dist %>'
        //         }]
        //     }
        // },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        'images/{,*/}*.{webp,gif}',
                        'styles/fonts/{,*/}*.*',
                        'bower_components/sass-bootstrap/fonts/*.*'
                    ]
                }]
            }
        },
        bower: {
            all: {
                rjsConfig: '<%= yeoman.app %>/scripts/main.js'
            }
        },
        // concat: {
        //     dev: {
        //         // combine Compass output (.tmp/styles/main.css) with your styles in app/styles/css/**/*.css
        //         files: {
        //             '<%= yeoman.app %>/styles/tmp/main.css' : ['.tmp/styles/scss/main.css', '<%= yeoman.app %>/styles/css/**/*.css']
        //         }
        //     }
        // },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '/styles/fonts/{,*/}*.*',
                        'bower_components/sass-bootstrap/fonts/*.*'
                    ]
                }
            }
        }
    });

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        // 'requirejs',
        // 'imagemin',
        // 'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'rev',
        'usemin',
    ]);

    grunt.registerTask('default', [
        'jshint',
        // 'test',
        'build'
    ]);

    // grunt.registerTask('build-dev', [
    //     'clean:dev',
    //     'jst:dev',
    //     'compass:dist',
    //     'concat:dev'
    // ]);
};
