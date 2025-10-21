// Board Details
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import BoardBar from './BoardBar'
import AppBar from '~/components/AppBar'
import BoardContent from './BoardContent'

export default function Board() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar />
      <BoardContent />
    </Container>
  )
}
