import React, { useState } from 'react'
import { FixedSizeList as List, FixedSizeGrid as Grid } from 'react-window'
import * as faker from 'faker'
import './index.css'

export const ReactWindowTest = () => {
  const [dataList, setData] = useState(() =>
    Array.from({ length: 10000 }, faker.address.city)
  )

  const reverse = () => {
    setData((data) => data.slice().reverse())
  }
  const COLUMNS = 18
  const ROWS = 30

  const data = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLUMNS }, faker.internet.avatar)
  )
  console.log('data', data)
  return (
    <main>
      <button onClick={reverse}>Reverse</button>
      <List
        innerElementType="ul"
        itemCount={10}
        itemSize={20}
        height={700}
        width={400}
      >
        {({ index, style }) => {
          return <li style={style}>{dataList[index]}</li>
        }}
      </List>
      <Grid
        columnCount={2}
        rowCount={30}
        columnWidth={150}
        rowHeight={150}
        height={500}
        width={600}
      >
        {({ rowIndex, columnIndex, style }) => {
          return <img style={style} className='grid-img' src={data[rowIndex][columnIndex]} alt="" />
        }}
      </Grid>
    </main>
  )
}
