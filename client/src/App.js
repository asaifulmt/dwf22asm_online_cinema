import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import "bootstrap/dist/css/bootstrap.min.css"
import "./styles/global.css"

import Home from "./pages/home";
import NotFound from "./pages/notFound";
import Navbar from "./components/navbar";
import ModalLogin from "./components/modalLogin";
import ModalRegister from "./components/modalRegister";
import PrivateRoute from "./components/privateRoute";
import AdminRoute from "./components/adminRoute";
import AddFilm from "./pages/addFilm";
import DetailFilm from "./pages/detailFilm";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute exact path="/film/:id" component={DetailFilm} />
        <AdminRoute exact path="/add-film" component={AddFilm} />

        <Route component={NotFound} />
      </Switch>
      <ModalLogin />
      <ModalRegister />
    </Router>
  )
}

export default App;
