import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import imageService from '../services/images'

const DrawingCanvas = ({ setProbabilities }) => {
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
    border: '1px solid black',
    margin: '5px'
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
      const rect = refLarge.current.getBoundingClientRect();
      const xOffset = rect.left
      const yOffset = rect.top
      // const x = event.clientX
      // const y = event.clientY
      const x = event.clientX - xOffset
      const y = event.clientY - yOffset
      const ctx = refLarge.current.getContext('2d')
      // console.log(`(${x}, ${y})`)
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
    setProbabilities(null)
  }
  const handleSend = () => {
    redrawSmall()
    const ctx = refSmall.current.getContext('2d')
    const imageData = ctx.getImageData(0, 0, smallWidth, smallHeight)
    const values = Array.prototype.slice.call(imageData.data)
      .filter((el, ind) => ind % 4 === 3)
    if (values.every( val => val === 0)) {
      return
    }
    imageService
      .send(values, smallWidth, smallHeight)
      .then(res => {
        setProbabilities(res.probabilities)
      })
  }
  return(
    <div className="col" style={{margin: "20px"}} >
      <h2>Draw your digit (0–9) here</h2>
      <canvas
        style={largeCanvasStyle}
        ref={refLarge}
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseOut={() => setDrawing(false)} />
      <br />
      <Button onClick={handleClear} >Clear</Button>
      <Button onClick={handleSend} >Send</Button>
      <br />
      <canvas
        style={smallCanvasStyle}
        ref={refSmall}
        width={28}
        height={28}
        />
      <p>Your digit in MNIST size (28×28 pixels)</p>
  </div>
  )
}

export default DrawingCanvas