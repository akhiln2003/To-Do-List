import React , { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';


export default function EditTask( { index , currentval , setDatas ,  setEdit , datas } ){
    const [ value , setValue ] = useState( currentval )
    const reff = useRef(null);
    useEffect(()=> {
        reff.current.focus()
    },[])
    function updatValue(event){
        setValue(event.target.value)
    }

    function handilKey( event ){
       if( event.key === "Enter" ){
            let updated = datas.map((value , i)=>{
             return i == index ?  value = {"task" : event.target.value }    : value
            })
            let regex = /^(?=(?:[^a-zA-Z]*[a-zA-Z]){3})(?!^\d+$).{3,25}$/;
            let inTask = datas.some((data, i) => data.task.toLowerCase().trim() === event.target.value.toLowerCase().trim() && i != index);
            
            if (event.target.value.trim() !== '' && regex.test(event.target.value) && !inTask) {
                setDatas(updated);
                setEdit(-1);
            } else if (inTask) {
                toast.warning("Already in task", { position: "top-center" });
            } else {
                toast.error("Enter valid Task", { position: "top-center" });
            }
            
       }
    }
     function closeUpdate (){
        setEdit(-1)
    }
   
    return(
        <>
           <input 
           ref={reff} 
           className=" ml-2 w-11/12  justify-between border bg-transparent text-white  border-gray-500 p-2 rounded mb-3 " 
           type="text" 
           onKeyDown={handilKey}
            value={ value } onChange={ updatValue }    /> <button onClick={ closeUpdate }>✖</button>
        </>
    )
}