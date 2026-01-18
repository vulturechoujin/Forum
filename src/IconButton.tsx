import { Avatar, IconButton, Typography } from "@mui/material";
import React from "react"

export function IconAvatar({username}:{username:string}) {
  return (
        <IconButton
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              borderRadius: 2,
              px: 1.5,
              py: 0.5,
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: 'primary.main',
              fontSize: '0.875rem',
            }}
          >
            {username.charAt(0).toUpperCase()}
          </Avatar>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            {username}
          </Typography>
        </IconButton>
  )
};

export default IconButton;
