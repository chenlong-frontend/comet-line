/*
 * @Description: comet-line
 * @Author: chenlong
 * @Date: 2021-03-22 17:03:35
 * @LastEditTime: 2021-03-23 13:53:12
 * @LastEditors: chenlong
 */

function Point(x, y) {
  this.x = x
  this.y = y
}

function square(path) {
  if (!Array.isArray(path)) {
    throw Error('path must be array')
  }
  let pathArr = []
  let pre = null
  for (let it of path) {
    if (!pre) {
      pre = it
      continue
    }
    const width = it[0] - pre[0]
    const height = it[1] - pre[1]
    let min = Math.min(Math.abs(width), Math.abs(height))
    const wstep = width / min
    const hstep = height / min
    for (let i = 0;i < min;i++) {
      pathArr.push(new Point(pre[0] + wstep * i, pre[1] + hstep * i))
    }
    pre = it
  }
  pathArr.push(new Point(pre[0], pre[1]))
  return pathArr
}

Point.prototype.toString = function () {
  return `(${this.x}, ${this.y})`
}

function Comet(canvas, option) {
  if (!option || !canvas) return
  const { path, pathColor, cometColor, pathVisible } = option
  if (!Array.isArray(path)) {
    throw Error('path must be array')
  }
  let stopFlag = false
  let time = 0
  let comets = []
  let pathArr = [].concat(path)
  const ctx = canvas.getContext('2d')

  function draw() {
    time++
    const currentPath = pathArr[time]
    ctx.clearRect(0, 0, 5000, 5000)
    if (pathVisible) {
      ctx.lineWidth = 1
      ctx.strokeStyle = pathColor || '#444444'
      ctx.beginPath()
  
      for (let i = 0; i < pathArr.length - 1; i++) {
        ctx.moveTo(pathArr[i].x, pathArr[i].y)
        ctx.lineTo(pathArr[i + 1].x, pathArr[i + 1].y)
      }
      ctx.stroke()
    }

    if (comets.length > 30) {
      comets.shift()
    }
    for (let i = 0; i < comets.length; i++) {
      comets[i].a = (i + 1) * 0.03
      comets[i].s = (i + 1) * 0.025
    }
    const b = { a: 1, s: 1, x: currentPath.x, y: currentPath.y }
    comets.push(b);
    for (let i = 0; i< comets.length; i++) {
      const b = comets[i];
      ctx.save();
      ctx.beginPath();
      ctx.globalAlpha = b.a; 
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = cometColor || '#66FF00';
      ctx.arc(b.x, b.y, b.s * 1, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.restore();
    }
    if (time === pathArr.length - 1) {
      time = 0;
    }
    !stopFlag && requestAnimationFrame(draw);
  }
  function stop () {
    stopFlag = true
  }
  function play () {
    stopFlag = false
    draw()
  }
  return {
    play,
    stop
  }
}
Comet.Point = Point
Comet.square = square

export default Comet
