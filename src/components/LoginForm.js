import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Input, Card, message } from 'antd'
import { UserOutlined, LockOutlined, GoogleCircleFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import logo from '../logo.svg'
import { useAuth } from 'reactfire'
import { provider } from '../firebaseConfig'

function LoginForm(props) {
  let history = useHistory()
  const auth = useAuth()
  
  const onFinish = async ({email, password}) => {
    try {
      await auth.signInWithEmailAndPassword(email, password)
      history.replace('/')
    } catch (error) {
      message.error(error.message)
    }
  }

	const signInWithGoogle = async () => {
		try {
			await auth.signInWithPopup(provider)
			history.replace('/')
		} catch (error) {
			message.error(error.message)
		}
  }
  
  return (
    <Card
      style={{
        width: 340,
        margin: 'auto',
        marginTop: 64,
      }}
      bordered={false}
    >
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <a id='logo' href='/'>
          <img alt='logo' src={logo} />
        </a>

      </div>

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'メールを入力してください' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="メール" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'パスワードを入力してください' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="パスワード"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" block>
            ログイン
        	</Button>

        </Form.Item>

        <Form.Item>
          <Button type="primary" className="login-form-button" block onClick={signInWithGoogle}>
            <GoogleCircleFilled />でログイン
          </Button> <br />
					または<Link to='/signup'>登録!</Link>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default LoginForm