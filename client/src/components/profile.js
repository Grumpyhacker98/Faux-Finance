import React from 'react';

export default function Profile({ user }) {

    return (
        <div>
            <span>Profile</span>
            {user && <span>Hello {user.username}</span>}
        </div>
    )
}