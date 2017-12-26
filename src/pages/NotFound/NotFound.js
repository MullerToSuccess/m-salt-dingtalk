
import { Component } from 'refast';
import img from './404.png'

export default class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animated:''
        }
        
      }
    render(){
        return (
            <div className="center">
            <h1>Eha!!!!!!!!!!!</h1>
            <img src={img} alt="404"/>
        </div>
        )
    }
}
