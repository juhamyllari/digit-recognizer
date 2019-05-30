import React, { useState, useEffect } from 'react'
import imageService from '../services/images'
import { Button } from 'react-bootstrap'

const Result = ({ number, probability, selected, setSelected }) => {
  const percentage = probability * 100
  const percentageString = `${percentage.toFixed(2)} %`
  const y = number * 30
  const handleClick = () => {
    setSelected(number)
  }
  return (
    <>
      <svg width="200" height="30" y={y} onClick={handleClick} >
        <g>
          {selected === number && (<circle fill="red" cx="5" cy="12" r="5" />)}
          <rect width={100} height="20" style={{stroke: 'black', strokeWidth: '1px', fill: 'white'}} x="25" rx="3" ry="3"/>
          <rect width={percentage} height="20" style={{fill: '#0033FF'}} x="25" rx="3" ry="3"/>
          <text fill="black" x="13" y="15">{number}</text>
          <text fill="black" x="130" y="15">{percentageString}</text>
        </g>
      </svg>
    </>
  )
}

const Results = ({ probabilities, setProbabilities, largeImage, imageValues}) => {

  const [selected, setSelected] = useState(null)

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

  useEffect(() => {
    const refCanvas = document.getElementById("canvas")
    const ctx = refCanvas.getContext('2d')
    ctx.drawImage(largeImage, 0, 0)
    setSelected(argmax(probabilities))
  }, [])

  const largeCanvasStyle = {
    border: '1px solid black',
    cursor: 'crosshair'
  }

  const predicted = argmax(probabilities)

  const handleOk = () => {
    const digitDocument = {
      image: imageValues,
      guess: predicted,
      groundTruth: selected
    }
    imageService.saveToDatabase(digitDocument)
    setProbabilities(null)
  }

  const handleCancel = () => {
    setProbabilities(null)
  }

  return(
    <div className="row">
      <div className="col-sm" style={{margin: "10px"}}>
        <h3>Your digit looks like {predicted === 8 ? "an" : "a"} {predicted}.</h3>
        <canvas id="canvas" style={largeCanvasStyle} height="224" width="224"/>
      </div>
      <div className="col-sm" style={{margin: "10px"}}>
        <p>Did we get it right? Please select the correct digit and click ok.</p>
        <svg width="210" height="310" >
        {probabilities.map((p, ind) => 
          <Result key={ind} number={ind} probability={p} selected={selected}
            setSelected={setSelected} />) }
        </svg>
        <div>
          <Button onClick={handleOk} >Ok</Button>
          <Button onClick={handleCancel} >Cancel</Button>
        </div>
      </div>
    </div>
  )
}

export default Results