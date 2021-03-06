Marked = require('marked')
StaticView = require('../../react/static')

module.exports = {
  fileTypes: [
    ".markdown",
    ".md"
  ],
  parseWeight: 10,
  displayName: 'Markdown',

  createRoute: function(fileObject){
    if(fileObject.frontMatter.path){
      route = fileObject.frontMatter.path
      if(path.extname(route) == ''){
        target = route + 'index.html'
      }else{
        target = route
      }
    }else{
      route = fileObject.descriptor
      target = route.replace(path.extname(route), '/index.html')
    }

    folder = target.replace(/\/[^/.]+\.[^/.]+$/, "")

    return {
      route: route,
      targetFile: target,
      folder: folder
    }
  },

  getComponent: function(fileObject){
    return StaticView
  },

  parseFile: function(fileObject, options){
    return new Promise(function(resolve, reject) {
      fileObject.content = Marked(fileObject.rawBody)

      process.writeQueue.push(fileObject)

      resolve()
    })
  }
}
