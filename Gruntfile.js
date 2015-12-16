"use strict";

module.exports = function (grunt) {

    var mozjpeg = require("imagemin-mozjpeg");
    //var imageminJpegtran = require("imagemin-jpegtran");
    var imageminPngcrush = require("imagemin-pngcrush");

    require("load-grunt-tasks")(grunt);

    // Configurable paths
    var config = {
        app: "app",
        dist: "dist"
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        ".tmp",
                        "<%= config.dist %>/*",
                        "!<%= config.dist %>/.git*"
                    ]
                }]
            },
            server: ".tmp"
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        eslint: {
            target: [
                "Gruntfile.js",
                "<%= config.app %>/**/*.js"
            ]
        },

        imagemin: {
            processpng: {
                options: {
                    optimizationLevel: 7,
                    //use: [mozjpeg({quality: 80, progressive: false})]
                    use: [imageminPngcrush({reduce: true})]
                },
                files: [{
                    expand: true,
                    cwd: "<%= config.app %>/",
                    src: ["**/*.png"],
                    dest: "<%= config.dist %>/"
                }]
            },
            build: {
                options: {
                    optimizationLevel: 7,
                    use: [mozjpeg({quality: 50, progressive: false})]
                    //use: [imageminJpegtran()]
                },
                files: [{
                    expand: true,
                    cwd: "<%= config.app %>/",
                    src: ["**/*.{gif,jpeg,jpg}"],
                    dest: "<%= config.dist %>/"
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    removeAttributeQuotes: false,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    // true would impact styles with attribute selectors
                    removeRedundantAttributes: false,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: "<%= config.app %>",
                    src: "**/*.html",
                    dest: "<%= config.dist %>"
                }]
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: "<%= config.app %>",
                    src: "**/*.css",
                    dest: "<%= config.dist %>",
                    ext: ".css"
                }]
            }
        },
        uglify: {
            target: {
                files: [{
                    expand: true,
                    cwd: "<%= config.app %>",
                    src: "**/*.js",
                    dest: "<%= config.dist %>"
                }]
            }
        }
    });

    grunt.registerTask("default", [
        "newer:eslint",
        "clean:dist",
        "cssmin",
        "uglify",
        "htmlmin",
        "imagemin:processpng",
        //"imagemin:removeexif",
        "imagemin:build",
        "clean:server"
    ]);
};
