import React from 'react'
import { Form, Input, Card, Button, Tooltip, Typography, message } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase/app'

const formItemLayout = {
  labelAlign: 'left',
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 0,
    },
  },
}

function SignupForm(props) {
  const [form] = Form.useForm()
  let history = useHistory()
  const auth = firebase.auth()
  const db = firebase.firestore()

  const onFinish = async values => {
    let { name, email, password } = values
    try {
      const result = await auth.createUserWithEmailAndPassword(email, password)
      const newUser = {
        stats: {
          wins: 0,
          losses: 0,
          points: 0,
          ranks: 0,
          elo: 0
        },
        blocked: false,
      }

      await result.user.updateProfile({ displayName: name })
      await db.collection('users').doc(result.user.uid).set({
        ...newUser,
        displayName: name,
        email: result.user.email
      })
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });

      history.replace('/')
    } catch (error) {
      message.error(error.message)
    }
  }

  return (
    <Card
      style={{
        width: 512,
        margin: 'auto',
        marginTop: 64,
      }}
      bordered={false}
    >
      <Typography.Title
        level={1}
        style={{ textAlign: 'center', marginBottom: 32 }}
      >
        Signup to X vs O
      </Typography.Title>

      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >

        <Form.Item
          name="name"
          label={
            <span>
              Nickname&nbsp;
            <Tooltip title="What do you want others to call you?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" block size='large'>
            Register
        </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default SignupForm