// Container component
import React from 'react';
import styled from "styled-components";

const ContainerWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 1200px) {
    max-width: 100%;
  }
  
  @media (max-width: 768px) {
    padding: 0 10px;
  }
  
  @media (max-width: 480px) {
    padding: 0 5px;
  }
`;

type ContainerProps = {
  children: React.ReactNode;
}

const Container = ({children}: ContainerProps) => {
  return (
    <ContainerWrapper>
      {children}
    </ContainerWrapper>
  );
};

export default Container;