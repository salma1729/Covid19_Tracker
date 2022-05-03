import React from "react";
import { Card, Typography} from "@material-ui/core";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import "./InfoBox.css";
const CardContentNoPadding = styled(CardContent)(`
padding: 6px;
&:last-child {
  padding-bottom: 0px;
}
`);
function InfoBox({  title,cases, active,isRed,total,  ...props }) {
  return (
    <Card onClick={props.onClick}
      className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'} `}
       style={{ backgroundColor:'#e3f2f7'}}
    >
      <CardContentNoPadding className="infoBox_card">
        <Typography className="infoBox__title" color="textSecondary" >
          <b> {title} </b>
        </Typography>
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
        {cases}
        </h2>
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContentNoPadding>
    </Card>
  );
}

export default InfoBox;