import React from 'react';
import { Spin } from 'antd';

import cl from './CustomSpin.module.scss';

export default function CustomSpin() {
    return (
        <div className={cl.spin}>
            <Spin  size={'large'}/>
        </div>
    )
}
