import React from 'react'

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
    <div className="col" style={{margin: "20px"}}>
      <h3>The digit you drew is {predicted}.</h3>
      <svg width="250" height="600" >
      {probabilities.map((p, ind) => 
        <Result key={ind} number={ind} probability={p} predicted={ind === predicted} />) }
      </svg>
    </div>
  )
}

export default Results