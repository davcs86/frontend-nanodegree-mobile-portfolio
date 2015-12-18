"use strict";

module.exports = function (grunt) {

    var mozjpeg = require("imagemin-mozjpeg");
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
                    src: ["<%= config.dist %>/*"]
                }]
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        eslint: {
            target: [
                "Gruntfile.js",
                "<%= config.app %>/**/*.js"
            ]
        },

        // Minify images
        imagemin: {
            processpng: {
                options: {
                    optimizationLevel: 7,
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
                },
                files: [{
                    expand: true,
                    cwd: "<%= config.app %>/",
                    src: [
                        "**/*.{gif,jpeg,jpg}"
                    ],
                    dest: "<%= config.dist %>/"
                }]
            }
        },
        // Minify html files
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
        // Minify css files
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
        // Minify js
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
        "imagemin:build"
    ]);
};
