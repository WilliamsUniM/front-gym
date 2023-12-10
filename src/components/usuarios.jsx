import { Component } from "react";
import Menu from './menu';
import './home.css';

export default class Usuarios extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            phone: "",
            site: 0,
            document: "",
            sites: []
        }
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem("user"));
        fetch('http://localhost:8080/sites', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        })
            .then(r => r.json())
            .then(r => {
                this.setState({
                    sites: r
                });
            })
    }

    actualizarTelefono = e => {
        const esValido = e.target.validity.valid;

        if (esValido) {
            this.setState({
                phone: e.target.value
            });
        }
    };


    actualizarDocumento = e => {
        const esValido = e.target.validity.valid;

        if (esValido) {
            this.setState({
                document: e.target.value
            });
        }
    };

    saveClient = () => {

        if (!this.state.document || !this.state.email || !this.state.name || !this.state.phone || this.state.site == 0) {
            alert("Debe ingresar todos los campos")
        } else {
            const user = JSON.parse(localStorage.getItem("user"));
            fetch('http://localhost:8080/clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    phone: this.state.phone,
                    document: this.state.document,
                    site: this.state.site
                }),
            })
                .then(r => r.json())
                .then(r => {
                    alert(`Se guardo coorectamente con el id ${r.id}`)
                    this.setState({ name: "", email: "", phone: "", document: "", site: 0 })
                })
                .catch(err => {
                    console.log("ERROR: ", err)
                })
        }
    };

    render() {
        const sites = this.state.sites?.map(site => (
            <option value={site.code}>{site.name}</option>
        ));
        return (
            <div className="home-wrapper">
                <div className='column'>
                    <div className='column2'>
                        <h2>GYM</h2>
                        <h2>REGISTRAR CLIENTES</h2>
                        <img src={`${process.env.PUBLIC_URL}/gym.png`} style={{ width: 40 + '%' }} />
                    </div>
                    <Menu pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
                </div>
                <div className='column'>
                    <div className='column2'>
                        <label>
                            <p>Nombre</p>
                            <input value={this.state.name} type="text" className="input-user" placeholder='Ingrese nombre' onChange={ev => this.setState({ name: ev.target.value })} />
                        </label>
                        <label>
                            <p>Telefono</p>
                            <input pattern="[0-9]{0,10}" value={this.state.phone} type="text" className="input-user" placeholder='Ingrese telefono' onChange={ev => this.actualizarTelefono(ev)} />
                        </label>
                        <label>
                            <p>Numero de documento</p>
                            <input pattern="[0-9]{0,10}" value={this.state.document} type="text" className="input-user" placeholder='Ingrese documento' onChange={ev => this.actualizarDocumento(ev)} />
                        </label>
                    </div>
                    <div className='column2'>
                        <label>
                            <p>Correo electronico</p>
                            <input value={this.state.email} type="text" className="input-user" placeholder='Ingrese correo' onChange={ev => this.setState({ email: ev.target.value })} />
                        </label>
                        <label>
                            <p>Sede</p>
                            <select onChange={ev => this.setState({ site: ev.target.value })}>
                                <option value="0">Sede:</option>
                                {sites}
                            </select>
                        </label>
                        <label>
                            <p>Guardar</p>
                            <button className="button" onClick={this.saveClient}>GUARDAR</button>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}