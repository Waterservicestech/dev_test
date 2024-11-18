import { app } from '.'
import { env } from './env'

const PORT = env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
