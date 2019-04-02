import React, { useState } from 'react';
import imageService from './services/images'

const App = () => {
  const width = 28*8 // MNIST images are of size 28*28
  const height = 28*8
  const smallWidth = 28
  const smallHeight = 28
  const [drawing, setDrawing] = useState(false)
  const refLarge = React.createRef()
  const refSmall = React.createRef()
  const largeCanvasStyle = {
    border: '1px solid black',
    cursor: 'crosshair'
  }
  const smallCanvasStyle = {
    border: '1px solid black'
  }
  const handleMouseDown = () => {
    setDrawing(true)
  }
  const handleMouseUp = () => {
    setDrawing(false)
    redrawSmall()
  }
  const redrawSmall = () => {
    const ctx = refSmall.current.getContext('2d')
    ctx.clearRect(0, 0, smallWidth, smallHeight)
    ctx.drawImage(refLarge.current, 0, 0, smallWidth, smallHeight)
  }
  const handleMouseMove = (event) => {
    if (drawing) {
      const xOffset = refLarge.current.offsetLeft
      const yOffset = refLarge.current.offsetTop
      const x = event.clientX - xOffset
      const y = event.clientY - yOffset
      const ctx = refLarge.current.getContext('2d')
      draw(ctx, x, y)
    }
  }
  const draw = (ctx, x, y) => {
    const r = 10
    ctx.beginPath()
    ctx.arc(x, y, r, 0.0, 2 * Math.PI, false)
    ctx.fill()
  }
  const handleClear = () => {
    refLarge.current.getContext('2d').clearRect(0, 0, width, height)
    refSmall.current.getContext('2d').clearRect(0, 0, smallWidth, smallHeight)
  }
  const handleSend = () => {
    redrawSmall()
    const ctx = refSmall.current.getContext('2d')
    const imageData = ctx.getImageData(0, 0, smallWidth, smallHeight)
    const values = Array.prototype.slice.call(imageData.data)
      .filter((el, ind) => ind % 4 === 3)
    imageService
      .send(values, smallWidth, smallHeight)
      .then(res => {
        console.log(`got response ${JSON.stringify(res)}`)
      })
  }
  return (
    <div>
      <canvas
        style={largeCanvasStyle}
        ref={refLarge}
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove} />
      <br />
      <button onClick={handleClear} >Clear</button>
      <button onClick={handleSend} >Send</button>
      <br />
      <canvas
        style={smallCanvasStyle}
        ref={refSmall}
        width={28}
        height={28}
        />
    </div>
  )
}

export default App;
