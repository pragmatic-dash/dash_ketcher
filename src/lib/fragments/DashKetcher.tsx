import React, {useCallback, useEffect, useState} from 'react';
import 'ketcher-react/dist/index.css';

import { Editor as KetcherEditor } from 'ketcher-react'

import {StandaloneStructServiceProvider} from 'ketcher-standalone';
import PropTypes from 'prop-types';

const structServiceProvider = new StandaloneStructServiceProvider();

const PlotlyDashKetcher = (props) => {
    const { id } = props;
    const [ketcher, setKetcher] = useState(null);
    const [molecule, setMolecule] = useState(props.molecule);
    const [buttonLabel] = useState(props.buttonLabel);

    const handleKetcherInit = useCallback(
        (ketcher) => {
            (window as any).ketcher = ketcher;
            ketcher.setSettings({ "general.dearomatize-on-load": true });
            setKetcher(ketcher);
            if (molecule) {
                ketcher.setMolecule(molecule);
            }

            window.parent.postMessage(
                {
                    eventType: 'init',
                },
                '*',
            );
        },
        [molecule]
    );

    const handleClick = () => {
        if(ketcher){
            ketcher.getSmiles().then((smiles) => {
                setMolecule(smiles);
            });
        }
    }

    useEffect(() => {
        props.setProps({ molecule });
    }, [molecule]);

    return (
        <div id={id}>
            {!ketcher && (<div>Loading ketcher</div>) }
            <KetcherEditor
                staticResourcesUrl={"/"}
                errorHandler={(message) => {
                    console.log(message.toString());
                }}
                structServiceProvider={structServiceProvider}
                onInit={handleKetcherInit}
            />
            <button onClick={handleClick} className="btn btn-primary">{ buttonLabel }</button>
        </div>
    );
};

PlotlyDashKetcher.defaultProps = {};
PlotlyDashKetcher.propTypes = {
    /**
     * Unique ID to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    molecule: PropTypes.string,

    buttonLabel: PropTypes.string,
    /**
     * Update props to trigger callbacks.
     */
    setProps: PropTypes.func
}

export default PlotlyDashKetcher;
