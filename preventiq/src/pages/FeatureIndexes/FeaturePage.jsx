import styled from 'styled-components'
import InfoBox from "./InfoBox.jsx";
import {Zap} from "lucide-react";
import React from "react";
import MiniChartBox from "./MiniChartBox.jsx";
import RecommendationCard from "./RecommendationCard.jsx";


export default function FeaturePage({ data, page }) {
    console.log(page)
    console.log(data[page])

    const getPageName = {
        "pollen": "Pollen",
        "city_density": "City Density",
        "green_density": "Green Density",
        "air_pollution": "Air Pollution",
        "uv": "UV",
        "ozone_density": "Ozone Density",
    }

    return (
        <Container>
            <h1>{getPageName[page]}</h1>
            <MiniChartBox/>
            <RecommendationCard/>

            <BoxWrapper>
                {
                    typeof data[page] === "object" ?
                        Object.entries(data[page]).map(([key, value], index) => (
                            <InfoBox key={index} data={{ page: page, key: key, value: value }} />
                        )) : <InfoBox data={{ page: page, value: data[page] }} />
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
    padding-top: 0;

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