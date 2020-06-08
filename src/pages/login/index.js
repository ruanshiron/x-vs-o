import React from 'react'
import { useHistory } from 'react-router-dom'
import firebaseConfig from '../../firebaseConfig'
import { Form, Button, Input, Card, message } from 'antd'
import { UserOutlined, LockOutlined, GoogleCircleFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import logo from '../../logo.svg'

function Login(props) {
	let history = useHistory()

	const onFinish = async values => {
		console.log('Received values of form: ', values)
		try {
			await firebaseConfig
				.login(values.email, values.password)
			history.replace('/')
		} catch (error) {
			message.error(error.message)
		}
	}

	const signInWithGoogle = async () => {
		try {
			await firebaseConfig.signInWithGoogle()
			history.replace('/dashboard')
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
					rules={[{ required: true, message: 'Please input your Email!' }]}
				>
					<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
				</Form.Item>
				<Form.Item
					name="password"
					rules={[{ required: true, message: 'Please input your Password!' }]}
				>
					<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="Password"
					/>
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" className="login-form-button" block>
						Login
        	</Button>

				</Form.Item>

				<Form.Item>
					<Button type="primary" className="login-form-button" block onClick={signInWithGoogle}>
						Login with<GoogleCircleFilled />
					</Button> <br />
					Or <Link to='/signup'>register now!</Link>
				</Form.Item>
			</Form>
		</Card>
	)
}

export default Login