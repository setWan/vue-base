import client from 'webpack-theme-color-replacer/client'
import forElementUI from 'webpack-theme-color-replacer/forElementUI'

/**
 * 获取 localStorage 颜色
 */
export function getColor () {
  return localStorage.getItem('theme_color')
}

/**
 * 设置颜色
 * @param {String} newColor 
 */
export function setColor (newColor) {
  return localStorage.setItem('theme_color', newColor)
}

/**
 * 初始化主题颜色
 */
export function initThemeColor () {
  const savedColor = getColor()
  savedColor && changeColor(savedColor)
}

/**
 * 改变主题颜色
 * @param {*} newColor 新颜色色值 #fff | #ffffff
 */
export function changeColor (newColor) {
  // let rgbColor = colorRgb(newColor)
  var options = {
    // newColors: [newColor, rgbColor + ',0.65', rgbColor + ',0.85', rgbColor + ',0.07', rgbColor + ',0.05', rgbColor + ',0.1'],
    newColors: [...forElementUI.getElementUISeries(newColor)],
    changeUrl (cssUrl) {
      return `/${cssUrl}`
    }
  }
  return client.changer.changeColor(options, Promise)
    .then(t => {
      setColor(newColor)
    })
}

/**
 * 16进制颜色变为RGB颜色
 * @param {*} colorText 颜色色值
 */
export function colorRgb (colorText) {
  // 16进制颜色值的正则
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 把颜色值变成小写
  var color = colorText.toLowerCase()
  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      var colorNew = '#'
      for (var i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1))
      }
      color = colorNew
    }
    // 处理六位的颜色值，转为RGB
    var colorChange = []
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt('0x' + color.slice(i, i + 2)))
    }
    return colorChange.join(',')
  } else {
    return color
  }
}
