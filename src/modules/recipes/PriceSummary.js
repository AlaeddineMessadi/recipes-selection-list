import React from 'react';
import Box from '../../components/Box';
import { Col, Row } from '../../components/Grid';
import Flex from '../../components/Flex';
import Text from '../../components/Text';
import { parseRawPrice } from './price';

// Create PriceSummary user interface
const PriceSummary = ({ summary = [], totalPrice = '0' }) => (
  <Box width={['290px', '450px']} margin="sm" data-testid="price-summary">
    <Box borderBottomWidth="sm" borderBottomColor="border" borderBottomStyle="solid">
      {summary.map((recipe, index) => (
        <Row key={index}>
          <Col sm={10}>
            <Flex alignItems="center" justifyContent="flex-start">
              <Text fontSize="md" lineHeight="md" fontWeight="regular" marginBottom="xs">
                {recipe.title}
              </Text>
            </Flex>
          </Col>
          <Col sm={2}>
            <Flex alignItems="center" justifyContent="flex-end">
              <Text fontSize="md" lineHeight="md" fontWeight="regular" marginBottom="xs">
                {parseRawPrice(recipe.price)}
              </Text>
            </Flex>
          </Col>
        </Row>
      ))}
    </Box>
    <Box>
      <Row>
        <Col sm={10}>
          <Flex alignItems="center" justifyContent="flex-start">
            <Text fontSize="md" lineHeight="md" fontWeight="bold" marginTop="xs">
              Total
            </Text>
          </Flex>
        </Col>
        <Col sm={2}>
          <Flex alignItems="center" justifyContent="flex-end">
            <Text fontSize="md" lineHeight="md" fontWeight="bold" marginTop="xs">
              {parseRawPrice(totalPrice)}
            </Text>
          </Flex>
        </Col>
      </Row>
    </Box>
  </Box>
);

export default PriceSummary;
