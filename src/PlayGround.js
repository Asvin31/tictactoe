import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function PlayGround() {
    const [layout, setLayout] = useState(Array(9).fill(null));
    const [valueToBeUsed, setValueToBeUsed] = useState('X');
    const [winner, setWinner] = useState(null);
    const [disableClick, setDisableClick] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const style = {
        background: '#fff',
        border: '2px solid #51d1e1',
        fontSize: '30px',
        fontWeight: '800',
        cursor: 'pointer',
        outline: 'none'
    }
    const checkWinner = (layout) => {
        const winningPositions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < winningPositions.length; i++) {
            const [x, y, z] = winningPositions[i];
            if (layout[x] && layout[x] === layout[y] && layout[x] === layout[z]) {
                return layout[x];
            }
        }
        return null;
    }
    const handleClick = (e, i) => {
        let tempLayout = [...layout];
        tempLayout[i] = valueToBeUsed;
        setLayout(tempLayout);
        let winner = checkWinner(tempLayout);
        if (winner != null) {
            setWinner(winner);
            setDisableClick(true);
        }
        else {
            valueToBeUsed === 'X' ? setValueToBeUsed('O') : setValueToBeUsed('X')
            if (!checkLayoutFilled(tempLayout)) {
                setDisableClick(true);
                setGameOver(true);
            }
        }
    }
    const handleReset = () => {
        setLayout(Array(9).fill(null))
        setWinner(null);
        setDisableClick(false)
        setGameOver(false);
    }
    const checkLayoutFilled = (layout) => {
        return layout.some(item => item === null);
    }

    useEffect(() => {
        if (valueToBeUsed === 'O') {
            let tempLayout = [...layout];
            const availablePlaces = [];
            for (let i = 0; i < tempLayout.length; i++) {
                if (tempLayout[i] === null) {
                    availablePlaces.push(i);
                }
            }
            var item = availablePlaces[Math.floor(Math.random() * availablePlaces.length)];
            if (item !== undefined || item !== null) {
                tempLayout[item] = valueToBeUsed;
                setLayout(tempLayout);
                setValueToBeUsed('X')
            }
        }
    }, [valueToBeUsed])
    return (
        <>
            <Grid container item sm={12} xs={12} md={4}>
                {layout.map((eachBox, i) => (
                    <Grid item sm={4} xs={4} md={4} key={i} style={style}>
                        <Button
                            key={i}
                            fullWidth
                            sx={{ height: '100%' }}
                            onClick={(e) => handleClick(e, i)}
                            disabled={disableClick}
                        >
                            {eachBox}
                        </Button>
                    </Grid>
                ))}
            </Grid>
            <Grid container item sm={12} xs={12} md={12} justifyContent="center">
                {!gameOver &&
                    <Typography align="center">
                        {winner ? 'Winner : ' + winner : 'Next Player : '
                            + (valueToBeUsed === 'X' ? 'X' : 'O')}
                    </Typography>
                }
                {gameOver &&
                    <Typography align="center">
                        {"Game Over :("}
                    </Typography>
                }
            </Grid>
            <Grid container item sm={12} xs={12} md={2} justifyContent="center">
                {disableClick &&
                    <Button
                        fullWidth
                        sx={{ height: '100%' }}
                        onClick={handleReset}
                    >
                        Reset
                    </Button>}
            </Grid>
        </>
    )
};
