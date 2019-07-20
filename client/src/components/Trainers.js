import React from 'react';
import axios from 'axios';
class Trainers extends React.Component{
    constructor(){
        super();
        this.state = {
            users: [],
            userSet: null,
            farm: null,
            trainer: null,
            times: null,
            allFarms: null,
            farmId: null,
            allTrainers: null,
            trainerId: null
        };
    }

componentWillMount(){

        axios.get('api/farms/getall').then((res) => {
            this.setState({allFarms: res.data});
        }).catch((err) => {
            console.log(err);
        });
    axios.get('api/trainers/getall').then((res) => {
        this.setState({allTrainers: res.data});
    }).catch((err) => {
        console.log(err);
    });


}


    render(){
        console.log(this.state.farmId);
        let allfarms;
        let trainers;
        console.log(this.state.allFarms);
        if(this.state.allFarms !== null){
            allfarms = (
                this.state.allFarms.map((item) => {
                    return (
                        <button onClick={() => this.setState({farmId: item._id})} id={item._id}>{item.name}</button>
                    );
                })
            );

        }else{
            allfarms = <p>No Farms</p>;

        }
        if(this.state.allTrainers !== null){
            trainers = (
                this.state.allTrainers.map((item) => {
                    return (
                        <button onClick={() => this.setState({trainerId: item._id})} id={item._id}>{item.name}</button>
                    );
                })
            );
        }else{
            trainers = <p>No trainers</p>;
        }
        return(
                <div>
                    <h1>Trainers</h1>
                    {trainers}
                    <div>
                        <p>Choose a Farm to Train at</p>
                        {allfarms}
                    </div>
                </div>
        );
    }
}

export default Trainers;