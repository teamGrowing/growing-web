import { Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/"></Route>
        <Route path="/album"></Route>
        <Route path="/chatting"></Route>
        <Route path="/calendar"></Route>
        <Route path="/more"></Route>
      </Routes>
    </Layout>
  );
}

export default App;
