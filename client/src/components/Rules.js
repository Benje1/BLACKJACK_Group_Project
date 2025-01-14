import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import wager from "../static/wager.gif"
import draw from "../static/draw"
import playerHand from "../static/playersHand.png"
import dealerCards from "../static/dealersCards.png"

const Rules = () => {

    const [activeStep, setActiveStep] = useState(0);

    const steps = ['Place Wager', 'Draw Cards', 'Players Hand', 'Dealers Hand'];

    const description = ['Set your wager', 'Click draw cards to start the game', 'The bottom row is the players cards', 'The top row is the dealers cards'];

    const images = [wager, draw, playerHand, dealerCards];

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    const handleReset = () => {
        setActiveStep(0);
    }

    return (
        <div className="wrapper">
            <div className="game-mode-container">
                <div className="rules display" >
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((step, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                return (
                                    <Step key={index} {...stepProps}>
                                        <StepLabel {...labelProps}>{step}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    All Steps completed - you done
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Link to="/"><Button>Return to home</Button></Link>
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Typography sx={{ mt: 2, mb: 1 }}>{description[activeStep]}</Typography>
                                <img src={images[activeStep]} />
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleNext}>
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Box>
                </div>
            </div>


        </div>
    )
}

export default Rules;