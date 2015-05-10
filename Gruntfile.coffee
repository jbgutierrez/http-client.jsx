module.exports = (grunt) ->
  grunt.initConfig
    coffee:
      normal:
        src: [
          'src/**/*.coffee'
        ]
        dest: 'lib/http-client.jsx'

    concat:
      full:
        src: [
          'lib/http-client.jsx'
        ]
        dest: 'lib/http-client.full.jsx'

    watch:
      files: 'src/**/*.coffee'
      tasks: 'default'

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.registerTask 'default', [
    'coffee:normal'
    'concat:full'
  ]
