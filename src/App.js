import React, { useState } from 'react'
import DrawingCanvas from './components/DrawingCanvas'
import Results from './components/Results'

const App = () => {
  const [probabilities, setProbabilities] = useState(null)
  const [largeImage, setLargeImage] = useState(null)
  const [imageValues, setImageValues] = useState(null)
  return (
    <div className="container">
        {
          !probabilities ? (
            <DrawingCanvas
                setProbabilities={setProbabilities}
                setLargeImage={setLargeImage}
                setImageValues={setImageValues} />
          ) : (
            <Results
                probabilities={probabilities}
                setProbabilities={setProbabilities}
                largeImage={largeImage}
                imageValues={imageValues} />
          )
        }
    </div>
  )
}

export default App;
