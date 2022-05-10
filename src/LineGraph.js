import React, { useState, useEffect } from 'react'
import {  Line } from 'react-chartjs-2';
import numeral from 'numeral';
import { Chart as ChartJS, registerables,Tooltip,Filler } from 'chart.js';
import { Chart } from 'react-chartjs-2'
ChartJS.register(...registerables,Tooltip,Filler);
const options3 = {
//   plugins: {
//     legend: false // Hide legend
// },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  scales: {
    x: {
        grid: {
          display: false,
        },
      },
    y: 
      {
        grid: {
          display: false,
        },
      },
  },
};


function Map({mstates , casesType,...props}) {
  const [data, setData] = useState({});
  const[totalData,setTotalData]=useState({});
  const[iData,setIData]=useState({});
  const[change,setChange]=useState(['Confirmed','Deaths','Recovered']);
  const[val,setVal]=useState("");
  const s=mstates;
  async function getApiIndia() {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host': 'covid-19-fastest-update.p.rapidapi.com',
          'X-RapidAPI-Key': '2f863f6372msh54270da90c0501bp1cf549jsn79823af2b21f'
        }
      };
      const temp = await fetch('https://api.covid19api.com/country/india', options);
      const temp2 = await temp.json();
      let lastpoint1;
      const d1={};
      change.forEach((st)=>{
        const t1 = [];
      temp2.forEach((cur) => {
        if (lastpoint1) {
          const newD = {
            x: cur.Date.split('T')[0],
            y: (cur[st] - lastpoint1)>0?(cur[st] - lastpoint1):0
          }
          t1.push(newD);
        }
        lastpoint1 = cur[st];
      })
     d1[st]=t1;
    })
      setIData(d1);
      setData(d1.Confirmed);
      const options1 = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host': 'covid-19-fastest-update.p.rapidapi.com',
          'X-RapidAPI-Key': '2f863f6372msh54270da90c0501bp1cf549jsn79823af2b21f'
        }
      };
      const temp3 = await fetch('https://api.covid19api.com/live/country/India',options1);
      const temp4 = await temp3.json();
      let lastpoint=0;
      temp4.forEach((ele)=>{
        ele['Recovered']=ele['Confirmed']-ele['Active']+lastpoint
        lastpoint=ele.Deaths
        
      })
      const d=[];
      const states=[...new Set(
        temp4.map((cur)=>{
          return cur.Province;
        })
      )
      ]; 
    
      states.forEach((cur)=>{
      const t = temp4.filter((cur1) => {
        return (cur1.Province === cur);
      })
      const c=[]
      change.forEach((st)=>{
        if(st!=="Reccovered"){
      const t1 = [];
      let lastpoint=0;
      t.forEach((cur2) => {
        const m1=(cur2.Date.split('T')[0]).split('-')[1]
          const y1=(cur2.Date.split('T')[0]).split('-')[0]
        if (lastpoint && (m1>8 || y1>2021)) {
          const newD = {
            x: cur2.Date.split('T')[0],
            y: ((cur2[st] - lastpoint)>0)?cur2[st] - lastpoint:0
          }
            t1.push(newD);
        }
        lastpoint=cur2[st];
      })
      c[st]=t1;
    }
    })
    d[cur]=c;
  
  })
  setTotalData(d);
  }

  useEffect(() => {
    getApiIndia();
  },[]);
  useEffect(()=>{
    if(s==="India"){
      setData(iData[casesType]);
    }
    else{
      const temp=totalData[s];
      setData(temp[casesType]);
      
    }
    setVal(casesType)
  },[s,casesType])

  return (
    <>
    {/* <h1>on the way</h1> */}
         {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                label: val,
                fill: 'start',
                backgroundColor: "#f03541",
                borderColor: "#CC1034",
                data: data
              },
            ],
          }}
          options={options3}
        />
      )}
    </>

  )
}

export default Map