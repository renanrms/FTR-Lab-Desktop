import { Container } from './styles'

export function Navbar(responses: any) {
  return (
    <Container>
      {JSON.stringify(responses)}
    </Container>
  )
}
