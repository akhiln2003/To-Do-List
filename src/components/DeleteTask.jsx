
import React , { useState } from 'react';

export default function DeleteTask( { index , datas , setDatas } ){
   function deleteTask (){
    let filterdData = datas.filter((valu , i ) => index !== i );
    setDatas(filterdData)
    }
    return(
        <button className="button" onClick={() => deleteTask (index)}>🗑️</button>
    )
}