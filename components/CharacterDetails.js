import styled from "styled-components";
import DetailItem from "./DetailItem";

const CharacterDetails = ({ status, species, created, gender }) => {
    return (
        <Container>
            <DetailItem name='Status' description={status} />
            <DetailItem name='Species' description={species} />
            <DetailItem name='Created' description={new Date(created).toLocaleDateString()} />
            <DetailItem name='Gender' description={gender} />
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    width: 100%;
`;

export default CharacterDetails;
