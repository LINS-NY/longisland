import * as React from 'react';
import styled from 'styled-components';

// Create a styled component for the link
const PhoneLink = styled.a``;

export default function PhoneIcon() {
  return (
    <div >
      <PhoneLink 
        href="tel:(856)776-8105" 
      >
        Call US
      </PhoneLink>
    </div>
  );
}