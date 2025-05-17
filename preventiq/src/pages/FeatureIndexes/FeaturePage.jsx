import styled from 'styled-components'
import InfoBox from "./InfoBox.jsx";

export default function FeaturePage({ featureName }) {
    const data = [
        {
            "name": "Pollen Tree",
            "index": 0.2,
            "description": "Pollen Three is a type of pollen that is common in the spring and summer months.",
        },
        {
            "name": "Pollen Weed",
            "index": 0.5,
            "description": "Pollen Weed is a type of pollen that is common in the spring and summer months.",
        },
        {
            "name": "Pollen Grass",
            "index": 0.8,
            "description": "Pollen v is a type of pollen that is common in the spring and summer months.",
        },
        {
            "name": "Pollen Tree",
            "index": 0.2,
            "description": "Pollen Three is a type of pollen that is common in the spring and summer months.",
        },
        {
            "name": "Pollen Weed",
            "index": 0.5,
            "description": "Pollen Weed is a type of pollen that is common in the spring and summer months.",
        },
    ]
    return (
        <Container>
            <h1>Pollen Features</h1>
            <BoxWrapper>
                {
                    data.map((item, index) => (
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
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: #000;
    color: #333;
    padding: 1rem;
    
    h1 {
        font-size: 2rem;
        margin-bottom: 20px;
    }
    
`

const BoxWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
`