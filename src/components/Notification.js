import React from 'react'

const Notification = ({errorMessage}) => {
    if (!errorMessage) {
        return null
    }
    const notificationStyle = {
        backgroundColor: "#bbebed",
        padding: "10px"
    }
    return (
        <div style={notificationStyle}>
            {errorMessage}
        </div>
    )
}

export default Notification