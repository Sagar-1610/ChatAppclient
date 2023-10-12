import React from 'react';

const Messages = ({message,user,classs}) => {
   if(user){
    return (
        <div className={`messagebox ${classs}`}>
          {`${user}:${message}`}
        </div>
      )
   }
   else{
    return (
        <div className={`messagebox ${classs}`}>
          {`You:${message}`}
        </div>
      )
   }
}

export default Messages
