import React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

function TrelloCard({ temporaryHideMedia }) {
  if (temporaryHideMedia) {
    return (
      <Card
        sx={{
          cursor: 'pointer',
          boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
          overflow: 'unset'
        }}
      >
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>Card test 01</Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
        overflow: 'unset'
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtlriHgterqY3PU_9NIIrOqRWzagf0925ClTA9e60Bx3wHFOYazJDzY7pbhbSeZcRw6RE&usqp=CAU"
      />
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>Lập trình MERN Stack</Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        <Button size="small" startIcon={<GroupIcon />}>
          20
        </Button>
        <Button size="small" startIcon={<CommentIcon />}>
          15
        </Button>
        <Button size="small" startIcon={<AttachmentIcon />}>
          10
        </Button>
      </CardActions>
    </Card>
  )
}

export default TrelloCard
