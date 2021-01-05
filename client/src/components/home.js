import React from 'react';

export default function Home({ user }) {

    return (
        <div>
            <span>Home</span>
            {user && <span>Hello {user.username}</span>}
        </div>
    )
}