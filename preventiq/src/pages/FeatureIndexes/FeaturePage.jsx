import styled from 'styled-components'
import InfoBox from "./InfoBox.jsx";
import {Zap} from "lucide-react";
import React from "react";
import MiniChartBox from "./MiniChartBox.jsx";
import RecommendationCard from "./RecommendationCard.jsx";


export default function FeaturePage({data}) {
    return (
        <Container>
            <h1>{data.name}</h1>
            <MiniChartBox/>
            <RecommendationCard/>

            <BoxWrapper>
                {
                    data.array.map((item, index) => (
                        <InfoBox key={index} data={item}/>
                    ))
                }
            </BoxWrapper>




        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    height: 100%;
    //background-color: #000;
    color: #333;
    padding: 1rem;

    & > h1 {
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 20px;
    }

`

const BoxWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    width: 100%;
`