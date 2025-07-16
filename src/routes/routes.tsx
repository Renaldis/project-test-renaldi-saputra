import About from "../pages/About";
import Careers from "../pages/Careers";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Ideas from "../pages/ideas/Ideas";
import Services from "../pages/Services";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/services", element: <Services /> },
  { path: "/careers", element: <Careers /> },
  { path: "/ideas", element: <Ideas /> },
  { path: "/contact", element: <Contact /> },
];

export default routes;
