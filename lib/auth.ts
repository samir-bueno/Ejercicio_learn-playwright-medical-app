"use server"

import { cookies } from "next/headers"

export async function checkAuth() {
  const sessionCookie = cookies().get("session")

  if (!sessionCookie) {
    return null
  }

  try {
    const session = JSON.parse(sessionCookie.value)
    return session
  } catch (error) {
    return null
  }
}

