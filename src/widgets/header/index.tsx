'use client';

import {AppBar, Toolbar, Typography, IconButton, Box} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './styles.module.scss';

export const Header = () => {
    return (
        <AppBar position="static" className={styles.header}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    График работы сотрудников
                </Typography>
                <Box>
                    <Typography variant="body2">Текущая дата: {new Date().toLocaleDateString()}</Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
