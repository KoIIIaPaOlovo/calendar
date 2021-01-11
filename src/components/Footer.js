import React from "react";
import dayNames from "../additions/dayNames";
import Team from "./Team"
import teams from '../additions/teams';
import './Footer.css'

 class Footer extends React.Component {
    constructor(props){
        super(props);
        this.countDays = this.countDays.bind(this);  
        this.state = {
            days: this.countDays(this.props.currentDate),
            isShown: true
        };
        this.vacations = [] ;        
    }
    // componentDidMount(){
    //     this.generateSumVacations();
    // }
    render(){
        return( 
            <tbody>
                 <tr>
                <td className="tfoot">Day-person-starts </td>
                {this.outputDays()}
                    <td>                      
                    </td>             
                </tr> 
            </tbody>        
               
                       
        )
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
    countDays(date){
        return (33 - new Date(date.getFullYear(date), date.getMonth(date), 33).getDate(date));
    }

    // generateSumVacations(){
    //     this.vacations = [];
    //     this.teams.participants.forEach(member => {
    //         member.vacations.forEach(vacation => { 
    //             this.vacations.push({
    //                 userId: member.id,
    //                 startDate: vacation.slice(0,10),
    //                 endDate: vacation.slice(13)
                             
    //             })
    //         })
    //     })
    //     console.dir(this.vacations);
    }

  
  export default Footer;
