import React, { useState } from 'react';

const App = () => {
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
    ctx.fillStyle = 'rgb(0, 0, 200)';
    ctx.fillRect(x, y, 5, 5)
  }
  return (
    <canvas
      style={canvasStyle}
      ref={ref}
      width="400"
      height="400"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove} />
  )
}

export default App;
