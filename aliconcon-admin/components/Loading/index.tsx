import { Spin } from 'antd'
import React from 'react'
import style from './styles.module.less';

type Props = {
    open: boolean
}

const Loading = ({open}: Props) => {
  return (
    open && (
        <div className={style.spinWrapper}>
          <Spin size= "default" />
        </div>
      )
  )
}

export default Loading