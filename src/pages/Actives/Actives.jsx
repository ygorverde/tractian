import { Link } from "react-router-dom";

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import api from '../../services/api';

// Highcharts
import Gauge from '../../components/Highcharts/Gauge/Gauge.tsx';
import Line from '../../components/Highcharts/Line/Line.tsx';

import { Card, Image, Row, Col, Select } from 'antd';
import { SettingOutlined, BugOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf, faPlayCircle, faBolt, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import Loading from '../../components/Loading/Loading';
import './styles.css'
const { Option } = Select;

const initialState = {
    name: '',
    model: '',
    sensors: '',
    healthscore: null,
    image: '',
    power: 0,
    temp: null,
    rpm: 0,
    lastUptimeAt: null
}

function Actives() {
    const [id, setId] = useState(null)
    const [activesList, setActivesList] = useState([]);
    const [active, setActive] = useState(initialState);
    const [loading, setLoading] = useState(false)

    const cAndUnity = useSelector(
        state => state.data
    );

    const onChange = (e) => {
        setActive({ ...active, image: '' })
        setLoading(true)
        setId(e)
    }

    useEffect(() => {
        setId(null)
        async function getActivesList() {
            let companyAndUnity = cAndUnity.split('-');
            const actives = await api.get(`assets?companyId=${companyAndUnity[0]}&unitId=${companyAndUnity[1]}`)
            let data = actives.data
            setActivesList(data)
        }
        getActivesList()
    }, [cAndUnity])

    useEffect(() => {
        async function getActive() {
            const active = await api.get(`assets/${id}`)
            const data = active.data
            const dateF = new Date(data.metrics.lastUptimeAt)
            const dataFormatada = ((dateF.getDate() )) + "/" + ((dateF.getMonth() + 1)) + "/" + dateF.getFullYear() +""+
             "às" + dateF.getHours()+":"+dateF.getMinutes(); 
            let teste = {
                name: data.name,
                status: data.status,
                model: data.model,
                sensors: data.sensors,
                healthscore: data.healthscore,
                image: data.image,
                power: data.specifications.power,
                temp: data.specifications.maxTemp,
                rpm: data.specifications.rpm,
                lastUptimeAt: dataFormatada
            }
            setLoading(false)
            setActive(teste)
        }
        getActive()
    }, [id])

    function firstUpperCase(word) {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    return (
        <>
        {loading === true ? <Loading />
        :
        <div className="mainactives">
            <div className="viewactive">
                <Select style={{ width: `100%` }}
                    placeholder="Selecione um ativo"
                    onChange={onChange}
                    value={id}
                >
                    {activesList.map(active => {
                        return (
                            <Option key={active.id}>{active.name}</Option>
                        )
                    })}
                </Select>
                {id &&
                <Card title={active.name} bordered={true} 
                extra={<Link to={`actives/${id}`}>Editar</Link>}
                style={{ width: `100%`, height: `100%` }}>
                    <div className="contentimage">
                        <Image src={active.image}
                            height={230}
                            alt="Ativo"
                        />
                    </div>
                </Card>
                }
            </div>
            {id &&
            <>
            <div className="active">
                <Card title="Especificações" bordered={true} style={{ width: `100%`, height: `100%` }}>
                    <p><i><BugOutlined /></i> <strong> Sensor:</strong> {active.sensors}</p>
                    <p><i><SettingOutlined /></i> <strong> Modelo:</strong> {firstUpperCase(active.model)}</p>
                    <p><i><CalendarOutlined /></i> <strong> Última coleta:</strong> {active.lastUptimeAt}</p>
                    <p><i><UserOutlined /></i> <strong> Responsável:</strong> Ygor Verde</p>
                </Card>
            </div>
            <div className="statusgrid">
                <Row align="center" justify="space-around" style={{ padding: '10px' }}>
                    
                    <Col span={7}>
                    <li>
                            <div className="icon" style={{ color: 'red' }}>
                                <FontAwesomeIcon icon={faThermometerHalf} />
                            </div>
                            <h1>Temperatura</h1>
                            <h2>{active.temp}ºC</h2>
                        </li>
                    </Col>
                    <Col span={7}>
                        <li>
                            <div className="icon" style={{ color: 'gold' }}>
                                <FontAwesomeIcon icon={faBolt} />
                            </div>
                            <h1>Consumo:</h1>
                            <h2>{active.power === 0 || active.power === undefined ? `Não detecado` : `${parseFloat(active.power).toFixed(3)} kWh`}</h2>
                        </li>
                    </Col>
                </Row>

                <Row align="center" justify="space-around" style={{ padding: '10px' }}>
                    <Col span={7}>
                        <li>
                            <div className="icon">
                                <FontAwesomeIcon icon={
                                    active.status === 'inAlert' ? faExclamationTriangle : faPlayCircle
                                } />
                            </div>
                            <h1>Estado:</h1>
                            <h2>{active.status}</h2>
                        </li>
                    </Col>
                    <Col span={7}>
                        <div className="chart-container">
                            <Gauge rotacao={active.rpm} />
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="healthscore">
                <Line healthscore={active.healthscore} active={active.name} />
            </div>

            <div className="timescollect">
                <h1>Timescollect</h1>
            </div>
            </>
        }
        </div>    
    }
        </>
    )
}

export default Actives;