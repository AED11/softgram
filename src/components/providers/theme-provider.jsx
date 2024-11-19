import theme from '@/theme/theme'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'; 
import { ThemeProvider } from '@mui/material/styles'; 



export default function ThemeWrapper({ children }) {
  return (
    <AppRouterCacheProvider options={{ key: 'css' }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
