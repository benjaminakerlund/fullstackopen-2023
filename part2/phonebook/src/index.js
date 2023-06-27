import ReactDOM from 'react-dom/client'
import App from './App'

/* Old index.js file from before 2.11
ReactDOM.render(
  <App />, 
  document.getElementById('root')
)*/

// New index.js file structure as proposed in material before 2.11
ReactDOM.createRoot(document.getElementById('root')).render(<App />)  
