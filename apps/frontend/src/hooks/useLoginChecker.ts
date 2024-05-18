import { useEffect } from "react"
import { useAccessToken } from "./access-token"
import { redirectDocument } from "react-router-dom"

export const useLoginChecker = () => {
  const [token] = useAccessToken()

  useEffect(() => {
    if (!token) {
      redirectDocument('/')
    }
  }, [token])
}