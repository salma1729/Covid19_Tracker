import React,{useState} from 'react'
function App() {
   const [specificState, setSpecificState] = useState({});
   const jsondata1 = await fetch('https://covid-19-fastest-update.p.rapidapi.com/summary');
    const myData1 = await jsondata1.json();
    const indData = myData1.Countries[77];
   const getdata=()=>{
    const temp =[];
     temp ['Confirmed']= [indData.NewConfirmed, indData.TotalConfirmed]
     temp['Recovered'] = [indData.NewConfirmed, indData.NewConfirmed - indData.TotalDeaths]
     temp ['Deaths']= [indData.TotalDeaths, indData.NewDeaths] 
    setSpecificState(temp);
   }
   useEffect(() => {
    getdata();
   }, [])
   
  return (
    <div> <InfoBox title="Coranavirus cases" cases={ specificState.Confirmed[0]} total={specificState.Confirmed[1]} /></div>
  )
}

export default App