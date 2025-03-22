import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import './App.css'
import RegistrationForm from './pages/RegistrationForm' 

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-gray-800 shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-7">
                <ul className="flex items-center space-x-4">
                  <li>
                    <Link to="/" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<RegistrationForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
