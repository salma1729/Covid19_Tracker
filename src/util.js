// import React from "react";
import numeral from "numeral";
export const sortData=(data)=>{
  const sortedData=[...data];
  sortedData.sort((a,b)=>{
      if(a[1]>b[1]){
      return -1;
    }
    else{
      return 1;
    }
  });
  return sortedData;
}
export const sortData1=(data)=>{
 const sData=[...data];
 sData.sort((a,b)=>{
return (a[0]<b[0])?-1:1;
 });
 return sData;
}
export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0,0")}` : "+0";
  