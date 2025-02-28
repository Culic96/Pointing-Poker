import styled from "styled-components";

export const BodyWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '20px',
})


export const ModalsWrapper = styled('div')({
    padding: '60px 120px',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    background: '#fff', // Clean white background
    border: '2px solid #ffcc33', // Soft orange border
    gap: '30px',
    zIndex: 10,
    boxShadow: '0px 6px 12px #ffcc33', // Soft orange glow
    borderRadius: '16px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    "&:hover": {
        transform: 'scale(1.02)',
        boxShadow: '0px 8px 18px #ffcc33', // Stronger orange glow on hover
    }
});

export const ModalInput = styled('input')({
    outline: 'none',
    border: '2px solid #ffcc33', // Orange border
    fontSize: '18px',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    backgroundColor: '#fff',
    padding: '12px',
    color: '#333', // Dark text for contrast
    borderRadius: '8px',
    "&:focus": {
        borderColor: 'orange',
        boxShadow: '0px 0px 10px rgba(255, 140, 0, 0.8)',
    }
});

export const ModalButtonsWrapper = styled('div')({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: '20px'
});

export const Paragraph = styled('p')({
    fontSize: '20px',
    color: '#333', // Darker text for readability
});

export const ModalTitle = styled('h2')({
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: 'orange',
    textShadow: '0px 0px 8px rgba(255, 140, 0, 0.5)', // Soft glow for emphasis
    letterSpacing: '1px',
});
