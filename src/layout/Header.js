import React from 'react';
import Flex from '../components/Flex';

const Header = () => (
  <Flex
    boxShadow="md"
    backgroundColor="white"
    justifyContent="center"
    alignItems="center"
    padding="sm">
    <a href="/" title="Home">
      <img height="80px" src="/recipe-logo.png" alt="Recipe List Logo" />
    </a>
  </Flex>
);

export default Header;
