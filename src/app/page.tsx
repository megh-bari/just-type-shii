import { Suspense } from "react"
import JustTypeShii from "./components/just-type-shii"

export default function Home() {
  return (
    <Suspense fallback={null}>
      <JustTypeShii />
    </Suspense>
  )
}