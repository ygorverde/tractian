import { useSelector } from 'react-redux';

import { Card, Image, Row, Col, Select } from 'antd';

import { SettingOutlined, BugOutlined, CalendarOutlined } from '@ant-design/icons';

import './styles.css'

function Actives() {
    const courses = useSelector(
        state => state.data
    );

    return (
        <div className="mainactives">
            <div className="viewactive">
            <Select style={{ width: `100%` }} placeholder="Selecione um ativo"/>
                <Card title="Motor H13D-1" bordered={true} style={{ width: `100%`, height: `100%` }}>
                    <div className="contentimage">
                        <Image src="https://tractian-img.s3.amazonaws.com/1c588f23dc92a7b97975a10757dd0435.jpeg"
                            height={250}
                        />
                    </div>
                </Card>
            </div>
            <div className="active">
                <Card title="Especificações" bordered={true} style={{ width: `100%`, height: `100%` }}>
                    <p><i><BugOutlined /></i> <strong> Sensor:</strong> GSJ1535</p>
                    <p><i><SettingOutlined /></i> <strong> Modelo:</strong> Bomba de água</p>
                    <p><i><CalendarOutlined /></i> <strong> Última coleta:</strong> 16 de Jan de 2021 às 18:40</p>
                </Card>
            </div>
            <div className="status">
                <Row align="center" justify="space-around" style={{ backgroundColor: `#ace709`, padding: '10px' }}>
                    <Col span={5} style={{backgroundColor: '#f1f1f1', height: '150px'}}>
                        <div className="statuswithicon">
                            <h1>Temperatura</h1>
                        </div>
                    </Col>
                    <Col span={5} style={{backgroundColor: '#afa3a3'}}/>
                </Row>
            </div>
            <div className="healthscore">
                <h1>HealthScore</h1>
            </div>
            <div className="timescollect">
                <h1>Timescollect</h1>
            </div>
        </div>
    )
}

export default Actives;