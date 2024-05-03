import styled from "styled-components";

export const HeaderWrapper = styled('div')({
  height: '10vh',
  width: '100vw',
  backgroundColor: '#fff',
  borderBottom: '3px solid #f0f0f0',
  display: 'flex',
  justifyContent: 'center', /* Center align content horizontally */
  alignItems: 'center', /* Center align content vertically */
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  
  /* Media query for smaller screens */
  '@media (max-width: 360px)': {
    height: '15vh', /* Increase height for better visibility on smaller screens */
  }
});

export const ImageWrapper = styled('div')({
  width: '50%',
  height: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingLeft: '20px', /* Reduce left padding for smaller screens */
  gap: '10px',
  
  /* Media query for smaller screens */
  '@media (max-width: 360px)': {
    width: '100%', /* Full width for smaller screens */
    justifyContent: 'center', /* Center align content horizontally */
    paddingLeft: '0', /* Remove left padding for smaller screens */
    gap: '5px' /* Reduce gap for smaller screens */
  }
});

export const HeaderTitle = styled('h2')({
  color: 'orange',
  fontSize: '32px',
  
  /* Media query for smaller screens */
  '@media (max-width: 360px)': {
    fontSize: '24px' /* Reduce font size for smaller screens */
  }
});