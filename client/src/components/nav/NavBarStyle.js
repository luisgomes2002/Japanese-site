import styled from 'styled-components';

export const Nav = styled.nav`
 background-color: transparent;
  width: 100%;
  // position: fixed;
  height: 100px;
  top: 0;
  z-index: 1;
  padding: 1% 10%;
`;

export const NavBarLogo = styled.div `
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 0 10%;

  a {
    text-decoration: none;
    font-size: var(--size-h3);
  }

  h1 {
    color: var(--main-color);
    font-size: 30px;
    margin: 0;
  }
`;

export const NavBarCategories = styled.div `
   display: flex;

   a {
      color: var(--main-color);
      padding: 5%;
    }
`;