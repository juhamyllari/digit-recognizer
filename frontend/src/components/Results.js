import React from 'react'

const Result = ({ number, probability, predicted }) => {
  const percentage = probability * 100
  const percentageString = `${percentage.toFixed(2)} %`
  return (
    <>
    { predicted
      ? <em>{number}: {percentageString} (winner)</em>
      : <p>{number}: {percentageString}</p> }
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
      {probabilities.map((p, ind) => 
        <Result key={ind} number={ind} probability={p} predicted={ind === predicted} />) }
    </>
  )
}

export default Results