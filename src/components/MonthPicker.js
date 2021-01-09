import React from "react";
import './MonthPicker.css'

export default class MonthPicker extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            monthNames : ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"]
        }
    }

    render(){
        return (
        <div className="month-picker">
            <button onClick={()=>{this.changeDate('prev')}}>
                Prev
            </button>
            <p>
                {this.state.monthNames[this.props.currentDate.getMonth()]}
            </p>
            <button onClick={()=>{this.changeDate('next')}}>
                Next
            </button>
        </div>
        )
    }

    changeDate(direction){
        this.props.changeDate(direction);
    }

}