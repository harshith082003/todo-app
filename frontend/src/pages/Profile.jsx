import React from 'react'
import {Context, server} from '../main'
import { useContext } from "react";

export default function Profile() {

  const { isAuthenticated, loading, user } = useContext(Context);

  console.log(user);

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  )
}
