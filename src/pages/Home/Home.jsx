import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import './styles.css';

import { Row, Col, Progress, Card, Statistic } from 'antd';

import api from '../../services/api';

function Home() {
    const [actives, setActives] = useState([]);
    const [percentages, setPercentages] = useState([]);
    const [activesStatus, setActivesStatus] = useState({});

    const cAndUnity = useSelector(
        state => state.data
    );

    useEffect(() => {
        async function getActives() {
            let companyAndUnity = cAndUnity.split('-');
            const array = await api.get(`assets?companyId=${companyAndUnity[0]}&unitId=${companyAndUnity[1]}`)
            let data = array.data
            setActives(data)
        }
        getActives()
    }, [cAndUnity])

    useEffect(() => {
        let activessum = activesStatus.inAlert + activesStatus.inDowntime + activesStatus.inOperation
        let turnedoffs = activesStatus.turnedoff
        let total = activessum + turnedoffs
        let percentageTotal = (activessum / total) * 100;
        let percentageInOp = (activesStatus.inOperation / total) * 100
        let percentageInAlert = (activesStatus.inAlert / total) * 100
        let percentageInDownTime = (activesStatus.inDowntime / total) * 100
        let percentageTurnedOff = (activesStatus.turnedoff / total) * 100
        setPercentages(
            {
                total: parseFloat(percentageTotal).toFixed(2),
                inOperation: parseFloat(percentageInOp).toFixed(2),
                inAlert: parseFloat(percentageInAlert).toFixed(2),
                inDowntime: parseFloat(percentageInDownTime).toFixed(2),
                turnedOff: parseFloat(percentageTurnedOff).toFixed(2)
            }
        )
    }, [activesStatus])

    useEffect(() => {
        let status = { inAlert: null, inOperation: null, inDowntime: 0, turnedoff: 0 }
        actives.map(active => {
            if (active.status === 'inAlert') {
                status.inAlert++
            }
            if (active.status === 'inOperation') {
                status.inOperation++
            }
            if (active.status === 'inDowntime') {
                status.inDowntime++
            }
            if (active.status === 'turnedoff') {
                status.turnedoff++
            }
            return status
        })
        setActivesStatus(status)
    }, [actives])

    return (
        <div className="rows">

            <Row justify="center" className="row1" align="middle">
                <Col span={10} className="teste" align="center">
                    <div className="actives">
                        <h2>{actives.length} Ativos</h2>
                        <Progress type="circle" percent={percentages.total} width={180} strokeColor="#52c41a"/>
                    </div>
                </Col>
                <Col span={10}>
                    <div style={{ width: '80%' }}>
                        <h3><strong>{activesStatus.inOperation}</strong> Em operação</h3>
                        <Progress percent={percentages.inOperation} status="active" strokeColor="#7CFC00" showInfo={false} />
                        <h3><strong>{activesStatus.inAlert}</strong> Em alerta</h3>
                        <Progress percent={percentages.inAlert} status="active" strokeColor="#fa936e" showInfo={false} />
                        <h3><strong>{activesStatus.inDowntime}</strong> Em parada</h3>
                        <Progress percent={percentages.inDowntime} showInfo={false} />
                        <h3><strong>{activesStatus.turnedoff}</strong> Desligados</h3>
                        <Progress percent={percentages.turnedOff} strokeColor="#ebd9d9" showInfo={false} />
                    </div>
                </Col>
                <hr />
            </Row>
            <Row justify="space-around" className="row2" align="middle">
                <Col span={8} style={{ backgroundColor: '#FF23' }}>
                    <Card title="Tempo de uso dos ativos" bordered={false}>
                        <Statistic title="Total de horas"/>
                    </Card>
                </Col>
                <Col span={8} style={{ backgroundColor: '#afaf7833' }}>
                    <Card title="Confiabilidade" bordered={false}>
                        <Statistic title="Confiabilidade"/>
                    </Card>
                    </Col>
            </Row>

        </div>
    )
}

export default Home;