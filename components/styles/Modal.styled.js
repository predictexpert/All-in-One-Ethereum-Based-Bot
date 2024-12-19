import styled from 'styled-components';

export const Modal = styled.div`
    display: ${({ show }) => (show ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.1);
    -webkit-backdrop-filter: blur(6px);
    backdrop-filter: blur(6px);
`;
