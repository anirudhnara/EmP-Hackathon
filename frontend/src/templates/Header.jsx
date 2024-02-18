import React from 'react'

const Header = (props) => {
  const {name} = props
  return (
    <div>
      <div className=''>
        <h1>gaming</h1>
        <h2>{name}</h2>
      </div>
    </div>
  )
}

export default Header