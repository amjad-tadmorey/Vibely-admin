import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Shops from "./pages/Shops";
import Users from "./pages/Users";
import { Toaster } from "react-hot-toast";
import ShopPreview from "./pages/ShopPreview";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/shops/:id" element={<ShopPreview />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
      <Toaster
        gutter={12}
        containerStyle={{
          width: '100%',
          top: '35%',
          left: '50%',
          translate: '-50% -50%'
        }}
        toastOptions={{
          success: {
            duration: 3000
          },
          error: {
            duration: 5000
          },
          style: {
            fontSize: '1rem',
            width: 'fit-content',
            padding: '8px 24px',
            backgroundColor: 'white',
            color: 'var(--color-grey-700)'
          }
        }}
      />
    </Router>

  );
}

export default App;
