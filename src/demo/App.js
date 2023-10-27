/* eslint no-magic-numbers: 0 */
import React, { useState } from 'react';

import { DashKetcher } from '../lib';

const App = () => {

    const [state, setState] = useState({value:'', label:'Type Here'});
    const setProps = (newProps) => {
            newProps.label = "test"
            setState(newProps);
        };

    return (
        <div>
            <DashKetcher
                setProps={setProps}
                {...state}
            />
        </div>
    )
};


export default App;
