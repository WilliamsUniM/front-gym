import { Component } from "react";
import Menu from './menu';
import DatePicker from 'react-date-picker';
import DataTable from 'react-data-table-component';
import './home.css';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

export default class Reportes extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sites: [],
            report: [],
            site: 0,
            starDate: "",
            endDate: ""
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

    consultar = () => {
        if (!this.state.starDate || !this.state.endDate || this.state.site == 0) {
            alert("Debe ingresar todos los campos")
        } else if (this.state.endDate < this.state.starDate) {
            alert("Fecha final debe ser mayor o igual a la inicial")
        } else {
            let startDateS = this.formatDate(this.state.starDate);
            let endDateS = this.formatDate(this.state.endDate);
            const user = JSON.parse(localStorage.getItem("user"));
            fetch(`http://localhost:8080/report?siteCode=${this.state.site}&startDate=${startDateS}&endDate=${endDateS}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
            })
                .then(r => r.json())
                .then(r => {
                    console.log("REPORT: ", r);
                    this.setState({
                        report: r
                    });
                })
        }
    }

    formatDate = date => {
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let year = date.getFullYear();

        return `${year}-${month}-${day}`
    }

    convertArrayOfObjectsToCSV = () => {
        if (this.state.report.length = 0) return null;

        let result;
        
        const columnDelimiter = ',';
        const lineDelimiter = '\n';
        
        result = '#,NOMBRE,DOCUMENTO,TIPO,VALOR';
        result += lineDelimiter;
        
        this.state.report?.forEach(item => {
            result += item.idPayment;
            result += columnDelimiter;
            result += item.name;
            result += columnDelimiter;
            result += item.document;
            result += columnDelimiter;
            result += item.type;
            result += columnDelimiter;
            result += item.amount;
            result += columnDelimiter;
            result += lineDelimiter;
        });
        
        return result;
    };

    downloadCSV = () => {
        let csv = this.convertArrayOfObjectsToCSV();
        if (csv == null) return;
        
        const filename = 'export.csv';
        var blob = new Blob([csv], { type: 'csv' });
        var url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.click();
    };

    render() {
        const sites = this.state.sites?.map(site => (
            <option value={site.code}>{site.name}</option>
        ));
        const data = this.state.report;
        const columns = [
            {
                name: '#',
                selector: row => row.idPayment,
                sortable: true,
            },
            {
                name: 'NOMBRE',
                selector: row => row.name,
                sortable: true,
            },
            {
                name: 'DOCUMENTO',
                selector: row => row.document,
                sortable: true,
            },
            {
                name: 'TIPO',
                selector: row => row.type,
                sortable: true,
            },
            {
                name: 'VALOR',
                selector: row => row.amount,
                sortable: true,
            }
        ];
        return (
            <div className="home-wrapper">
                <div className='column'>
                    <div className='column2'>
                        <h2>GYM</h2>
                        <h2>REPORTES</h2>
                        <img src={`${process.env.PUBLIC_URL}/gym.png`} style={{ width: 40 + '%' }} />
                    </div>
                    <Menu pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
                </div>
                <label>
                    <p>Sede</p>
                    <select onChange={ev => this.setState({ site: ev.target.value })}>
                        <option value="0">Sede:</option>
                        {sites}
                    </select>
                </label>
                <div className='column'>
                    <div className='column2'>
                        <label>
                            <p>Fecha Inicio:</p>
                            <DatePicker
                                value={this.state.starDate}
                                onChange={date => this.setState({ starDate: date })}
                            />
                        </label>
                        <label>
                            <p>Consultar</p>
                            <button className="button" onClick={this.consultar}>CONSULTAR</button>
                        </label>
                    </div>
                    <div className='column2'>
                        <label>
                            <p>Fecha Fin:</p>
                            <DatePicker
                                value={this.state.endDate}
                                onChange={date => this.setState({ endDate: date })}
                            />
                        </label>
                        <label>
                            <p>Reporte</p>
                            <img onClick={this.downloadCSV} src={`${process.env.PUBLIC_URL}/excel.png`} style={{ width: 15 + '%' }} />
                        </label>
                    </div>
                </div>
                <label>
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination
                    />
                </label>
            </div>
        );
    }
}