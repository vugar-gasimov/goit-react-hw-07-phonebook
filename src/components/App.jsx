import React from 'react';
import { PhoneBook } from './PhoneBook/PhoneBook';
import { Header } from './Header';
import { Route, Routes } from 'react-router-dom';
import NotFound from 'Pages/NotFound';
import BgImg from '../images/R.jpg';
import styled from 'styled-components';
const App = () => {
  return (
    <Wrapper>
      <Header />
      <Routes>
        <Route path="/" element={<PhoneBook />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  background-image: url(${BgImg});

  min-height: 100vh;
  background-size: cover;
  background-position: center;
`;
