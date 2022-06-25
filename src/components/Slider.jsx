import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
    console.log(value);
    return `${value}`;
}




const marks = [
    {
        value: 0,
        label: 'January',
    },
    {
        value: 1,
        label: 'February',
    },
    {
        value: 2,
        label: 'March',
    },
    {
        value: 3,
        label: 'April',
    },
    {
        value: 4,
        label: 'May',
    },
    {
        value: 5,
        label: 'June',
    },
    {
        value: 6,
        label: 'July',
    },
    {
        value: 7,
        label: 'August',
    },
    {
        value: 8,
        label: 'Sept',
    },
    {
        value: 9,
        label: 'Oct',
    },
    {
        value: 10,
        label: 'Nov',
    },
    {
        value: 11,
        label: 'Dec',
    },
];
export default function MonthSlider() {
    return (
        <Box
            sx={{
                width: '80%',
                mx: 'auto',

            }}>
            <Slider sx={{
                color: 'blue',
            }}
                aria-label="Custom marks"
                defaultValue={5}
                getAriaValueText={valuetext}
                // getAriaLabel={valuelabel}
                step={1}
                marks={marks}
                min={0}
                max={11}


            />

        </Box>
    );
}
