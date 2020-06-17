import React from 'react'
import { Form, Modal, Input, Button, message } from 'antd'
import { auth } from '../firebase'
import firebase from 'firebase'

export default function ChangePasswordModal(props) {
  const { visible, setVisible, handleCancel } = props
  const [form] = Form.useForm()
  const onFinish = (value) => {
    var credential = firebase.auth.EmailAuthProvider.credential(
      auth.currentUser.email,
      value.old
    );
    auth.currentUser.reauthenticateWithCredential(credential)
      .then(() => {
        auth.currentUser.updatePassword(value.password)
          .then(() => {
            setVisible(false)
            message.success('Change Password successfully!')
          })
          .catch((error) => {
            message.error(error.message)
          })
      })
      .catch((error) => {
        message.error(error.message)
      })
  }

  return (
    <Modal
      form={form}
      visible={visible}
      onCancel={handleCancel}
      title="パスワードを変更"
      footer={null}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="old"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password placeholder='Confirm' />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your new Password!' }]}
        >
          <Input.Password placeholder='Confirm' />
        </Form.Item>

        <Form.Item
          name="confirm"
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
          <Input.Password placeholder='Confirm' />
        </Form.Item>

        <Form.Item >
          <Button type="primary" htmlType="submit">
            OK
          </Button>
        </Form.Item>
      </Form>
    </Modal >
  )
}