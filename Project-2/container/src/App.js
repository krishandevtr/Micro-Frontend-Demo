import React ,{lazy, Suspense,useState,useEffect}from "react"
import ReactDOM from 'react-dom';

import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";
import { Router,Route, Switch,Redirect } from "react-router-dom";
import {createBrowserHistory} from "history";
import Progress from "./components/Progress";

const DashboardApp = lazy(() => import('./components/Dashboard'));
const AuthApp = lazy(() => import('./components/AuthApp'));
const MarketingApp = lazy(() => import('./components/MarketingApp'));
import Header from "./components/Header";
const generateClassName = createGenerateClassName({
    productionPrefix: 'co',
});

const history = createBrowserHistory();

export const App = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    useEffect(() => {
        if(isSignedIn){
            history.push('/dashboard');
        }
    }, [isSignedIn]);
    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)}/>
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth" >
                            <AuthApp onSignIn={() => setIsSignedIn(true)}/> 
                            </Route>
                            <Route path="/dashboard" component={DashboardApp} >
                                {isSignedIn ? <DashboardApp /> : <Redirect to="/" />}
                            </Route>
                            <Route path="/" component={MarketingApp} />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>
    )
}