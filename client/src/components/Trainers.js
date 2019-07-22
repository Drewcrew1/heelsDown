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
            trainerId: null,
            trainerTimes: null,
            trainerName: null,
            trainerEmail: null,
            trainerDay: null,
            trainerTime: null
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
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };
    submitFarm = () => {
        let trainer = {
            name: this.state.trainerName,
            email: this.state.trainerEmail
        };
        axios.post('/api/trainers/setup', trainer).then((res) => {
            this.setState({trainer: res.data});
        }).catch((err) => {
            console.log(err);
        });
    };
    submitTrainerLoc = () => {
let data = {
  farmId: this.state.farmId,
  trainerId: this.state.trainerId
};
axios.post('/api/trainers/selectFarm', data).then((res) => {
    console.log('res in select farm',res);
}).catch((err) => {
   console.log(err);
});
    };
    submitTime = () => {
        let data = {
          day: this.state.trainerDay,
          time: this.state.trainerTime,
            id: this.state.trainerId
        };
      axios.post('/api/trainers/setTime',data).then((res) => {
          console.log(res);
      }).catch((err) => console.log(err));
    };


    render(){
        console.log(this.state.farmId);
        console.log(this.state.trainerId);
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


                    <hr/>
                    <button onClick={() => this.submitTrainerLoc()}>Submit farm to train at</button>
                    <hr/>


                    <h4>Select a trainer and give a day a time</h4>
                    <label >Day</label>
                    <input name="trainerDay" value={this.state.trainerDay} onChange={this.onChange} />
                    <label >Time</label>
                    <input name="trainerTime" value={this.state.trainerTime} onChange={this.onChange} />
                    <button onClick={() => this.submitTime()}>Set Day and Time</button>
                    <hr/>


                    <div className="hideShow">
                    <h3>Set up a Trainer</h3>
                    <label >Trainer name</label>
                    <input name="trainerName" value={this.state.trainerName} onChange={this.onChange} />
                    <label >Trainer Email</label>
                    <input name="trainerEmail" value={this.state.trainerEmail} onChange={this.onChange} />
                    <button onClick={() => this.submitFarm()}>Make Trainer</button>
                </div>

                </div>
        );
    }
}

export default Trainers;