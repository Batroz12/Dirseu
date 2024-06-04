import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';


const Carrusel = (props) =>{
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const {images}=props;


  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevActiveStep) => (prevActiveStep === images.length - 1 ? 0 : prevActiveStep + 1));
    }, 5000); 

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);


  const handleNext = () => {
    if (activeStep === 5) {
        // Si el paso activo es igual a 5, regresa al inicio (0)
        setActiveStep(0);
      } else {
        // De lo contrario, avanza al siguiente paso normalmente
        setActiveStep((prevActiveStep) => (prevActiveStep === images - 1 ? 0 : prevActiveStep + 1));
      }
    };
    const handleBack = () => {
        if (activeStep === 0) {
            // Si el paso activo es igual a 5, regresa al inicio (0)
            setActiveStep(5);
          } else {
            // De lo contrario, avanza al siguiente paso normalmente
            setActiveStep((prevActiveStep) => (prevActiveStep === images - 1 ? 0 : prevActiveStep - 1));
          }
        };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: "100%"}}>
      <img src={images[activeStep]} 
      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: "cover",height:"500px",width:"500px" }}
      />
      
      <MobileStepper
        variant="dots"
        steps={images.length} 
        position="static"
        activeStep={activeStep}
        sx={{maxHeight:"100%", width: "100%" , flexGrow: 1,  boxSizing: "border-box", }}
        nextButton={
          
          <Button size="small" onClick={handleNext} disabled={activeStep === images + 1}>
        
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === images - 1}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
    </div>
  );
  
}
export default Carrusel;