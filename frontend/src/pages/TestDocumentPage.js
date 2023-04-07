import React, { useState } from "react";

export const TestDocumentPage = ()=>{
  const [atoggle, setaToggle] = useState(false)
  const [btoggle, setbToggle] = useState(false)
  const [ctoggle, setcToggle] = useState(false)
  return(
    <>
    <div className="" style={{display:"grid", placeContent:"center"}}>
      <button onClick={()=>{
        return(
          setaToggle(true),
          setbToggle(false),
          setcToggle(false)
        )
        }} 
        className="btn btn-primary my-5">A</button>

      <button onClick={()=>{
        return(
          setaToggle(false),
          setbToggle(true),
          setcToggle(false)
        )
        }} 
      className="btn btn-secondary my-5">B</button>

      <button onClick={()=>{
        return(
          setaToggle(false),
          setbToggle(false),
          setcToggle(true)
        )
        }} 
       className="btn btn-info my-5">C</button>
    </div>
    <div className="my-3" style={{display:"grid", placeContent:"center"}}>
        {atoggle?
        <p>A succces</p>
        : null
        }
        {btoggle?
        <p>B succces</p>
        : null
        }
        {ctoggle?
        <p>C succces</p>
        : null
        }
    </div>
    </>
  )
}