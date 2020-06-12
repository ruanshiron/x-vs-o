import React from 'react'
import LoginForm from '../../components/LoginForm'
import { AuthCheck, SuspenseWithPerf } from 'reactfire'
import LinkButton from '../../components/LinkButton'
import { Result } from 'antd'

function Login(props) {

	return (
		<SuspenseWithPerf fallback={''}>
			<AuthCheck fallback={<LoginForm />}>
				<Result
					status="info"
					title="あなたはログインしました"
					extra={
						<LinkButton
							to="/"
						>
							戻る	
						</LinkButton>
					}
				/>
			</AuthCheck>
		</SuspenseWithPerf>
	)
}

export default Login