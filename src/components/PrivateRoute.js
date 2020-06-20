import React, { useContext } from 'react'
import { Route } from 'react-router-dom'
import { UserContext } from '../contexts/UserContextProvider'
import { Result, Button, message } from 'antd'
import LinkButton from './LinkButton'

export default function PrivateRoute({ children, ...rest }) {
  const { signedInUser } = useContext(UserContext)

  const handleFeedBack = () => {
    message.info('申し訳ありませんが、これはベータ版です')
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        signedInUser && !signedInUser.blocked ? (
          children
        ) : (
            <Result
              status="error"
              title="あなたは管理者によってブロックされています"
              subTitle="詳細については管理者にお問い合わせください"
              extra={[
                <Button type="primary" key="console" onClick={handleFeedBack}>
                  管理者に連絡
                </Button>,
                <LinkButton to='/' key="backhome">戻る</LinkButton>,
              ]}
            >
            </Result>
          )
      }
    />
  )
}