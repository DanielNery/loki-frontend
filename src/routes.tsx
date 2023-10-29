import { Routes as RoutesDOM, Route } from 'react-router-dom';

import Home from './pages/Home';
import Entry from './pages/Entry';
import Investing from './pages/Investing';

export default function Routes() {
    return (
        <RoutesDOM>
            <Route path='/' element={<Home />} />
            <Route path='/entry' element={<Entry />} />
            <Route path='/investing' element={<Investing />} />
        </RoutesDOM>
    )
}