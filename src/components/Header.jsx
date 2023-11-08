import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Header = () => {
  return (
    <HeaderContainer>
      <StyledNavLink to="/">Phone book</StyledNavLink>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0,
    rgba(0, 0, 0, 0.8) 100%
  );
  text-decoration: none;

  width: -webkit-fill-available;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #c850c0;
`;
