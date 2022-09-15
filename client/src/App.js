import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Content from './components/Content'
import Containers from './components/pages/Containers'
import Movimentacoes from './components/pages/Movimentacoes'
import Relatorio from './components/pages/Relatorio'

function App() {
  return (
    <Router>
      <Navbar />
      <Content>
        <Routes>
          <Route path="/" element={<Containers />} />
          <Route path="*" element={<Containers />} />
          <Route path="/movimentacoes/:id" element={<Movimentacoes />} />
          <Route path="/relatorio" element={<Relatorio />} />
        </Routes>
      </Content>
    </Router>
  )
}

export default App