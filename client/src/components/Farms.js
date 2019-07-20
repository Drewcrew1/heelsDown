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
            allFarms: null
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


    render(){
        let allfarms;
        console.log(this.state.allFarms);
        if(this.state.allFarms !== null){
            allfarms = (
            this.state.allFarms.map((item) => {
              return (
                  <p id={item._id}>{item.name}</p>
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
                </div>
        );
    }
}

export default Farms;