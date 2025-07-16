import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import routes from "./routes/routes";
import RootLayout from "./layouts/RootLayout";

function App() {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<RootLayout>{element}</RootLayout>}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
