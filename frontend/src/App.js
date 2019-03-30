import React, { useState } from 'react';

const App = () => {
  const width = 400
  const height = 400
  const [drawing, setDrawing] = useState(false)
  const ref = React.createRef()
  const canvasStyle = {
    border: '1px solid black',
    cursor: 'crosshair'
  }
  const handleMouseDown = () => {
    setDrawing(true)
  }
  const handleMouseUp = () => {
    setDrawing(false)
  }
  const handleMouseMove = (event) => {
    if (drawing) {
      const xOffset = ref.current.offsetLeft
      const yOffset = ref.current.offsetTop
      const x = event.clientX - xOffset
      const y = event.clientY - yOffset
      const ctx = ref.current.getContext('2d')
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
    const ctx = ref.current.getContext('2d')
    ctx.clearRect(0, 0, width, height)
  }
  const handleSend = () => {
    const ctx = ref.current.getContext('2d')
    const data = ctx.getImageData(0, 0, 10, 10)
    const values = data.data.filter((el, ind) => ind % 4 === 3)
    console.log('you clicked send');
    console.log(`image data matrix has width ${data.width}`)
    console.log(`image data matrix has height ${data.height}`)
    console.log(values)
  }
  return (
    <div>
      <canvas
        style={canvasStyle}
        ref={ref}
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove} />
      <button onClick={handleClear} >Clear</button>
      <button onClick={handleSend} >Send</button>
    </div>
  )
}

export default App;
