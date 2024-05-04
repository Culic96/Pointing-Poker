import styled from "styled-components";

export const PokerSessionWrapper = styled('div')({
  width: '800px',
  padding: '12px',
  '@media (max-width: 380px)': {
    width: '100%', // Adjust width for smaller screens
    padding: '8px', // Adjust padding for smaller screens
  }
});

export const IntroHeading = styled('h2')({
  color: 'orange',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'left',
  lineHeight: '1.2',
  marginBottom: '20px',
  textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
  '@media (max-width: 380px)': {
    fontSize: '20px', // Decrease font size for smaller screens
    marginBottom: '16px', // Decrease margin bottom for smaller screens
  }
});

export const GridWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  padding: '20px'
});

export const GridContainer = styled('div')({
  display: "grid",
  gridTemplateRows: "repeat(2, 1fr)",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "10px",
});

export const GridItem = styled('button')<{activeIndex: boolean}>({
  backgroundColor: '#f0f0f0',
  border: '3px solid #ccc',
  padding: '10px',
  width: '120px',
  textAlign: 'center',
  transition: 'border 0.3s ease',
  '&:hover': {
    cursor: 'pointer'
  },
  borderRadius: '16px',
  boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)',
  '@media (max-width: 380px)': {
    padding: '8px', // Decrease padding for smaller screens
    width: '100px', // Decrease width for smaller screens
  }
},
({ activeIndex }) => ({
  ...(activeIndex && {
    border: '3px solid orange',
    transition: 'border 0.3s ease'
  })
}));

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
});

export const PrimaryButton = styled('button')({
  outline: 0,
  padding: '12px 20px',
  color: 'white',
  border: 'none',
  textAlign: 'center',
  backgroundColor: 'orange',
  fontSize: '20px',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  borderRadius: '24px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  "&:hover": {
    backgroundColor: '#ffcc33',
    cursor: 'pointer',
    transform: 'scale(1.05)',
  },
  '@media (max-width: 380px)': {
    fontSize: '16px', // Decrease font size for smaller screens
    padding: '10px 16px', // Decrease padding for smaller screens
  }
});

export const UsersWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'flex-start',
});

export const UserHolder = styled('div')({
  padding: '10px',
  width: '500px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '10px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  '@media (max-width: 380px)': {
    width: '100%', // Adjust width for smaller screens
  }
});


export const UserInfoHolder = styled('div')<{ isOpened: boolean }>(
  { 
    width: '33%',
    height: '25px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    transition: 'backgroundColor 0,5s ease',
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

export const StatisticsWrapper = styled("div")<{ isOpen: boolean }>(
  {
    padding: "20px",
    display: "none",
    textAlign: "center",
    width: "300px",
    height: "200px",
    backgroundColor: "#fff",
    flexDirection: "column",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",

    h2: {
      fontSize: "22px",
      color: "#000",
      marginBottom: "10px",
    },
  },
  ({ isOpen }) => ({
    ...(isOpen && {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "column",
    }),
  })
);

export const StatisticOverviewHolder = styled("div")({
  ul: {
    listStyle: "none",
    padding: '10px',
    margin: 0,
  },

  li: {
    fontSize: "18px",
    color: "#000",
    marginBottom: "5px",
  },
});
