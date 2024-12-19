
import { CircularProgress } from '@mui/material';
import styled from 'styled-components';

const Sample = () => {
    return (
        <Container>
            <CircularProgress color="success"/>
        </Container>
    );
};

export default Sample;

const Container = styled.div`
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
`;
