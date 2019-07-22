import React from 'react';
import axios from 'axios';
class Farms extends React.Component{
    constructor(){
        super();
        this.state = {
            users: [],
            userSet: null,
            farm: null,
            trainer: null,
            times: null,
            farmName: null,
            farmEmail: null,
            renderContent: true,
            allFarms: null,
            farmId: null,
            rerender: true
        };
    }

componentWillMount(){
axios.get('api/farms/getall').then((res) => {
    this.setState({allFarms: res.data});
}).catch((err) => {
   console.log(err);
});


}
onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
};
submitFarm = () => {
    let farmData = {
        name: this.state.farmName,
        email: this.state.farmEmail
    };
  axios.post('/api/farms/setup', farmData).then((res) => {
      this.setState({renderContent: false, farm: res.data});
  }).catch((err) => {
      console.log(err);
  });
};

getTimes = () => {
    let farm = this.state.farmId;
    axios.get(`/api/trainers/selectTime/${farm}`).then((res) => {
        this.setState({times: res.data});
    }).catch((err) => {
        console.log(err);
    });
};
removeUser = (timeId) => {
console.log('timeid',timeId);
let data = {
    trainerId: this.state.times[0]._id,
    timeId: timeId
};
axios.post('/api/farms/removeUser',data).then((res) => {
    console.log('res in remove user',res);
}).catch((err) => console.log(err));
};


    render(){
        console.log(this.state);
        let times;
        let timeId;
        let booked;
        let timeData = [];
        if(this.state.times !== null){

let name = this.state.times[0].name;
let user;

if(this.state.times[0].times[0].user){
    user = this.state.times[0].times[0].user.name;
    timeId = this.state.times[0].times[0]._id;
    booked = this.state.times[0].times[0].booked;
   
    for(let i = 0; i < this.state.times.length; i++){
      
        times = (
        this.state.times[i].times.map((item) => {
            
            if(user !== undefined && booked === true){
                return (
                    <p>{name} -- {item.day} -- {item.time}--Booked with {user}</p>

                );
                
            }else{
                return (
                    <p>{name} -- {item.day} -- {item.time}</p>

                );
            }
        })
        );
       
        }
    }
  
}
            // times = (
            //     this.state.times[0].times.map((item) => {
            //         if(user !== undefined && booked === true){
            //             return (
            //                 <p>{name} -- {item.day} -- {item.time}--Booked with {user}</p>
     
            //             );
            //         }else{
            //             return (
            //                 <p>{name} -- {item.day} -- {item.time}</p>
     
            //             );
            //         }
                  
            //     })
            // );

        else{
            times = <p>No times</p>;
        }
        if(this.state.farmId !== null && this.state.rerender === true){
            this.getTimes();
            this.setState({rerender: false});
        }
        let allfarms;
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
 let content;
 if(this.state.renderContent === true){
     content = (
         <div className="hideShow">
         <h3>Set up a farm location</h3>
     <label >Farm name</label>
     <input name="farmName" value={this.state.farmName} onChange={this.onChange} />
     <label >Farm Email</label>
     <input name="farmEmail" value={this.state.farmEmail} onChange={this.onChange} />
     <button onClick={() => this.submitFarm()}>Make Farm</button>
     </div>
     );
 }else{
     content = <p>{this.state.farmName}</p>;
 }

        return(
                <div>
                    <h1>Farms</h1>
                    <div>
                        {allfarms}

                    </div>

                    {content}
                    <hr/>

                    {times}

                    <hr/>
                    <p>Farm managment</p>
                    {times}
                    <button onClick={() => this.removeUser(timeId)}>Remove User from training session</button>
                </div>
        );
    }
}

export default Farms;