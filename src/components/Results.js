import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'

const Result = ({ number, probability, predicted }) => {
  const percentage = probability * 100
  const percentageString = `${percentage.toFixed(2)} %`
  const y = number * 30
  return (
    <>
      <svg width="200" height="30" y={y}>
        <g>
          <rect width={100} height="20" style={{stroke: 'black', strokeWidth: '1px', fill: 'white'}} x="20" rx="3" ry="3"/>
          <rect width={percentage} height="20" style={{fill: '#0033FF'}} x="20" rx="3" ry="3"/>
          <text fill="black" x="0" y="15">{number}</text>
          <text fill="black" x="130" y="15">{percentageString}</text>
        </g>
      </svg>
    </>
  )
}

const Results = ({ probabilities, setProbabilities, drawnImage}) => {

  useEffect(() => {
    const refCanvas = document.getElementById("canvas")
    const ctx = refCanvas.getContext('2d')
    ctx.drawImage(drawnImage, 0, 0)
  }, [])

  const largeCanvasStyle = {
    border: '1px solid black',
    cursor: 'crosshair'
  }

  const argmax = (arr) => {
    var max = 0
    var index = 0
    arr.forEach((val, ind) => {
      if (val > max) {
        max = val
        index = ind
      }
    })
    return index
  }
  
  const predicted = argmax(probabilities)
  const handleOk = () => {
    setProbabilities(null)
  }


  return(
    <div className="row">
      <div className="col-sm" style={{margin: "10px"}}>
        <h3>The digit you drew looks like a {predicted}.</h3>
        <canvas id="canvas" style={largeCanvasStyle} height="224" width="224"/>
      </div>
      <div className="col-sm" style={{margin: "10px"}}>
        <p>Did we get it right? Please select the correct digit and press ok.</p>
        <svg width="210" height="310" >
        {probabilities.map((p, ind) => 
          <Result key={ind} number={ind} probability={p} predicted={ind === predicted} />) }
        </svg>
        <div>
          <Button onClick={handleOk} >Ok</Button>
          <Button onClick={handleOk} >Cancel</Button>
        </div>
      </div>
    </div>
  )
}

export default Results