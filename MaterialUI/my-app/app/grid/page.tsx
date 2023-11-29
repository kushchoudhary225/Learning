import React from 'react'
import { Grid } from '@mui/material'
const Grid1 = () => {
    return <>
        <Grid container >
            <Grid item xs={12} sm={6} md={3}  className='border-2 border-red-500'>
                <p className='text-center text-white'>1</p>
            </Grid>
            <Grid item  xs={12} sm={6} md={3}  className='border-2 border-red-500'>
            <p className='text-center text-white'>2</p>
            </Grid>
            <Grid item xs={12} sm={6} md={3}  className='border-2 border-red-500'>
            <p className='text-center text-white'>3</p>
            </Grid>
            <Grid item xs={12} sm={6} md={3}  className='border-2 border-red-500'>
            <p className='text-center text-white'>4</p>
            </Grid>

        </Grid>
    </>
}
export default Grid1