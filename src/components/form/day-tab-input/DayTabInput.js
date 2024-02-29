import { useEffect, useState } from 'react';
import './style.css';
const DayTabInput = ({setDaysValue,values})=>{
    const DAYS = [
        {id:1,label:'Mon',isActive:false},
        {id:2,label:'Tue',isActive:false},
        {id:3,label:'Wed',isActive:false},
        {id:4,label:'Thu',isActive:false},
        {id:5,label:'Fri',isActive:false},
        {id:6,label:'Sat',isActive:false},
        {id:7,label:'Sun',isActive:false}
    ];
    const [days,setDays] = useState(DAYS);
    const clickOnDays = (id)=>{
        const result = days.map((e)=>{
            if(e.id==id){
                e.isActive = !e.isActive;
            }
            return e;
        })
        setDays(result);
        setDaysValue(result);
    }
    useEffect(()=>{
        const daysValuesResults = DAYS.map((e)=>{
            let index = values.find((f)=>f==e.label);
            if(index!==undefined)
            {
                e.isActive = true;
                return e;
            }
            return e;
        });
        setDays(daysValuesResults);
        setDaysValue(daysValuesResults);
    },[]);
    return <div className="input-outer-card">
                {
                    days.map((e)=>{
                        return <div onClick={()=>clickOnDays(e.id)} className={`days-box ${e.isActive?'active-days':''}`}>{e.label}</div>
                    })
                }
            </div>
}
export default DayTabInput;