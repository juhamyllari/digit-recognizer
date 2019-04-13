import React from 'react'

const Result = ({ number, probability, predicted }) => {
  const percentage = probability * 100
  const percentageString = `${percentage.toFixed(2)} %`
  const y = number * 30
  return (
    <>
      <svg width="200" height="30" y={y}>
        <g>
          <rect width={100} height="20" style={{stroke: 'black', strokeWidth: '1px', fill: 'white'}} x="20" />
          <rect width={percentage} height="20" style={{fill: 'purple'}} x="20" />
          <text fill="black" x="0" y="15">{number}</text>
          <text fill="red" x="130" y="15">{percentageString}</text>
        </g>
      </svg>
    </>
  )
}

const Results = ({ probabilities }) => {
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

  return(
    <>
      <p>The number you drew is {predicted}.</p>
      <svg width="250" height="600" >
      {probabilities.map((p, ind) => 
        <Result key={ind} number={ind} probability={p} predicted={ind === predicted} />) }
      </svg>
    </>
  )
}

export default Results