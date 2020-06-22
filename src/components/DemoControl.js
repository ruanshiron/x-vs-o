import React, { useState } from 'react'
import { Card, Button, message, Col, Row } from 'antd'
import { firestore, functions } from '../firebase'
import { UserModel } from '../model'

function initExampleUser(n) {
  let r = []

  for (let index = 0; index < n; index++) {
    const fn = Math.floor(Math.random() * nameData.familyName.length)
    const lnp = Math.floor(Math.random() * nameData.middleName.length)
    const lns = Math.floor(Math.random() * nameData.realName.length)
    const displayName = `${nameData.familyName[fn]} ${nameData.middleName[lnp]} ${nameData.realName[lns]}`

    const points = lnp - lns > 0 ? lnp - lns : 0
    r.push({
      ...UserModel,
      email: `user${index}@example.com`,
      displayName: displayName,
      points: points,
      rank: 0,
      wins: lns,
      losses: lnp,
      matches: lns + lnp,
    })
  }

  return r.sort((a, b) => b.points - a.points)
}

function range(start, stop, step) {
  if (typeof stop == 'undefined') {
    // one param defined
    stop = start;
    start = 0;
  }

  if (typeof step == 'undefined') {
    step = 1;
  }

  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return [];
  }

  var result = [];
  for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }

  return result;
}

export default function DemoControl() {
  const [createPending, setCreatePending] = useState(false)
  const [deletePending, setDeletePending] = useState(false)
  const [deleteAllPending, setDeleteAllPending] = useState(false)
  const [rankingPending, setRankingPending] = useState(false)

  const createUsers = () => {
    setCreatePending(true)
    Promise.all(
      initExampleUser(100).map((u, i) => {
        return firestore.collection('users').doc(`example${i}`).set({ ...u, rank: i + 1 })
      })
    )
      .then(() => {
        setCreatePending(false)
      })
  }

  const deleteUsers = () => {
    setDeletePending(true)
    Promise.all(
      range(100).map(i => {
        return firestore.collection('users').doc(`example${i}`).delete()
      })
    )
      .then(() => {
        setDeletePending(false)
      })
  }

  const deleteAllUsers = () => {
    setDeleteAllPending(true)
    var deleteAllUsers = functions.httpsCallable('deleteAllUsers');
    deleteAllUsers().then(function (result) {
      setDeleteAllPending(false)
    })
  }

  const rankingUsers = () => {
    setRankingPending(true)
    var orderRanks = functions.httpsCallable('orderRanks');
    orderRanks()
      .then(function (result) {
        console.log(result)
        setRankingPending(false)
      })
      .catch(e => message.error(e.message))
  }

  return (
    <Card style={{ width: '100%' }}>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Button style={{marginLeft: 12, marginBottom: 12}} block loading={createPending} type='primary' onClick={createUsers} >Create 100 example user</Button>
          <Button style={{marginLeft: 12, marginBottom: 12}} block loading={deletePending} type='primary' onClick={deleteUsers} danger>Deleta all example user</Button>
        </Col>
        <Col span={12}>
          <Button style={{marginLeft: 12, marginBottom: 12}} block loading={deleteAllPending} type='primary' onClick={deleteAllUsers} danger>Deleta all user</Button>
          <Button style={{marginLeft: 12, marginBottom: 12}} block loading={rankingPending} type='primary' onClick={rankingUsers} >Ranking all Users</Button>
        </Col>
      </Row>
    </Card>
  )
}

const nameData = {
  'familyName': [
    'Nguyễn',
    'Trần',
    'Lý',
    'Lê',
    'Phạm',
    'Huỳnh',
    'Phan',
    'Vũ',
    'Đặng',
    'Bùi',
    'Đỗ',
    'Hồ',
    'Ngô',
    'Dương'
  ],
  'middleName': [
    'Văn',
    'Hữu',
    'Thị',
    'Thành',
    'Công',
    'Mai',
    'Quang',
    'Sinh',
    'Thế',
    'Đức',
    'Minh',
    'Hải'
  ],
  'realName': [
    'Vinh',
    'Quang',
    'Dung',
    'Hinh',
    'Nam',
    'Thành',
    'Đại',
    'Đạt',
    'Diệp',
    'Nguyên',
    'Toản',
    'Anh',
    'Hùng',
    'Đức',
    'Uyên',
    'Phương Anh',
    'Nga'
  ]
}