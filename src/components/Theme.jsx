import React from 'react'
import { useColorScheme } from '@mui/material'
import { IconButton, Stack, Tooltip } from '@mui/material'
import { LightMode, DarkMode, SettingsBrightness } from '@mui/icons-material'

const Theme = ({ currentUser }) => {
    const { mode, setMode } = useColorScheme()
    
    if (!mode) {
        return null
    }
    
    return (
        <Stack direction="row" spacing={1}>
            <Tooltip title="System">
                <IconButton 
                    onClick={() => setMode('system')} 
                    sx={{
                        bgcolor: mode === 'system' ? 'action.selected' : 'transparent',
                        '&:hover': {
                            bgcolor: mode === 'system' ? 'action.selected' : 'action.hover'
                        }
                    }}>
                    <SettingsBrightness sx={{
                        color: mode === 'system' ? 'primary.main' : 'text.secondary'
                    }} />
                </IconButton>
            </Tooltip>
            <Tooltip title="Light">
                <IconButton 
                    onClick={() => setMode('light')} 
                    sx={{
                        bgcolor: mode === 'light' ? 'action.selected' : 'transparent',
                        '&:hover': {
                            bgcolor: mode === 'light' ? 'action.selected' : 'action.hover'
                        }
                    }}>
                    <LightMode sx={{
                        color: mode === 'light' ? 'text.secondary' : 'text.secondary'
                    }} />
                </IconButton>
            </Tooltip>
            <Tooltip title="Dark">
                <IconButton 
                    onClick={() => setMode('dark')} 
                    sx={{
                        bgcolor: mode === 'dark' ? 'action.selected' : 'transparent',
                        '&:hover': {
                            bgcolor: mode === 'dark' ? 'action.selected' : 'action.hover'
                        }
                    }}>
                    <DarkMode sx={{
                        color: mode === 'dark' ? 'primary.main' : 'text.secondary'
                    }} />
                </IconButton>
            </Tooltip>
        </Stack>
    )
}

export default Theme 