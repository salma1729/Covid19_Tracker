import React from 'react'
import './table.css'
import numeral from "numeral";
function Table({ countries, ...props }) {
    return (
      <div className="table">
        {countries.map((cur) => (
          <tr>
            <td><b>{cur[0]} </b></td>
            <td>
              <strong>{numeral(cur[1]).format("0,0")}</strong>
            </td>
          </tr>
        ))}
      </div>
    );
  }

export default Table