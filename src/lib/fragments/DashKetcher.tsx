import React, {useCallback, useEffect, useState} from 'react';
import 'ketcher-react/dist/index.css';

import { Editor as KetcherEditor } from 'ketcher-react'

import {StandaloneStructServiceProvider} from 'ketcher-standalone';
import PropTypes from 'prop-types';

const structServiceProvider = new StandaloneStructServiceProvider();

const DashKetcher = (props) => {
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

    // set molecule when props.molecule changes
    useEffect(() => {
        if (ketcher && props.molecule) {
            ketcher.setMolecule(props.molecule);
        }
    }, [props.molecule]);

    const handleClick = () => {
        if(ketcher){
            ketcher.getSmiles().then((smiles) => {
                setMolecule(smiles);
            });
        }
    }

    // set props.molecule when ketcher changes so that it can be read by dash
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

DashKetcher.defaultProps = {};
DashKetcher.propTypes = {
    id: PropTypes.string,

    molecule: PropTypes.string,

    buttonLabel: PropTypes.string,

    setProps: PropTypes.func
}

export default React.memo(DashKetcher);
