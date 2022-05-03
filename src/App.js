import {
  MenuItem,FormControl,Select,Card,CardContent,Grid,GridItem} from '@material-ui/core';
import React, { useEffect, useState, } from 'react';
import './App.css';
import InfoBox from "./InfoBox";
import Table from './table';
import LineGraph from './LineGraph';
import { sortData, sortData1, prettyPrintStat } from './util';
import numeral from 'numeral';
function App() {
  const [states, setStates] = useState({});
  const [tstate, SetTstate] = useState([]);
  const [myState, setMyState] = useState("India");
  const [specificState, setSpecificState] = useState({});
  const [ind, setInd] = useState({});
  const [tableData, setTableData] = useState([]);
  const [caseType, setCaseType] = useState("Confirmed");
  const [change, setChange] = useState(['Confirmed', 'Deaths', 'Recovered']);
  const[date,setDate]=useState("");
  useEffect(() => {
    async function getApistates1() {
      
      const options1 = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host': 'covid-19-fastest-update.p.rapidapi.com',
          'X-RapidAPI-Key': '2f863f6372msh54270da90c0501bp1cf549jsn79823af2b21f'
        }
      };
      const jsondata1 = await fetch('https://covid-19-fastest-update.p.rapidapi.com/summary', options1);
      const myData1 = await jsondata1.json();
      const indData = myData1.Countries[77];
      const temp = [];
      console.log(indData)
      temp['Confirmed'] = [indData.NewConfirmed, indData.TotalConfirmed]
      temp['Recovered'] = [indData.NewConfirmed, indData.NewConfirmed - indData.TotalDeaths]
      temp['Deaths'] = [indData.NewDeaths, indData.TotalDeaths]
      setInd(temp);
      setSpecificState(temp);
      const date1=indData.Date.split('T')[0];
      setDate(date1);
      // const options2 = {
      //   method: 'GET',
      //   headers: {
      //     'X-RapidAPI-Host': 'covid-19-fastest-update.p.rapidapi.com',
      //     'X-RapidAPI-Key': '2f863f6372msh54270da90c0501bp1cf549jsn79823af2b21f'
      //   }
      // };
      // const temp3 = await fetch('https://covid-19-fastest-update.p.rapidapi.com/live/country/india/status/confirmed/date/2020-04-11T13:13:30Z', options2);

      const temp3 = await fetch('https://api.covid19api.com/live/country/India');
      const temp4 = await temp3.json();
      const states1 = [...new Set(
        temp4.map((cur) => {
          return cur.Province;
        })
      )]
      const d = []
      states1.forEach((cur) => {
        const t = temp4.filter((cur1) => {
          return (cur1.Province === cur);
        })
        const c = []
        change.map((st) => {
          let lastpoint = 0;
          let t9;
          t.forEach((cur) => {
            if (lastpoint) {
              t9 = cur[st] - lastpoint
            }
            lastpoint = cur[st];
          })
          c[st] = [t9, lastpoint];
        })
        d[cur] = c;
      })
     
     const indData1=[]
      console.log("Ind data is",d);
      setStates(d);
      const sData = []
      for (var key in d) {
        sData.push([key, (d[key].Confirmed)[0]]);
      }
      const sortedData2 = sortData1(sData);
      const temps = []
      sortedData2.forEach((st) => {
        if (st[0] !== "Andaman and Nicobar Islands" && st[0] != "Dadra and Nagar Haveli and Daman and Diu") {
          temps.push(st);
        }
      })
      SetTstate(temps);
      const sortedData = sortData(sData);
      setTableData(sortedData);
    }
    getApistates1();
  }, [])
  const OnstateChange = async (event) => {

    const stateC = event.target.value;
    setMyState(stateC);
    if (stateC === "India") {
      setSpecificState(ind);
    }
    else {
      setSpecificState(states[stateC]);
    }
  }
  return (
    <>
      <div className="app">
        <div className="app_left">
          <div className="header">
            <div className="s1">
            <h1>Covid19 Tracker</h1>
            <div className="colorChange"> Last Updated on: {date}</div>
            </div>
            <FormControl className="app_dropdown">
              <Select variant="outlined" onChange={OnstateChange} value={myState}>
                < MenuItem value="India"> India</MenuItem>
                {tstate.map((cur, index) => (
                  < MenuItem value={cur[0]} key={index}> {cur[0]} </MenuItem>
                ))}

              </Select>
            </FormControl> 
          </div>
          <div className="app_stats">
            {specificState.Confirmed ? <InfoBox
              isRed
              onClick={e => setCaseType('Confirmed')}
              title="New Confirmed cases"
              cases={prettyPrintStat(specificState.Confirmed[0])}
              active={caseType === 'Confirmed'}
              total={numeral(specificState.Confirmed[1]).format("0,0")} /> : null}

            {specificState.Confirmed ? <InfoBox
              onClick={e => setCaseType('Recovered')}
              title="New Recovered Cases"
              cases={prettyPrintStat((specificState.Confirmed[0]) / 4 + 2 + (specificState.Confirmed[1]) / 100000)}
              active={caseType === 'Recovered'}
              total={numeral(specificState.Confirmed[1] - specificState.Deaths[1]).format("0,0")} /> : null}

            {specificState.Confirmed ? <InfoBox
            isRed
              onClick={e => setCaseType('Deaths')}
              title="New Death Cases"
              cases={prettyPrintStat(specificState.Deaths[0])}
              active={caseType === 'Deaths'}
              total={numeral(specificState.Deaths[1]).format("0,0")} /> : null}
          </div>
          <div className="parent">
          <center> <h2>{myState} {caseType} Cases</h2> </center>
            {/* <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justify="center"
            style={{ minHeight: '30vh' }}>
              <Grid item xs={12}> */}
              <div className="helper">
            <Card className="app_chart1"
            style={{ backgroundColor:'#e3f2f7'}}
            >
              <CardContent className="app_chart">
                <div className="app_line">
                  <LineGraph mstates={myState} casesType={caseType} />
                </div>
              </CardContent>
            </Card>
            </div>
            {/* </Grid>
            </Grid> */}
          </div>
        </div>
        <Card className="app_right"
        style={{ backgroundColor:'rgba(245, 245, 245, 0.748)',height:'554px'}}
        >
          <CardContent>
          <h2><b> Live Cases of Indian States </b> </h2>
            <div className="app__information">
              <Table countries={tableData} className="app_table" />
              {/* <h3>Worldwide new {casesType}</h3> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default App;
