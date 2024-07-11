
import React , { useState } from "react";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";



export default function ListTask( { datas  , setDatas }){
    const [ edit , setEdit ] = useState(-1);
    const [ butstatus , setBtnStatus ] = useState(true)
    const [ activeCard , setActiveCard ] = useState(null);

    function editTask ( index ){
        setEdit(index);
    }
    function onDrop( position ){
        if( activeCard == null || activeCard == undefined ) return 

        let data = datas[activeCard]
        datas.splice(activeCard , 1 );
        datas.splice(position , 0 , data )
        setDatas( datas )
    }
    function updateStatus(){
        setBtnStatus(()=> !butstatus)
    }
    function taskcompleted( index ){
        let updated = datas.map((value , i)=>{
            return i == index ?  value = { "task" : value.task , "isCompletted" : true } :  value
        })
        
        setDatas(updated)
    }

    function taskInCompletted( index ){
        let updated = datas.map((value , i)=>{
            return i == index ?  value = { "task" : value.task , "isCompletted" : false } :  value
        })
        setDatas(updated)
    }

   
    return(
        <>
        <div className="mt-5 mr-5">
        <button className="mb-5 ml-3 text-zinc-300"   onClick={updateStatus} >{ butstatus ? "Task" : "Completted" }</button>
            <ol>
                { 
                  butstatus ? datas?.map( (value, index) => (
                  !value.isCompletted ? 
                    edit == index ? < EditTask key={index} index ={index}  currentval  ={value.task} setDatas = {setDatas} setEdit = { setEdit } datas ={datas} /> :
                    <div 
                    draggable 
                    onDragOver={e=>e.preventDefault()}
                    onDrop={()=> onDrop( index  )}
                    onDragStart = {()=>{ setActiveCard(index)}}
                    onDragEnd={ ()=> setActiveCard(null)}
                     key={index}
                      className="flex items-center justify-between border text-white bg-gray-600  border-gray-500 p-2 rounded ml-4 mb-3">
                        <span className="text">{value.task}</span>
                        <div className="flex space-x-2">
                            <input type="checkbox"  readOnly checked={value.isCompletted} onClick={()=>taskcompleted(index)} />
                             <button className="button" onClick={() => editTask(index)}>✎</button>
                            < DeleteTask  index ={ index } datas = { datas } setDatas = { setDatas }/>
                        </div>
                    </div> :<></>
                )) :
                datas?.map( (value, index) => (
                    value.isCompletted ? 
                      edit == index ? < EditTask key={ value.task} index ={index}  currentval  ={value.task} setDatas = {setDatas} setEdit = { setEdit } datas ={datas} /> :
                      <div key={value.task} className="flex items-center justify-between border text-white bg-gray-500  border-gray-500 p-2 rounded ml-4 mb-3">
                          <span className="text">{value.task}</span>
                          <div className="flex space-x-2">
                              <input type="checkbox" readOnly checked={value.isCompletted} onClick={()=>taskInCompletted(index)} />
                              < DeleteTask  index ={ index } datas = { datas } setDatas = { setDatas }/>
                          </div>
                      </div> :<></>
                  ))
                
            }
            </ol>
        </div>
    </>
    
    )
}