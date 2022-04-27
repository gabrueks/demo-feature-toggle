import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux'
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';

import { LAUNCH_DARKLY_CLIENT_SIDE_ID } from './config';

import Login from './pages/Login/Login';
import Message from './pages/Message/Message';
import AppWrapper from './pages/AppWrapper/AppWrapper';

function Router() {
    const jwt = useSelector(state => state.user.jwt);
    const phone = useSelector(state => state.user.phone);

    const [LDComponent, setLDComponent] = useState(null);

    useEffect(() => {
        if (jwt !== '' && phone !== '') {
            asyncWithLDProvider({
                clientSideID: LAUNCH_DARKLY_CLIENT_SIDE_ID,
                user: {
                    key: phone,
                },
            }).then(Component => {
                setLDComponent(<Component children={
                    <BrowserRouter>
                        <Routes>
                        <Route path="/" element={<AppWrapper><Login /></AppWrapper>}/>
                        <Route path="/message" element={<AppWrapper><Message /></AppWrapper>}/>
                        </Routes>
                    </BrowserRouter>}/>);
            }).catch(console.log);
        }
    }, [jwt, phone]);

    if (LDComponent) {
        return LDComponent;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppWrapper><Login /></AppWrapper>}/>
                <Route path="/message" element={<AppWrapper><Message /></AppWrapper>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;
