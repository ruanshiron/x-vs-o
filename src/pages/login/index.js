import React from 'react'
import { useHistory } from 'react-router-dom'
import firebaseConfig from '../../firebaseConfig'
import { Form, Button, Input, Card, message } from 'antd'
import { UserOutlined, LockOutlined, GoogleCircleFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import logo from '../../logo.svg'

// const styles = theme => ({
// 	main: {
// 		width: 'auto',
// 		display: 'block',
// 		marginLeft: theme.spacing.unit * 3,
// 		marginRight: theme.spacing.unit * 3,
// 		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
// 			width: 400,
// 			marginLeft: 'auto',
// 			marginRight: 'auto',
// 		},
// 	},
// 	paper: {
// 		marginTop: theme.spacing.unit * 8,
// 		display: 'flex',
// 		flexDirection: 'column',
// 		alignItems: 'center',
// 		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
// 	},
// 	avatar: {
// 		margin: theme.spacing.unit,
// 		backgroundColor: theme.palette.secondary.main,
// 	},
// 	form: {
// 		width: '100%',
// 		marginTop: theme.spacing.unit,
// 	},
// 	submit: {
// 		marginTop: theme.spacing.unit * 3,
// 	},
// });

// function SignIn(props) {
// 	const { classes } = props

// 	const [email, setEmail] = useState('')
// 	const [password, setPassword] = useState('')

// 	return (
// 		<main className={classes.main}>
// 			<Paper className={classes.paper}>
// 				<Avatar className={classes.avatar}>
// 					<LockOutlinedIcon />
// 				</Avatar>
// 				<Typography component="h1" variant="h5">
// 					Sign In
//        			</Typography>
// 				<form className={classes.form} onSubmit={e => e.preventDefault() && false}>
// 					<FormControl margin="normal" required fullWidth>
// 						<InputLabel htmlFor="email">Email Address</InputLabel>
// 						<Input id="email" name="email" autoComplete="off" autoFocus value={email} onChange={e => setEmail(e.target.value)} />
// 					</FormControl>
// 					<FormControl margin="normal" required fullWidth>
// 						<InputLabel htmlFor="password">Password</InputLabel>
// 						<Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)} />
// 					</FormControl>
// 					<Button
// 						type="submit"
// 						fullWidth
// 						variant="contained"
// 						color="primary"
// 						onClick={login}
// 						className={classes.submit}>
// 						Sign In
//           			</Button>
// 					<Button
// 						type="submit"
// 						fullWidth
// 						variant="contained"
// 						onClick={signInWithGoogle}
// 						className={classes.submit}>
// 						Sign In with Google
//           			</Button>
// 					<Button
// 						type="submit"
// 						fullWidth
// 						variant="contained"
// 						color="secondary"
// 						component={Link}
// 						to="/signup"
// 						className={classes.submit}>
// 						Sign Up
//           			</Button>
// 				</form>
// 			</Paper>
// 		</main>
// 	)

// 	async function login() {
// 		try {
// 			await firebaseConfig.login(email, password)
// 			props.history.replace('/dashboard')
// 		} catch (error) {
// 			alert(error.message)
// 		}
// 	}

// 	async function signInWithGoogle() {
// 		try {
// 			await firebaseConfig.signInWithGoogle()
// 			props.history.replace('/dashboard')
// 		} catch (error) {
// 			alert(error.message)
// 		}
// 	}
// }

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
			props.history.replace('/dashboard')
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