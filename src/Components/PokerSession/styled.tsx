import styled from "styled-components";
export const PokerSessionWrapper = styled('div')({
    width: '800px',
    padding: '12px',
})

export const GridWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '20px'
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
    justifyContent: 'flex-start',
    alignItems: 'center',
  });

export const ButtonsWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '20px',
  padding: '20px'
})

export const PrimaryButton = styled('button')({
  outline: 0,
  padding: '10px',
  color: 'white',
  border: '2px solid transparent',
  textAlign: 'center',
  backgroundColor: 'orange',
  fontSize: '24px',
  transition: '0.3s ease',
  "&:hover": {
    backgroundColor: '#ffcc33',
    cursor: 'pointer',
    transition: '0.3s ease',
    border: '2px solid orange'
  }
})
  
  export const UsersWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  });
  
  export const UserHolder = styled('div')({
    padding: '10px', // Adjust padding for spacing
    width: '500px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px', // Add margin bottom for spacing between user components
  });

  export const UserInfoHolder = styled('div')<{ isOpened: boolean }>(
    { 
      width: '33%',
      height: '100%',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      transition: 'background-color, 0,5s, ease',
    },
    ({ isOpened }) => ({
      ...(isOpened ? {} : { visibility: 'hidden',    }),
    })
  );

  export const UserPointsHolder = styled('div')<{ isOpened: boolean }>(
    { 
      width: '33%',
      height: '100%',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    ({ isOpened }) => ({
      ...(isOpened ? {} : { backgroundColor: 'black' }),
    })
  );
