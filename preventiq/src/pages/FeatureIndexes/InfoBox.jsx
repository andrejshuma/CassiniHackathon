import styled from 'styled-components'
import {Flower, Flower2, Trees} from 'lucide-react';

export default function InfoBox({data}) {
    const getValue = value => {
        if (value > 0.85) return "very high";
        if (value > 0.65) return "high";
        if (value > 0.4) return "medium";
        return "low";
    };

    const getRGB = {
        "very high": "#d7263d",
        "high": "#f46036",
        "medium": "#f7c948",
        "low": "#3bb273"
    };

    const getSVG = {
        "Pollen Tree": <Trees size={24} strokeWidth={2}/>,
        "Pollen Grass": <Flower size={24} strokeWidth={2}/>,
        "Pollen Weed": <Flower2 size={24} strokeWidth={2}/>
    };

    const severity = getValue(data.index);

    return (
        <Wrapper style={{backgroundColor: getRGB[severity]}}>
            <Top>
                {getSVG[data.name]}
                <h1>{data.name}</h1>
            </Top>

            <Center>
                <Number>{data.index}</Number>
            </Center>

            <Bottom>
                <h2>{severity.charAt(0).toUpperCase() + severity.slice(1)}</h2>
            </Bottom>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.5rem;
    background-color: #f0f0f0;
    padding: 1rem;
    border-radius: .8rem;
    color: #fff;
    width: 11rem;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    & h1 {
        font-size: 1.1rem;
        font-weight: 700;
        margin: 0;
    }
`;

const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Number = styled.div`
    font-size: 2rem;
    font-weight: bold;
`;

const Bottom = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;

    & h2 {
        font-size: 1.3rem;
        font-weight: 600;
        margin: 0;
        text-align: center;
    }

    & p {
        font-size: 0.8rem;
        line-height: 1.2;
        margin: 0;
    }
`;
