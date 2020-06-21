import React, { useState } from 'react'
import { AutoComplete, Input } from 'antd'
import { firestore } from '../firebase'
import { useHistory } from 'react-router-dom'
import indexSearch from '../algoliasearch'

const searchResult = async query => {
  const userRef = firestore.collection('users').where('displayName', '>=', query).limit(10)

  const snapshots = await userRef.get()
  const result = []
  snapshots.forEach(async (doc) => {
    // console.log(doc.id)

    await result.push({ uid: doc.id, ...doc.data() })
  })

  return await result.map(u => ({
    uid: u.uid,
    value: u.displayName,
    label: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>
          {u.displayName}
        </span>
        <span>
          {u.rank}
        </span>
      </div>
    )
  }))
}

export default function SearchInput() {

  const [options, setOptions] = useState([])
  let history = useHistory()

  const handleSearch = async value => {
    // console.log(await searchResult(value))
    setOptions(value ? await searchResult(value) : []);
  };

  const onSelect = (value, data) => {
    console.log('onSelect', value)
    history.push(`/social/${data.uid}`)
  }

  const onSearch = (query) => {
    history.push(`/search/?q=${query}`)
  }

  return (
    <AutoComplete
      dropdownMatchSelectWidth={350}
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}
    >
      <Input.Search style={{maxWidth: 180}} size='large' placeholder='ユーザを検索' onSearch={onSearch} />
    </AutoComplete>
  )
}