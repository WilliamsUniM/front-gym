import { Component } from "react";
import Menu from './menu';
import './home.css';

export default class Pagos extends Component {

    constructor(props) {
        super(props)
        this.state = {
            document: "",
            valor: "",
            types: [],
            type: ""
        }
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem("user"));
        fetch('http://localhost:8080/payment/type', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        })
            .then(r => r.json())
            .then(r => {
                this.setState({
                    types: r
                });
            })
    }

    actualizarDocumento = e => {
        const esValido = e.target.validity.valid;

        if (esValido) {
            this.setState({
                document: e.target.value
            });
        }
    };

    actualizarValor = e => {
        const esValido = e.target.validity.valid;

        if (esValido) {
            this.setState({
                valor: e.target.value
            });
        }
    };

    savePayment = () => {

        if (!this.state.document || !this.state.valor || this.state.type == "0") {
            alert("Debe ingresar todos los campos")
        } else {

            const user = JSON.parse(localStorage.getItem("user"));
            fetch('http://localhost:8080/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    document: this.state.document,
                    amount: this.state.valor,
                    type: this.state.type
                }),
            })
                .then(r => r.json())
                .then(r => {
                    alert(`Se guardo coorectamente con el id ${r.id}`)
                    this.setState({ document: "", valor: "", type: "" })
                })
                .catch(err => {
                    console.log("ERROR: ", err)
                })
        }
    };

    render() {
        const types = this.state.types?.map(type => (
            <option value={type}>{type}</option>
        ));
        return (
            <div className="home-wrapper">
                <div className='column'>
                    <div className='column2'>
                        <h2>GYM</h2>
                        <h2>REGISTRAR PAGOS</h2>
                        <img src={`${process.env.PUBLIC_URL}/gym.png`} style={{ width: 40 + '%' }} />
                    </div>
                    <Menu pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
                </div>
                <div className='column'>
                    <div className='column2'>
                        <label>
                            <p>Numero de documento</p>
                            <input pattern="[0-9]{0,10}" value={this.state.document} type="text" className="input-user" placeholder='Ingrese documento' onChange={ev => this.actualizarDocumento(ev)} />
                        </label>
                        <label>
                            <p>Tipo de pago</p>
                            <select onChange={ev => this.setState({ type: ev.target.value })}>
                                <option value="0">Tipo:</option>
                                {types}
                            </select>
                        </label>
                    </div>
                    <div className='column2'>
                        <label>
                            <p>Valor</p>
                            <input pattern="[0-9]{0,20}" value={this.state.valor} type="text" className="input-user" placeholder='Ingrese valor' onChange={ev => this.actualizarValor(ev)} />
                        </label>
                        <label>
                            <p>Guardar</p>
                            <button className="button" onClick={this.savePayment}>GUARDAR</button>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}