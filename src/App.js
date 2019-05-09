import React, { useState } from 'react';
import DrawingCanvas from './components/DrawingCanvas'
import Results from './components/Results'

const App = () => {
  const [probabilities, setProbabilities] = useState(null)
  const [drawnImage, setDrawnImage] = useState(null)
  return (
    <div className="container">
        {
          !probabilities ? (
            <DrawingCanvas
                setProbabilities={setProbabilities}
                setDrawnImage={setDrawnImage} />
          ) : (
            <Results
                probabilities={probabilities}
                setProbabilities={setProbabilities}
                drawnImage={drawnImage} />
          )
        }
    </div>
  )
}

export default App;
