import React from "react";
import ReactSlider from 'react-slider'
import "./RangeSlider.css";

const RangeSlider = (props) => {

    return(
        <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        defaultValue={["0", "50"]}
        marks={[10]}
        markClassName="example-mark"
        max={100}
        ariaLabel={['Lower thumb', 'Upper thumb']}
        ariaValuetext={state => `Thumb value ${state.valueNow}`}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        pearling
        minDistance={10}
        />
    );
}

export {RangeSlider};