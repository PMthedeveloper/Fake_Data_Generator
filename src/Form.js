import React from 'react'
import { Grid,Paper,Box,FormControl,InputLabel,Select,TextField,Chip,MenuItem,Button } from "@material-ui/core";
import { options,dataTemplate } from "./data/options";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import faker from "faker";
import downloadjs from "downloadjs";

const categories = Object.keys(options);
// console.log(categories);

const useStyles = makeStyles(theme=>({
    FormControl:{
        minWidth:"100%",
    },
    chips:{
        display:"flex",
        flexWrap:"wrap"
    },
    chip:{
        margin:2,
    }
}));

const Form = (props) => {

    const classes = useStyles();
    const [data,setData] = useState(dataTemplate);
    const [noOfData,setnoOfData] = useState(1);
    const handleChange = (event) =>{
        let copyData = { ...data };
        copyData[event.target.name] = {};
        event.target.value.forEach(item => {
            copyData[event.target.name][item] = "";
        });
        setData(copyData);
    };

    const generateData = () => {
        let copyData = JSON.parse(JSON.stringify(options));
        let arrData = [];
        for(let i=0;i<noOfData;i++){
            for(let category of categories){
                for(let key of Object.keys(options[category])){
                    if(data[category][key] !== undefined){
                        copyData[category][key] = faker[category][key]();
                    }
                }
            }
            arrData.push(copyData);
            copyData = JSON.parse(JSON.stringify(options));
        }
        
   downloadjs(JSON.stringify(arrData),'fake_data.json',"json");
   setnoOfData(1);
   setData(dataTemplate);
    };

    return (
        <>
        <Grid container spacing={2}>
        {
            categories.map(category => (
                <Grid item sm={3} key={category}>
                <Paper component={Box} p={3}>
                  <FormControl className={classes.FormControl}>
                      <InputLabel>
                      {category}
                      </InputLabel>
                      <Select name={category} fullWidth multiple value={Object.keys(data[category])} onChange={handleChange} 
                      renderValue={(sel)=>(
                          <div className={classes.chips}>
                              {
                                  sel.map((value) => (
                                    <Chip key={value} label={value} className={classes.chip}/>

                                  ))
                                  
                              }
                          </div>
                      )}>
                      {
                          Object.keys(options[category]).map(name => (
                              <MenuItem keys={name} value={name}>{name}</MenuItem>
                          ))
                      }
                      </Select>
                  </FormControl>  
                </Paper>
                </Grid>
            ))
        }
        </Grid>
        <Paper component={Box} my={1} p={3}>
        <TextField fullWidth variant="outlined" label="Enter the number of fake data" placeholder="Enter the number" value={noOfData} 
        onChange={(e)=> setnoOfData(e.target.value)}>

        </TextField>
        </Paper>
        <Button variant="contained" color="secondary" onClick={generateData}>Generate Data</Button>
        </>
    )
}

export default Form
