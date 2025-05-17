import styled from 'styled-components'
import { Flower, Flower2, Trees,  } from 'lucide-react';

export default function InfoBox({ data }) {
    const getValue = value => {
        if (value > 0.85) {
            return "very high";
        } else if (value > 0.65) {
            return "high";
        } else if (value > 0.4) {
            return "medium";
        } else {
            return "low";
        }
    };
    const getRGB = {
        "very high": "#d7263d",   // deep red (danger)
        "high": "#f46036",        // vivid orange (alert)
        "medium": "#f7c948",      // soft yellow (caution)
        "low": "#3bb273"          // rich green (safe)
    };

    const getSVG = {
        "Pollen Tree": <Trees size={32} strokeWidth={2}/>,
        "Pollen Grass": <Flower size={32} strokeWidth={2}/>,
        "Pollen Weed": <Flower2 size={32} strokeWidth={2}/>
    }


    return (
        <Wrapper style={{ backgroundColor: getRGB[getValue(data.index)] }}>
            <Number>{data.index}</Number>
            <DataWrapper>
                <div>
                    <h1>{data.name}</h1>
                    {getSVG[data.name]}
                </div>
                <div>
                    <h2>{getValue(data.index).charAt(0).toUpperCase() + getValue(data.index).slice(1)}</h2>
                    <p>{data.description}</p>
                </div>
            </DataWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    height: fit-content;
    background-color: #f0f0f0;
    padding: 1rem;
    border-radius: .8rem;
    color: #fff;
`

const Number = styled.div`
    font-size: 3rem;
    font-weight: bold;
`

const DataWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    
    & h1 {
        font-size: 1.4rem;
        margin: 0;
        line-height: 1;
        font-weight: 700;
    }

    & h2 {
        font-size: 1.2rem;
        margin: 0;
        line-height: 1;
        font-weight: 500;
    }

    & > div:first-child {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        
    }
    & > div:nth-child(2) {
        display: flex;
        flex-direction: column;
        gap: .4rem;
        width: 100%;

        & > p {
            font-size: 1.2rem;
        }
    }
    
`
