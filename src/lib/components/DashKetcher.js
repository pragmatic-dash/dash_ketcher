import React from 'react';
import PropTypes from 'prop-types';
import { DashKetcher as RealComponent } from '../LazyLoader';


/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */
const DashKetcher = (props) => {
    return (
        <React.Suspense fallback={null}>
            <RealComponent {...props}/>
        </React.Suspense>
    );
};

DashKetcher.defaultProps = {};

DashKetcher.propTypes = {
    id: PropTypes.string,

    molecule: PropTypes.string,

    buttonLabel: PropTypes.string,

    setProps: PropTypes.func
};

export default DashKetcher;

export const defaultProps = DashKetcher.defaultProps;
export const propTypes = DashKetcher.propTypes;
