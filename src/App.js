import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from './routes/index';
import DefaultComponent from './components/CustomerComponents/DefaultComponent/DefaultComponent';

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => {
          const Page = route.page;
          const Layout = route.isShowHeader ? DefaultComponent : React.Fragment;

          return (
            <Route 
              key={index} 
              path={route.path} 
              element={
                <Layout>
                  <Page />
                </Layout>
              } 
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
