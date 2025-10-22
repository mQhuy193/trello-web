// Board Details

import Container from '@mui/material/Container'
import BoardBar from './BoardBar/BoardBar'
import AppBar from '~/components/AppBar/AppBar'
import BoardContent from './BoardContent/BoardContent'

export default function Board() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar />
      <BoardContent />
    </Container>
  )
}
