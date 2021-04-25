import { useState, useEffect } from "react"

export const useDocumentTitle = (newTitle) => {
  const [title, setTitle] = useState(newTitle)

  useEffect(() => {
    document.title = title
  }, [title, setTitle])

  return [title, setTitle]
}
