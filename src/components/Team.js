import React from "react";
import dayNames from "../additions/dayNames";
import './Team.css';

export default class Team extends React.Component{
    constructor(props){
        super(props);
        this.countDays = this.countDays.bind(this);
        this.state = {
            days: this.countDays(this.props.currentDate),
            isShown: true
        };
        this.vacations = []
    }
    componentDidMount(){
        this.generateVacationsArray();
    }

    render(){
        return (
            <tbody>
                <tr>
                    <td className="team__head-column">
                        <div className="team__head">
                            {this.props.team.realm}
                            <button onClick={() => this.hideTeam()}>Hide</button>
                        </div>
                    </td>
                    {this.outputDays()}
                    <td>
                        
                    </td>
                </tr>
                {this.state.isShown && this.props.team.participants.map((member,index) => {
                    return (
                        <tr key={index}>
                            <td className="team__head-column">
                                {member.name}
                            </td>
                            {this.outputDays()}
                            <td>
                                0
                            </td>
                        </tr>
                    )
                })
                }
            </tbody>
        )
    }


    generateVacationsArray(){
        this.vacations = [];
        this.props.team.participants.forEach(member => {
            member.vacations.forEach(vacation => {
                this.vacations.push({
                    userId: member.id,
                    startDate: vacation.slice(0,10),
                    endDate: vacation.slice(13)
                })
            })
        })
        console.dir(this.vacations)
    }


    componentDidUpdate(prevProps){
        if (this.props.currentDate !== prevProps.currentDate) {
        this.setState({days: this.countDays(this.props.currentDate)});
        }
    }

    outputDays(){
        let arrayOfElements = [];
        for (let index = 1; index <= this.state.days; index++) {
            let dayName = dayNames[new Date(this.props.currentDate.getFullYear(),this.props.currentDate.getMonth(),index).getDay()];
            if (dayName === "Вс" || dayName === "Сб")
            {
                arrayOfElements.push(
                    <td key={index} className="weekend">
                    </td>
                )
            }else{
                arrayOfElements.push(
                    <td key={index}>
                    </td>
                )
            }
        }
        return arrayOfElements;
    }

    hideTeam(){
        this.setState({isShown: !this.state.isShown});
    }

    countDays(date){
        return (33 - new Date(date.getFullYear(), date.getMonth(), 33).getDate());
    }
}