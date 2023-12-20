import React, { useCallback, useEffect, useState } from 'react';
import 'ketcher-react/dist/index.css';

import { Editor } from 'ketcher-react'

import { StandaloneStructServiceProvider } from 'ketcher-standalone';
import PropTypes from 'prop-types';

const structServiceProvider = new StandaloneStructServiceProvider();

const DashKetcher = (props) => {
    const { id } = props;
    const [ketcher, setKetcher] = useState(null);
    const [input_molecule, setInputMolecule] = useState(props.input_molecule);
    const [output_molecule, setOutputMolecule] = useState(props.output_molecule);
    let button_className = props.button_className;
    if (!button_className) button_className = "btn btn-primary"

    const onChange = (ketcher) => {
        if (ketcher) {
            ketcher.getSmiles().then((smiles) => {
                setOutputMolecule(smiles);
            });
        }
    }

    const handleKetcherInit = useCallback(
        (ketcher) => {
            (window as any).ketcher = ketcher;
            ketcher.setSettings({ "general.dearomatize-on-load": true });
            setKetcher(ketcher);
            if (input_molecule) {
                ketcher.setMolecule(input_molecule);
            }
            ketcher.editor.subscribe('change', operations => { onChange(ketcher) })

            window.parent.postMessage(
                {
                    eventType: 'init',
                },
                '*',
            );
        },
        [input_molecule]
    );

    // set molecule when props.molecule changes
    useEffect(() => {
        if (ketcher && props.input_molecule) {
            ketcher.setMolecule(props.input_molecule);
        }
    }, [props.input_molecule]);

    // set props.molecule when ketcher changes so that it can be read by dash
    useEffect(() => {
        props.setProps({ output_molecule });
    }, [output_molecule]);

    return (
        <div id={id} style={props.style}>
            {!ketcher && (<div>Loading ketcher</div>)}
            <Editor
                staticResourcesUrl={"/"}
                structServiceProvider={structServiceProvider}
                errorHandler={(message) => {
                    console.log(message.toString());
                }}
                onInit={handleKetcherInit}
            />
        </div>
    );
};

DashKetcher.defaultProps = {};
DashKetcher.propTypes = {
    id: PropTypes.string,

    input_molecule: PropTypes.string,

    output_molecule: PropTypes.string,

    style: PropTypes.object,

    setProps: PropTypes.func
}

export default React.memo(DashKetcher);
