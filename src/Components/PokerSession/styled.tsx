import styled from "styled-components";
import check from "react-icons"
export const PokerSessionWrapper = styled('div')({
    width: '600px',
    height: '80vh',
    padding: '12px'
})

export const GridWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center'
})

export const GridContainer = styled('div')({
    display: "grid",
  gridTemplateRows: "repeat(2, 1fr)", /* Two rows */
  gridTemplateColumns: "repeat(4, 1fr)", /* Four columns */
  gap: "10px", /* Gap between grid items */
})

export const GridItem = styled('button')({
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    padding: '20px',
    textAlign: 'center',
    '&:hover': {
        cursor: 'pointer'
    }
})

export const Divider = styled('div')({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });
  
  export const UsersWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  });
  
  export const UserHolder = styled('div')({
    padding: '20px', // Adjust padding for spacing
    width: '300px',
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px', // Add margin bottom for spacing between user components
  });

// export const HasVotedHolder = styled(check)({
//     height: '30px',
//     width: '30px'
// })