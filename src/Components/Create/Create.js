import React, { Fragment } from 'react'
import './Create.css'
import Header from '../Header/Header'
import { useState, useContext } from 'react/cjs/react.development'
import { FirebaseContext, AuthContext } from '../../store/FirebaseContext'
import { useHistory } from 'react-router-dom'
const Create = () => {
  const { firebase } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const date = new Date()
  const history = useHistory()
  const handleSubmit = () => {
    if ((name && category && price) !== '' && image !== null) {
      setLoading(true)
    }
    firebase
      .storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          console.log(url)
          firebase.firestore().collection('products').add({
            name,
            description,
            category,
            price,
            url,
            userId: user.uid,
            createdAt: date.toDateString(),
          })
          history.push('/')
        })
      })
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className='centerDiv'>
          <form>
            <label htmlFor='fname'>Name</label>
            <br />
            <input
              className='input'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              id='fname'
              name='Name'
            />
            <br />
            <label htmlFor='fname'>Description</label>
            <br />
            <input
              className='input'
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id='fname'
              name='category'
            />
            <br /> <br />
            <label for=''>Category</label>
            <br />
            <select
              name='category'
              id='category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value='none' selected hidden>
                Select an Option
              </option>
              <option value='Mobile'>Mobile</option>
              <option value='Laptop'>Laptop</option>
              <option value='Vehicles'>Vehicles</option>
              <option value='Houses and Apartments'>
                Houses and Apartments
              </option>
            </select>
            <br /> <br />
            <label htmlFor='fname'>Price</label>
            <br />
            <input
              className='input'
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              id='fname'
              name='Price'
            />
            <br />
          </form>
          <br />
          <img
            alt='Posts'
            width='200px'
            height='200px'
            src={image ? URL.createObjectURL(image) : ''}
          ></img>
          <br /> <br />
          <input
            onChange={(e) => {
              setImage(e.target.files[0])
            }}
            type='file'
          />
          <br />
          <button
            disabled={loading}
            className='uploadBtn'
            onClick={handleSubmit}
          >
            {!loading ? 'Post now' : `Posting...`}
          </button>
        </div>
      </card>
    </Fragment>
  )
}

export default Create
