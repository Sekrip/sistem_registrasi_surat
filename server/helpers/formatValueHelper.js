class FormatValueHelper{
  
  static validationErrorFormat(object) {
    let obj = {}
    for (let i = 0; i < object.length; i++) {
        obj[object[i].path] = object[i].message
    }
    return obj
  }

}

module.exports = FormatValueHelper

