import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default function htmlToPDF (ele) {
  // 先把图像放大，转为canvas以后再缩小避免图像模糊
  let height = ele.clientHeight
  let width = ele.clientWidth
  let newCanvas = document.createElement('canvas')
  // 放大倍速
  var scaleBy = 2
  newCanvas.width = (width) * scaleBy
  newCanvas.height = (height) * scaleBy
  var opts = {
    allowTaint: true,
    tainttest: true,
    scale: scaleBy,
    canvas: newCanvas,
    logging: false,
    width: width,
    height: height
  }
  return html2canvas(ele, opts).then((canvas) => {
    var context = canvas.getContext('2d')
    // 关闭抗锯齿
    context.mozImageSmoothingEnabled = false
    context.webkitImageSmoothingEnabled = false
    context.msImageSmoothingEnabled = false
    context.imageSmoothingEnabled = false

    var imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    // 下面处理防止canvas转成img时 出现黑色背景，现在更改为白色背景
    for (var i = 0; i < imageData.data.length; i += 4) {
      // 当该像素是透明的，则设置成白色
      if (imageData.data[i + 3] === 0) {
        imageData.data[i] = 255
        imageData.data[i + 1] = 255
        imageData.data[i + 2] = 255
        imageData.data[i + 3] = 255
      }
    }
    context.putImageData(imageData, 0, 0)

    /* 以上代码将html转成canvas完成，下面代码将canvas 转成pdf 按照A4的大小比例来转 以下数字 592.28代表宽度，841.89代表高度 */
    let contentWidth = canvas.width
    let contentHeight = canvas.height
    // 一页pdf显示html页面生成的canvas高度;
    let pageHeight = contentWidth / 592.28 * 841.89
    // 未生成pdf的html页面高度
    let leftHeight = contentHeight
    // pdf页面偏移
    let position = 0
    let imgWidth = 595.28
    let imgHeight = imgWidth / contentWidth * contentHeight

    let base64 = canvas.toDataURL('image/jpeg', 1)
    let PDF = new JsPDF('', 'pt', 'a4')
    // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
    // 当内容未超过pdf一页显示的范围，无需分页
    if (leftHeight < pageHeight) {
      PDF.addImage(base64, 'JPEG', 0, 0, imgWidth, imgHeight)
    } else {
      while (leftHeight > 0) {
        PDF.addImage(base64, 'JPEG', 0, position, imgWidth, imgHeight)
        leftHeight -= pageHeight
        position -= 841.89
        if (leftHeight > 0) {
          PDF.addPage()
        }
      }
    }
    // return PDF.output('dataurlstring')
    return window.btoa(PDF.output())
  })
}
