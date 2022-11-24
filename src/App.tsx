import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" />
        <Route path="/album" />
        <Route path="/chatting" />
        <Route path="/calendar" />
        <Route path="/more" />
      </Routes>
    </Layout>
  );
}

export default App;
