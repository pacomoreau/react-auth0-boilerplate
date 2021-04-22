import { SamplePostForm } from "components/SamplePostForm"
function Bomb() {
  throw new Error("💥 CABOOM 💥")
}
const Create = () => {
  return (
    <>
      <Bomb />
      <SamplePostForm />
    </>
  )
}

export default Create
