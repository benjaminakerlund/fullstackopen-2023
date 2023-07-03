
const Notification = ({ message, error }) => { //2.16
    if (message === null) { 
      return null
    }
  
    if (error) { //2.17
        return (
            <div className='error' >
            {message}
            </div>
        )
    } else {
        return (
            <div className='status'>
            {message}
            </div>
        )
    }
  }
  
export default Notification 