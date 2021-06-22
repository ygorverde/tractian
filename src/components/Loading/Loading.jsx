import './styles.css';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;


function Loading() {
    return (
        <div className="loading">
            <Spin indicator={antIcon} />
            {/* <img src="https://media2.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=ecf05e47lsqeavchfpzyud6k9v6f0f1tjkjgnsjf0vc76j4e&rid=giphy.gif&ct=g" alt="loading" /> */}
        </div>
    )
}

export default Loading;