import { useEffect, useState } from 'react';
import { GiLaserGun } from 'react-icons/gi';
import { FaExchangeAlt } from 'react-icons/fa';
import { AiOutlineLineChart, AiOutlineRobot, AiOutlineClose } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Sidebar = ({ show, toggle }) => {
    const location = useLocation();
    const [active, setActive] = useState(location.pathname);
    const [isMinimized, setIsMinimized] = useState(false);

    const handleResize = e => {
        setIsMinimized(document.body.clientWidth <= 1028);
    };

    useEffect(() => {
        setActive(location.pathname);
    }, [location]);

    useEffect(() => {
        setIsMinimized(document.body.clientWidth <= 1028);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener(handleResize);
    }, []);

    return (
        <Container show={show} minimized={isMinimized ? '1' : undefined}>
            <LogoButtonContainer>
                <LogoContainer>
                    <StyledGiLaserGun />
                    <TextContainer>
                        <CryptoText>CRYPTO</CryptoText>
                        <SniprText>snpr</SniprText>
                    </TextContainer>
                </LogoContainer>
                <StyledAiOutlineClose minimized={isMinimized ? '1' : undefined} onClick={() => toggle(false)} />
            </LogoButtonContainer>
            <LinksContainer>
                <LinkItem active={active} key='/' path='/'>
                    <StyledLink to='/'>
                        <Label>Exchange</Label>
                        <StyledFaExchangeAlt />
                    </StyledLink>
                </LinkItem>
                <LinkItem active={active} key='/auto' path='/auto'>
                    <StyledLink to='auto'>
                        <Label>Auto Trade</Label>
                        <StyledAiOutlineRobot />
                    </StyledLink>
                </LinkItem>
                <LinkItem active={active} key='/limit' path='/limit'>
                    <StyledLink to='limit'>
                        <Label>Limit Order</Label>
                        <StyledAiOutlineLineChart />
                    </StyledLink>
                </LinkItem>
                <LinkItem active={active} key='/flashloan' path='/grapflashloanhql'>
                    <StyledLink to='flashloan'>
                        <Label>Flash Loan</Label>
                        <StyledAiOutlineLineChart />
                    </StyledLink>
                </LinkItem>
                <LinkItem active={active} key='/graphql' path='/graphql'>
                    <StyledLink to='graphql'>
                        <Label>Graphql Test</Label>
                        <StyledAiOutlineLineChart />
                    </StyledLink>
                </LinkItem>
                <LinkItem active={active} key='/escrow' path='/escrow'>
                    <StyledLink to='escrow'>
                        <Label>Escrow</Label>
                        <StyledAiOutlineLineChart />
                    </StyledLink>
                </LinkItem>
            </LinksContainer>
        </Container>
    );
};

const Container = styled.div`
    display: ${({ show, minimized }) => (show || !minimized ? 'flex' : 'none')};
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;

    min-height: 100vh;
    width: 250px;
    padding: 20px;
    gap: 70px;
    z-index: 10;

    background-color: hsl(216, 41%, 15%, 0.9);
`;
const LogoContainer = styled.div`
    display: flex;

    width: 100%;
`;
const TextContainer = styled.div`
    line-height: 15px;
`;

const CryptoText = styled.p`
    color: white;
    font-size: 0.8rem;
`;
const SniprText = styled.p`
    color: white;
    font-size: 1.4rem;
    font-weight: 900;
    letter-spacing: 5px;
`;

const LinksContainer = styled.ul`
    padding: 10px;
`;

const LogoButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const LinkItem = styled.li`
    margin-bottom: 10px;
    padding: 10px;
    height: 40px;
    border-radius: 10px;

    background-color: ${({ active, path }) =>
        active === path || ((path !== '/' && active !== '/') && active.match(path))
            ? 'rgb(128, 128, 128, 0.2)'
            : 'transparent'};
    cursor: pointer;

    p,
    a {
        color: ${({ active, path }) =>
            active === path || ((path !== '/' && active !== '/') && active.match(path))
                ? 'hsl(194, 81%, 46%)'
                : 'gray'};
    }

    &:hover {
        background-color: rgb(128, 128, 128, 0.2);

        p,
        a {
            color: hsl(194, 81%, 46%);
        }
    }
`;
const StyledLink = styled(Link)`
    display: flex;
    justify-content: flex-end;
    flex-direction: row-reverse;
    align-items: center;

    gap: 8px;

    font-size: 1rem;
    font-weight: 400;
`;

const Label = styled.p``;

// ICONS

const StyledGiLaserGun = styled(GiLaserGun)`
    font-size: 2.4rem;
    color: hsl(0, 0%, 100%);
`;

const StyledFaExchangeAlt = styled(FaExchangeAlt)``;
const StyledAiOutlineRobot = styled(AiOutlineRobot)``;
const StyledAiOutlineLineChart = styled(AiOutlineLineChart)``;
const StyledAiOutlineClose = styled(AiOutlineClose)`
    cursor: pointer;
    padding: 8px;
    font-size: 2rem;
    border-radius: 20px;
    border: 1px solid rgb(180, 180, 180, 0.3);
    display: ${({ minimized }) => (minimized ? 'block' : 'none')};
    opacity: 0.5;
    color: white;

    &:hover {
        opacity: 1;
    }
`;

export default Sidebar;
