import styled from 'styled-components'
import InfoBox from "./InfoBox.jsx";

export default function FeaturePage({ data }) {
    return (
        <Container>
            <h1>{data.name}</h1>
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
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
`