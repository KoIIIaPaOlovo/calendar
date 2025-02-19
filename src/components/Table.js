import React from "react";
import dayNames from "../additions/dayNames";
import './Table.css';
import Team from "./Team"
import teams from '../additions/teams'

export default class Table extends React.Component{
    constructor(props){
        super(props);
        this.countDays = this.countDays.bind(this);
        this.state = {
            days: this.countDays(this.props.currentDate)
        };
    }

    render(){
        return (
            <table>
                <thead>
                    <tr>
                        <td className="firstColumn">
                        <button>
                            + Add Vacation
                        </button>
                        </td>
                        {this.outputHead()}
                        <td>
                            Sum
                        </td>
                    </tr>
                </thead>
                {/* <Team currentDate={this.props.currentDate} name={"frontEnd"}/>
                <Team currentDate={this.props.currentDate} name={"backEnd"}/>
                <Team currentDate={this.props.currentDate} name={"designers"}/> */}
                {
                teams.map((team,index) => {
                    return <Team currentDate={this.props.currentDate} team={team} key={index}/>
                })
                }
                <tfoot>
                    
                </tfoot>
            </table>
        )
    }

    componentDidUpdate(prevProps){
        if (this.props.currentDate !== prevProps.currentDate) {
        this.setState({days: this.countDays(this.props.currentDate)});
        }
    }

    outputHead(){
        let arrayOfElements = [];
        for (let index = 1; index <= this.state.days; index++) {
            let dayName = dayNames[new Date(this.props.currentDate.getFullYear(),this.props.currentDate.getMonth(),index).getDay()];
            if (dayName === "Вс" || dayName === "Сб")
            {
                arrayOfElements.push(
                    <td key={index} className="weekend">
                        <p>{index}</p>
                        <p>{dayName}</p>
                    </td>
                )
            }else{
                arrayOfElements.push(
                    <td key={index}>
                        <p>{index}</p>
                        <p>{dayName}</p>
                    </td>
                )
            }
        }
        return arrayOfElements
    }

    countDays(date){
        return (33 - new Date(date.getFullYear(), date.getMonth(), 33).getDate());
    }
}