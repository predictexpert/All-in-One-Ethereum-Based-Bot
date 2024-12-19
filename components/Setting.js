import { Button, FormLabel, TextField } from '@mui/material';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import usePersist from './hooks/usePersist';

const StyledTextField = styled(TextField)`
    & .MuiOutlinedInput-input {
        color: white;

        &:hover {
            border: 1px solid white;
            outline: 1px solid white;
            border-radius: 5px;
        }
    }

    & .MuiOutlinedInput-notchedOutline {
        border: 1px solid white;
    }

    & .MuiFormHelperText-root {
        color: white;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #011e3c;
    border-radius: 15px;
    padding: 30px;
    gap: 10px;
`;

const Setting = ({ onFinish }) => {
    const [slippage, setSlippage] = usePersist('slippageTolerance', 0.5);
    const [gasFee, setGasFee] = usePersist('gasFee', 5);

    return (
        <Container>
            <FormLabel sx={{ color: 'white' }}>Slippage</FormLabel>
            <StyledTextField
                helperText='Slippage'
                placeholder='0.5'
                onChange={e => setSlippage(e.target.value)}
                value={slippage}
            />

            <FormLabel sx={{ color: 'white' }}>Gas Fee</FormLabel>
            <StyledTextField
                helperText='Gas Fee'
                placeholder='5'
                onChange={e => setGasFee(e.target.value)}
                value={gasFee}
            />

            <Button onClick={() => onFinish(false)}>Finish</Button>
        </Container>
    );
};

export default Setting;
