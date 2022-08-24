import React, { useEffect, useState } from 'react'
import '../spinWheel.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSackDollar } from '@fortawesome/free-solid-svg-icons'

const SpinWheel = ({ user, updateMoney, handleExpGain, updateMoneyDecrease }) => {
    const [wheelSpin, setWheelSpin] = useState(0)
    const [prize, setPrize] = useState(null)
    const [showExp, setShowExp] = useState({ show: false, xp: null })


    const getChoice = () => {
        const degrees = [
            0,
            45,
            90,
            135,
            180,
            225,
            270,
            315,
            360,
        ]
        const random = Math.ceil(Math.random() * 32);
        console.log(random)

        if (random >= 0 && random <= 8) {
            const spin = degrees[random]
            setWheelSpin(- spin)
            return (prizes[random])
        }
        else if (random >= 9 && random <= 17) {
            const spin = degrees[random - 9]
            setWheelSpin(- (spin + 360))
            return (prizes[random - 9])
        }
        else if (random >= 18 && random <= 26) {
            const spin = degrees[random - 18]
            setWheelSpin(- (spin + 720))
            return (prizes[random - 18])
        }
        else if (random >= 27 && random <= 35) {
            const spin = degrees[random - 27]
            setWheelSpin(- (spin + 1080))
            return (prizes[random - 27])
        }
    }

    const prizes = [
        100,
        300,
        150,
        0,
        500,
        1,
        1000,
        180,
        100
    ]



    const handleClick = () => {
        // If user can't afford, return:
        if (user.money < 150) {
            alert(`You need ${300 - user.money} coins to spin the wheel!`)
            return
        }
        // Take money from the user:
        updateMoneyDecrease(300)

        // Spins the wheel and returns the prize 
        const prizeValue = getChoice()
        console.log(prizeValue)

        // waits 5 secs till wheel stops to set prize
        setTimeout(() => {
            // Setting to null before change incase state becomes the same
            setPrize(null)
            setPrize(prizeValue)
            handleExpGain(25)
            displayExp(25)
        }, 5000)
    }

    // Whenever prize changes update users money
    useEffect(() => {
        updateMoney(prize)
    }, [prize])

    // Call to display the xp gain
    const displayExp = (xp) => {
        setShowExp({ show: true, xp: xp })
        setTimeout(() => {
            setShowExp({ show: false, xp: null })
        }, 4000)
    }

    const ExpDisplay = () => {
        return (
            <div className="xp-display">+{showExp.xp}xp</div>
        )
    }




    return (
        <>
            {showExp.show && <ExpDisplay />}
            <div style={{ position: 'relative' }}>

                <button id="spin" onClick={handleClick}>Spin</button>
                <span className="arrow">⬇</span>
                <div className="wheel-price"><FontAwesomeIcon icon={faSackDollar} />300/ spin</div>
                <div className="prize-box" onClick={handleClick} style={{ cursor: 'pointer' }}>
                    {prize ?
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            ⭐️{prize}⭐️
                            <h6>+25xp</h6>
                        </div>
                        :
                        'SPIN TO WIN!'}
                </div>
                <div className="wheel-container" style={{ transform: "rotate(" + wheelSpin + "deg)" }}>
                    <div className="one">💰{prizes[0]}💰</div>
                    <div className="two">💰{prizes[1]}💰</div>
                    <div className="three">💰{prizes[2]}💰</div>
                    <div className="four">💰{prizes[3]}💰</div>
                    <div className="five">💰{prizes[4]}💰</div>
                    <div className="six">💰{prizes[5]}💰</div>
                    <div className="seven">💰{prizes[6]}💰</div>
                    <div className="eight">💰{prizes[7]}💰</div>
                </div>
            </div>
        </>
    )
}

export default SpinWheel