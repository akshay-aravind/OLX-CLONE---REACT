import React, { useContext } from 'react'

import './Header.css'
import OlxLogo from '../../assets/OlxLogo'
import Search from '../../assets/Search'
import Arrow from '../../assets/Arrow'
import SellButton from '../../assets/SellButton'
import SellButtonPlus from '../../assets/SellButtonPlus'
import { AuthContext, FirebaseContext } from '../../store/FirebaseContext'
import { useHistory } from 'react-router-dom'
function Header() {
  const { user } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)
  const history = useHistory()
  const navigate = useHistory()
  const home = useHistory()
  return (
    <div className='headerParentDiv'>
      <div className='headerChildDiv'>
        <div className='brandName'>
          <OlxLogo></OlxLogo>
        </div>
        {/* <div className="placeSearch">
          <Search></Search>
          <input type="text" placeholder='Location'/>
          <Arrow></Arrow>
        </div> */}
        <div className='homePage'>
          <span
            onClick={() => {
              home.push('/')
            }}
          >
            HOME
          </span>
        </div>
        <div className='productSearch'>
          <div className='input'>
            <input
              type='text'
              Home
              placeholder='Find car,mobile phone and more...'
            />
          </div>
          <div className='searchAction'>
            <Search color='#ffffff'></Search>
          </div>
        </div>
        <div className='language'>
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className='loginPage'>
          <span
            onClick={() => {
              history.push('/login')
            }}
          >
            {user ? `Welcome ${user.displayName}` : 'Login'}
          </span>
          <hr />
        </div>
        {user && (
          <span
            onClick={() => {
              firebase.auth().signOut()
              history.push('/login')
            }}
          >
            Logout
          </span>
        )}

        <div
          className='sellMenu'
          onClick={() => {
            navigate.push('/create')
          }}
        >
          <SellButton></SellButton>
          <div className='sellMenuContent'>
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
