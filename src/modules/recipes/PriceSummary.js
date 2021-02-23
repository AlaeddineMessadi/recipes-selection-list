import React from 'react';
import Box from '../../components/Box';
import { Col, Row } from '../../components/Grid';
import Flex from '../../components/Flex';

// Create PriceSummary user interface
const PriceSummary = ({ summary, totalPrice }) => (
  <Box width={['290px', '450px']}>
    <Box borderBottomWidth="sm" borderBottomColor="border" borderBottomStyle="solid">
      {summary.map((recipe, index) => (
        <Row key={index}>
          <Col sm={10}>
            <Flex alignItems="center" justifyContent="flex-start">
              <h4>{recipe.title}</h4>
            </Flex>
          </Col>
          <Col sm={2}>
            <Flex alignItems="center" justifyContent="flex-end">
              <Box textAlign="right" mr="xs">
                <h3>{recipe.price}</h3>
              </Box>
            </Flex>
          </Col>
        </Row>
      ))}
    </Box>
    <p>REPLACE ME!</p>
  </Box>
);

export default PriceSummary;
