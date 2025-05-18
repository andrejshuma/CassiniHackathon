import React from 'react';
import {
    CircularProgressbar,
    buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const AnalyticsScore = ({ score }) => {


    return (
        <div style={{ width: 120, height: 120 }}>
            <CircularProgressbar
                value={score*100}
                text={`${score*100}%`}
                strokeWidth={10}
                styles={buildStyles({
                    textColor: "#fff",
                    pathColor: "white",
                    trailColor: "rgba(221,221,221,0.2)",
                    textSize: '24px'
                })}
            />
        </div>
    );
};

export default AnalyticsScore;
