import React ,{lazy, Suspense,useState}from "react"
import ReactDOM from 'react-dom';

import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";
import { BrowserRouter,Route, Switch } from "react-router-dom";

import Progress from "./components/Progress";
const AuthApp = lazy(() => import('./components/AuthApp'));
const MarketingApp = lazy(() => import('./components/MarketingApp'));
import Header from "./components/Header";
const generateClassName = createGenerateClassName({
    productionPrefix: 'co',
});
export const App = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)}/>
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth" >
                            <AuthApp onSignIn={() => setIsSignedIn(true)}/> 
                            </Route>
                            <Route path="/" component={MarketingApp} />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </BrowserRouter>
    )
}