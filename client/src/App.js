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
import Profile from "./pages/profile";
import Transactions from "./pages/transactions";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute exact path="/film/:id" component={DetailFilm} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <AdminRoute exact path="/add-film" component={AddFilm} />
        <AdminRoute exact path="/transactions" component={Transactions} />

        <Route component={NotFound} />
      </Switch>
      <ModalLogin />
      <ModalRegister />
    </Router>
  )
}

export default App;
