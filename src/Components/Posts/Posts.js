import React from 'react'
import { useContext, useEffect, useState } from 'react/cjs/react.development'
import { FirebaseContext } from '../../store/FirebaseContext'
import Heart from '../../assets/Heart'
import './Post.css'
import { PostContext } from '../../store/PostContext'
import { useHistory } from 'react-router-dom'

function Posts() {
  const { firebase } = useContext(FirebaseContext)
  const [products, setProducts] = useState([])
  const { setPostDetails } = useContext(PostContext)
  const history = useHistory()
  useEffect(() => {
    firebase
      .firestore()
      .collection('products')
      .get()
      .then((snapshot) => {
        const allPost = snapshot.docs.map((product) => {
          return {
            ...product.data(),
            id: product.id,
          }
        })
        setProducts(allPost)
      })
  })
  return (
    <div className='postParentDiv'>
      <div className='moreView'>
        <div className='heading'>
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className='cards'>
          {products.map((product) => {
            return (
              <div
                className='card'
                onClick={() => {
                  setPostDetails(product)
                  history.push('/view')
                }}
              >
                <div className='favorite'>
                  <Heart></Heart>
                </div>
                <div className='image'>
                  <img src={product.url} alt='' />
                </div>
                <div className='content'>
                  <p className='rate'>&#x20B9; {product.price}</p>
                  <span className='kilometer'>{product.category}</span>
                  <p className='name'> {product.name}</p>
                  <div className='date'>
                    <span>{product.createdAt}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>{' '}
      </div>
      <div className='recommendations'>
        <div className='heading'>
          <span>Vehicles</span>
        </div>
        <div className='cards'>
          {products
            .filter((pro) => pro.category === 'Vehicles')
            .map((product) => (
              <div className='card'>
                <div className='favorite'>
                  <Heart></Heart>
                </div>
                <div className='image'>
                  <img src={product.url} alt='' />
                </div>
                <div className='content'>
                  <p className='rate'>&#x20B9; {product.price}</p>
                  <span className='kilometer'>{product.category}</span>
                  <p className='name'> {product.name}</p>
                  <div className='date'>
                    <span>{product.createdAt}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className='recommendations'>
        <div className='heading'>
          <span>Laptop</span>
        </div>
        <div className='cards'>
          {products
            .filter((pro) => pro.category === 'Laptop')
            .map((product) => (
              <div className='card'>
                <div className='favorite'>
                  <Heart></Heart>
                </div>
                <div className='image'>
                  <img src={product.url} alt='' />
                </div>
                <div className='content'>
                  <p className='rate'>&#x20B9; {product.price}</p>
                  <span className='kilometer'>{product.category}</span>
                  <p className='name'> {product.name}</p>
                  <div className='date'>
                    <span>{product.createdAt}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Posts
