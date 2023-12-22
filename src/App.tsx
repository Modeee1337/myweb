// App.tsx
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {TournamentList} from "./components/Tournaments/TournamentList.tsx";
import {MatchList} from "./components/Tournaments/Matches/MatchList.tsx";
import {MatchMaps} from "./components/Tournaments/Matches/MatchMaps/MatchMapList.tsx";
import {PrivateRoute} from "./components/Authentication/PrivateRoute.tsx";
import {ErrorPage} from "./ErrorPage.tsx";
import Layout from "./Layout.tsx";
import Login from "./components/Authentication/Login.tsx";
import Register from "./components/Authentication/Register.tsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./HomePage.tsx";


function App() {
    return (
        <Router>
            <ToastContainer/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route
                    element={<Layout/>}
                    errorElement={<ErrorPage errorCode={500}/>}
                >
                    <Route path="/" element={<HomePage/>}/>
                    <Route
                        path="/"
                        element={<PrivateRoute/>}
                        errorElement={<div>Not authorized</div>}
                    >
                        <Route path="/tournaments" element={<TournamentList/>}/>
                        <Route path="/tournaments/:tournamentId/matches" element={<MatchList/>}/>
                        <Route path="/tournaments/:tournamentId/matches/:matchId/matchmaps" element={<MatchMaps/>}/>
                    </Route>
                </Route>
                <Route path="*" element={<ErrorPage errorCode={404}/>}/>
            </Routes>
        </Router>
    )
}

export default App;