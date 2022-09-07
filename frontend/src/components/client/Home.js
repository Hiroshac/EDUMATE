import React from 'react'

const Home = () => {
  return (
    <div className='' style={{marginLeft:'30%',marginRight:'30%', marginTop:'10%'}}>
      <div className='border shadow rounded-3 bg-light'>
      <form className='mx-5 mt-5 mb-5'>
        <h2 className='text-center mb-4'>FORM NAME</h2>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <div align="center">
          <button type="submit" class="btn btn-primary mt-5 ">Submit</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Home