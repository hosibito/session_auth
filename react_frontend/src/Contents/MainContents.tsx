import styled from "styled-components";

const Conteiner = styled.div`
    width: 100%;  
    height: 100%; 
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

function MainContents() {
    return (
        <Conteiner>
            <h1>MainContents</h1>
        </Conteiner>
    )
}

export default MainContents;