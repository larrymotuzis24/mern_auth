import React from 'react'

export default function () {
  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
    <h2 className='text-3xl mb-4'> Welcome to my Auth app! </h2>
    <p className='mb-4'>
      This is a full-stack web application built with the MERN (Mongo, Express, React, Node.js) stack. It includes 
      authentication features that allow users to sign up, log in, log out and provides access to protected routes only for authenticated users.
    </p>
    <p className='mb-4'>
      The front-end of the application is built using React, and uses React Router for client side routing. The back end is build using Node, Express and uses Mongo DB for database. 
      Authentication is built using JSON web token. 
    </p>
    <p>
      This application is intended as a starting point for building a full-stack web application using the MERN(Mongo, Express, React, Node.js ) stack. 
    </p>
  </div>
  )
}
