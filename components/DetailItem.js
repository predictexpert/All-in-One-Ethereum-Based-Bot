import styled from 'styled-components';

const DetailItem = ({ name, description }) => {
    return (
        <Container>
            <Name>{name}</Name>
            <Description>{description}</Description>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    gap: 30px;

    justify-content: space-between;

    width: 100%;
    padding-bottom: 10px;
    border-bottom: 0.1px solid rgb(180, 180, 180, 0.4);
`;

const Name = styled.p`
    color: white;
    font-size: 2rem;
    flex: 1 0 25%;
    color: hsl(160, 100%, 40%);
`;
const Description = styled.p`
    color: white;
    font-size: 2rem;
    flex: 1 50%;
    font-weight: 300;
`;

export default DetailItem;
