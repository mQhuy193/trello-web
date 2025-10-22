import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import profileAvatar from '~/assets/Avatar.png'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto',
        paddingX: 2,
        borderBottom: '1px solid white',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          icon={<DashboardIcon />}
          label="mQhuy MERN Stack Board"
          // clickable
          onClick={() => {}}
          sx={MENU_STYLES}
        />
        <Chip
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          // clickable
          onClick={() => {}}
          sx={MENU_STYLES}
        />
        <Chip
          icon={<AddToDriveIcon />}
          label="Add To Google Drive"
          // clickable
          onClick={() => {}}
          sx={MENU_STYLES}
        />
        <Chip
          icon={<BoltIcon />}
          label="Automation"
          // clickable
          onClick={() => {}}
          sx={MENU_STYLES}
        />
        <Chip
          icon={<FilterListIcon />}
          label="Filters"
          // clickable
          onClick={() => {}}
          sx={MENU_STYLES}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'rgba(255,240,241,0.6)',
            '&:hover': {
              borderColor: 'rgba(255,240,241,0.8)'
            }
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={7}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none'
            }
          }}
        >
          <Tooltip title="Remy Sharp">
            <Avatar alt="Remy Sharp" src={profileAvatar} />
          </Tooltip>
          <Tooltip title="Remy Sharp">
            <Avatar
              alt="Remy Sharp"
              src={`
                https://jbagy.me/wp-content/uploads/2025/03/Hinh-anh-doremon-cute-9.jpg
              `}
            />
          </Tooltip>
          <Tooltip title="Remy Sharp">
            <Avatar
              alt="Remy Sharp"
              src={`
                https://bom.edu.vn/public/upload/2024/12/avatar-naruto-ngau-4.webp
              `}
            />
          </Tooltip>
          <Tooltip title="Remy Sharp">
            <Avatar
              alt="Remy Sharp"
              src={`
                https://genk.mediacdn.vn/2018/12/28/photo-1-1545988660706409791675.png
              `}
            />
          </Tooltip>
          <Tooltip title="Remy Sharp">
            <Avatar
              alt="Remy Sharp"
              src={`
                https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc29ePqRvWKYk7NWFDILPDfhdxTJzZECvlwQ&s
              `}
            />
          </Tooltip>
          <Tooltip title="Remy Sharp">
            <Avatar
              alt="Remy Sharp"
              src={`
                https://64.media.tumblr.com/fababb2954021811072b391f73db1413/91b45c92c3c50f84-c7/s1280x1920/bbdba078377976b577e5f2e5882d16d59e336613.png
              `}
            />
          </Tooltip>
          <Tooltip title="Remy Sharp">
            <Avatar
              alt="Remy Sharp"
              src={`
                https://external-preview.redd.it/dIr33b-9cr-VcSyX2T2WmboOGb0HMzP3PV6qXQSjJAc.jpg?width=640&crop=smart&auto=webp&s=bc76248dcb2a08a8d5dae44fcc77b3e8a02f9ad2
              `}
            />
          </Tooltip>
          <Tooltip title="Remy Sharp">
            <Avatar
              alt="Remy Sharp"
              src={`
                https://external-preview.redd.it/dIr33b-9cr-VcSyX2T2WmboOGb0HMzP3PV6qXQSjJAc.jpg?width=640&crop=smart&auto=webp&s=bc76248dcb2a08a8d5dae44fcc77b3e8a02f9ad2
              `}
            />
          </Tooltip>
          <Tooltip title="Remy Sharp">
            <Avatar
              alt="Remy Sharp"
              src={`
                https://external-preview.redd.it/dIr33b-9cr-VcSyX2T2WmboOGb0HMzP3PV6qXQSjJAc.jpg?width=640&crop=smart&auto=webp&s=bc76248dcb2a08a8d5dae44fcc77b3e8a02f9ad2
              `}
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
