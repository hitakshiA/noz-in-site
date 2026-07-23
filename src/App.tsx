import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Method from './Method'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/method" element={<Method />} />
    </Routes>
  )
}
