import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import Menu from './menu';
import './home.css';

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sites: [],
            options: {
                chart: {
                    id: 'apexchart-example'
                },
                xaxis: {
                    categories: []
                }
            },
            series: [{
                name: 'valor',
                data: []
            }]
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

    getDataSite = (event) => {
        if (event.target.value != 0) {
            const user = JSON.parse(localStorage.getItem("user"));
            fetch(`http://localhost:8080/sites/payments?siteCode=${event.target.value}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
            })
                .then(r => r.json())
                .then(r => {
                    let categories = r.map(d => d.month);
                    let data = r.map(d => d.amount)
                    this.setState({
                        options: {
                            chart: {
                                id: 'apexchart-example'
                            },
                            xaxis: {
                                categories: categories
                            },
                            title: {
                                text: "Pagos Generados / Ultimos 6 meses",
                                align: 'left',
                                margin: 10,
                                offsetX: 0,
                                offsetY: 0,
                                floating: false,
                                style: {
                                  fontSize:  '20px',
                                  fontWeight:  'italic',
                                  fontFamily:  undefined,
                                  color:  '#263238'
                                },
                            },
                        },
                        series: [{
                            name: 'valor',
                            data: data
                        }]
                    });
                })
        }
    }

    render() {
        const sites = this.state.sites?.map(site => (
            <option value={site.code}>{site.name}</option>
        ));
        return (
            <div className="home-wrapper">
                <div className='column'>
                    <div className='column2'>
                        <h2>GYM</h2>
                        <h2>HOME</h2>
                        <img src={`${process.env.PUBLIC_URL}/gym.png`} style={{ width: 40 + '%' }} />
                    </div>
                    <Menu pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
                </div>
                <div className='column'>
                    <div className='column2'>
                        <select onChange={this.getDataSite}>
                            <option value="0">Sede:</option>
                            {sites}
                        </select>
                    </div>
                    <div className='column2'>
                        <Chart options={this.state.options} series={this.state.series} type="bar" width={700} height={500} />
                    </div>
                </div>
            </div>
        )
    }
}