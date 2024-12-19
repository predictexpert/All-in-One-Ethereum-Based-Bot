import { Grow } from '@mui/material';
import styled from 'styled-components';

const CharacterId = ({ image, name }) => {
    return (
        <Container>
            <Grow in={true}>
                <Image src={image} />
            </Grow>
            <Name>{name}</Name>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;
const Image = styled.img`
    height: 250px;
    width: 250px;
    border-radius: 500px;
`;
const Name = styled.p`
    font-size: 1.5rem;
    font-weight: 900;
    color: white;

    text-align: center;
`;

export default CharacterId;
