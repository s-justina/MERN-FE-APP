import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {Users} from "./user/pages/Users";
import {NewPlace} from "./places/pages/NewPlace";
import {MainNavigation} from "./shared/components/Navigation/MainNavigation";
import './App.css';
import {UserPlaces} from "./places/pages/UserPlaces";
import {UpdatePlace} from "./places/pages/UpdatePlace";

function App() {
    return (
        <Router>
            <MainNavigation/>
            <main>
                <Switch>
                    <Route path="/" exact>
                        <Users/>
                    </Route>
                    <Route path="/:userId/places">
                        <UserPlaces/>
                    </Route>
                    <Route path="/places/new" exact>
                        <NewPlace/>
                    </Route>
                    <Route path="/places/:placeId">
                        <UpdatePlace/>
                    </Route>
                    <Redirect to="/"/>
                </Switch>
            </main>
        </Router>
    );
}

export default App;
