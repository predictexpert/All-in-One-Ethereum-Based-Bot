import styled from 'styled-components';
import { RiSettings4Fill } from 'react-icons/ri';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState } from 'react';
import Setting from './Setting';
import { Modal } from '@mui/material';

const Header = ({ toggle, sidebarVisible, onSettingClick }) => {
    const [showSetting, setShowSetting] = useState(false);

    const handleSetting = () => {
        setShowSetting(true);
    };

    const handleCloseSetting = () => {
        setShowSetting(false);
    };

    return (
        <Container>
            <StyledGiHamburgerMenu onClick={() => toggle(true)} visible={sidebarVisible ? undefined : '1'} />
            <MainOptionsContainer>
                <ConnectWalletButton>Connect wallet</ConnectWalletButton>
                <StyledRiSettings4Fill onClick={handleSetting} />
            </MainOptionsContainer>

            <Modal
                open={showSetting}
                onClose={handleCloseSetting}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
                sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Setting onFinish={setShowSetting}/>
            </Modal>
        </Container>
    );
};

const Container = styled.div`
    z-index: 5;
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    padding-left: 4rem;
    padding-right: 4rem;

    background-color: hsl(216, 41%, 15%, 0.2);

    height: 90px;
`;

const ConnectWalletButton = styled.button`
    cursor: pointer;
    font-weight: 500;
    padding: 12px 20px 12px 20px;
    border-radius: 10px 20px 10px 20px;
    background-color: rgb(23, 169, 214, 0.2);
    color: hsl(194, 81%, 50%);
    border-style: none;

    &:hover {
        border: 1px solid;
    }
`;

const StyledRiSettings4Fill = styled(RiSettings4Fill)`
    cursor: pointer;
    font-size: 2.2rem;
    color: rgb(128, 128, 128);
    background-color: rgb(128, 128, 128, 0.1);
    padding: 5px;
    border-radius: 5px;

    &:hover {
        background-color: rgb(0, 0, 0, 0.4);
    }
`;

const MainOptionsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

const StyledGiHamburgerMenu = styled(GiHamburgerMenu)`
    visibility: ${({ visible }) => (visible == '1' ? 'visible' : 'hidden')};
    cursor: pointer;
    color: gray;
    font-size: 1.8rem;

    &:hover {
        color: hsl(194, 81%, 50%);
    }
`;

export default Header;
