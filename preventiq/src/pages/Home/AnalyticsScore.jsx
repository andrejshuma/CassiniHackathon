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
                value={score}
                text={`${score}%`}
                strokeWidth={10}
                styles={buildStyles({
                    textColor: "#fff",
                    pathColor: "white",
                    trailColor: "rgba(225,225,225,0.4)",
                    textSize: '24px'
                })}
            />
        </div>
    );
};

export default AnalyticsScore;
