import React from 'react';
import NavBar from '../../components/Navbar';
import {useLocation} from'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function CropDisplay(){
    const headsec = (title,desc) =>(
        <Grid container item direction="column" style={{color:"#fff"}}>
            <Typography variant="h5" style={{borderBottom:"2px solid #fff",margin:"1em 0em .5em 0em",padding:".5em 0em"}}>
                {title}
            </Typography>
            <Typography variant="h6">
                {desc}
            </Typography>
        </Grid>
    )

    const search = useLocation().search;
    const name = new URLSearchParams(search).get('name');
    const dis = new URLSearchParams(search).get('dis');
    const sol = new URLSearchParams(search).get('sol');
    return(
        <>
            <NavBar />
            
            <Grid container item direction="column" style={{padding:"2em 1em"}}>
                {
                    headsec("Crop Name",name)
                }
                {
                    headsec("Disease",dis)
                }
                {
                    headsec("Remedy",sol)
                }
            </Grid>
        </>
    );
}