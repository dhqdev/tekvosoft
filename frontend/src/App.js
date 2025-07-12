import React, { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import "./styles/global.css";
import { QueryClient, QueryClientProvider } from "react-query";

import {enUS, ptBR, esES} from "@material-ui/core/locale";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import ColorModeContext from "./layout/themeContext";
import { SocketContext, SocketManager } from './context/Socket/SocketContext';

import Routes from "./routes";

const queryClient = new QueryClient();

const App = () => {
    const [locale, setLocale] = useState();

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const preferredTheme = window.localStorage.getItem("preferredTheme");
    const [mode, setMode] = useState(preferredTheme ? preferredTheme : prefersDarkMode ? "dark" : "light");

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        []
    );

    const theme = createTheme(
        {
            // Tipografia moderna
            typography: {
                fontFamily: [
                    '-apple-system',
                    'BlinkMacSystemFont',
                    '"Segoe UI"',
                    'Roboto',
                    '"Helvetica Neue"',
                    'Arial',
                    'sans-serif',
                ].join(','),
                h1: {
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                },
                h2: {
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                },
                h3: {
                    fontWeight: 600,
                },
                h4: {
                    fontWeight: 500,
                },
                h5: {
                    fontWeight: 500,
                },
                h6: {
                    fontWeight: 500,
                },
                body1: {
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                },
                body2: {
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                },
            },
            // Configurações de transições globais
            transitions: {
                duration: {
                    shortest: 150,
                    shorter: 200,
                    short: 250,
                    standard: 300,
                    complex: 375,
                    enteringScreen: 225,
                    leavingScreen: 195,
                },
            },
            // Shadows modernos
            shadows: mode === "light" ? [
                "none",
                "0px 2px 1px -1px rgba(0,0,0,0.06),0px 1px 1px 0px rgba(0,0,0,0.04),0px 1px 3px 0px rgba(0,0,0,0.04)",
                "0px 3px 1px -2px rgba(0,0,0,0.06),0px 2px 2px 0px rgba(0,0,0,0.04),0px 1px 5px 0px rgba(0,0,0,0.04)",
                "0px 3px 3px -2px rgba(0,0,0,0.06),0px 3px 4px 0px rgba(0,0,0,0.04),0px 1px 8px 0px rgba(0,0,0,0.04)",
                "0px 2px 4px -1px rgba(0,0,0,0.06),0px 4px 5px 0px rgba(0,0,0,0.04),0px 1px 10px 0px rgba(0,0,0,0.04)",
                "0px 3px 5px -1px rgba(0,0,0,0.06),0px 5px 8px 0px rgba(0,0,0,0.04),0px 1px 14px 0px rgba(0,0,0,0.04)",
                "0px 3px 5px -1px rgba(0,0,0,0.06),0px 6px 10px 0px rgba(0,0,0,0.04),0px 1px 18px 0px rgba(0,0,0,0.04)",
                "0px 4px 5px -2px rgba(0,0,0,0.06),0px 7px 10px 1px rgba(0,0,0,0.04),0px 2px 16px 1px rgba(0,0,0,0.04)",
                "0px 5px 5px -3px rgba(0,0,0,0.06),0px 8px 10px 1px rgba(0,0,0,0.04),0px 3px 14px 2px rgba(0,0,0,0.04)",
                "0px 5px 6px -3px rgba(0,0,0,0.06),0px 9px 12px 1px rgba(0,0,0,0.04),0px 3px 16px 2px rgba(0,0,0,0.04)",
                "0px 6px 6px -3px rgba(0,0,0,0.06),0px 10px 14px 1px rgba(0,0,0,0.04),0px 4px 18px 3px rgba(0,0,0,0.04)",
                "0px 6px 7px -4px rgba(0,0,0,0.06),0px 11px 15px 1px rgba(0,0,0,0.04),0px 4px 20px 3px rgba(0,0,0,0.04)",
                "0px 7px 8px -4px rgba(0,0,0,0.06),0px 12px 17px 2px rgba(0,0,0,0.04),0px 5px 22px 4px rgba(0,0,0,0.04)",
                "0px 7px 8px -4px rgba(0,0,0,0.06),0px 13px 19px 2px rgba(0,0,0,0.04),0px 5px 24px 4px rgba(0,0,0,0.04)",
                "0px 7px 9px -4px rgba(0,0,0,0.06),0px 14px 21px 2px rgba(0,0,0,0.04),0px 5px 26px 4px rgba(0,0,0,0.04)",
                "0px 8px 9px -5px rgba(0,0,0,0.06),0px 15px 22px 2px rgba(0,0,0,0.04),0px 6px 28px 5px rgba(0,0,0,0.04)",
                "0px 8px 10px -5px rgba(0,0,0,0.06),0px 16px 24px 2px rgba(0,0,0,0.04),0px 6px 30px 5px rgba(0,0,0,0.04)",
                "0px 8px 11px -5px rgba(0,0,0,0.06),0px 17px 26px 2px rgba(0,0,0,0.04),0px 6px 32px 5px rgba(0,0,0,0.04)",
                "0px 9px 11px -5px rgba(0,0,0,0.06),0px 18px 28px 2px rgba(0,0,0,0.04),0px 7px 34px 6px rgba(0,0,0,0.04)",
                "0px 9px 12px -6px rgba(0,0,0,0.06),0px 19px 29px 2px rgba(0,0,0,0.04),0px 7px 36px 6px rgba(0,0,0,0.04)",
                "0px 10px 13px -6px rgba(0,0,0,0.06),0px 20px 31px 3px rgba(0,0,0,0.04),0px 8px 38px 7px rgba(0,0,0,0.04)",
                "0px 10px 13px -6px rgba(0,0,0,0.06),0px 21px 33px 3px rgba(0,0,0,0.04),0px 8px 40px 7px rgba(0,0,0,0.04)",
                "0px 10px 14px -6px rgba(0,0,0,0.06),0px 22px 35px 3px rgba(0,0,0,0.04),0px 8px 42px 7px rgba(0,0,0,0.04)",
                "0px 11px 14px -7px rgba(0,0,0,0.06),0px 23px 36px 3px rgba(0,0,0,0.04),0px 9px 44px 8px rgba(0,0,0,0.04)",
                "0px 11px 15px -7px rgba(0,0,0,0.06),0px 24px 38px 3px rgba(0,0,0,0.04),0px 9px 46px 8px rgba(0,0,0,0.04)",
            ] : [
                "none",
                "0px 2px 1px -1px rgba(0,0,0,0.4),0px 1px 1px 0px rgba(0,0,0,0.3),0px 1px 3px 0px rgba(0,0,0,0.3)",
                "0px 3px 1px -2px rgba(0,0,0,0.4),0px 2px 2px 0px rgba(0,0,0,0.3),0px 1px 5px 0px rgba(0,0,0,0.3)",
                "0px 3px 3px -2px rgba(0,0,0,0.4),0px 3px 4px 0px rgba(0,0,0,0.3),0px 1px 8px 0px rgba(0,0,0,0.3)",
                "0px 2px 4px -1px rgba(0,0,0,0.4),0px 4px 5px 0px rgba(0,0,0,0.3),0px 1px 10px 0px rgba(0,0,0,0.3)",
                "0px 3px 5px -1px rgba(0,0,0,0.4),0px 5px 8px 0px rgba(0,0,0,0.3),0px 1px 14px 0px rgba(0,0,0,0.3)",
                "0px 3px 5px -1px rgba(0,0,0,0.4),0px 6px 10px 0px rgba(0,0,0,0.3),0px 1px 18px 0px rgba(0,0,0,0.3)",
                "0px 4px 5px -2px rgba(0,0,0,0.4),0px 7px 10px 1px rgba(0,0,0,0.3),0px 2px 16px 1px rgba(0,0,0,0.3)",
                "0px 5px 5px -3px rgba(0,0,0,0.4),0px 8px 10px 1px rgba(0,0,0,0.3),0px 3px 14px 2px rgba(0,0,0,0.3)",
                "0px 5px 6px -3px rgba(0,0,0,0.4),0px 9px 12px 1px rgba(0,0,0,0.3),0px 3px 16px 2px rgba(0,0,0,0.3)",
                "0px 6px 6px -3px rgba(0,0,0,0.4),0px 10px 14px 1px rgba(0,0,0,0.3),0px 4px 18px 3px rgba(0,0,0,0.3)",
                "0px 6px 7px -4px rgba(0,0,0,0.4),0px 11px 15px 1px rgba(0,0,0,0.3),0px 4px 20px 3px rgba(0,0,0,0.3)",
                "0px 7px 8px -4px rgba(0,0,0,0.4),0px 12px 17px 2px rgba(0,0,0,0.3),0px 5px 22px 4px rgba(0,0,0,0.3)",
                "0px 7px 8px -4px rgba(0,0,0,0.4),0px 13px 19px 2px rgba(0,0,0,0.3),0px 5px 24px 4px rgba(0,0,0,0.3)",
                "0px 7px 9px -4px rgba(0,0,0,0.4),0px 14px 21px 2px rgba(0,0,0,0.3),0px 5px 26px 4px rgba(0,0,0,0.3)",
                "0px 8px 9px -5px rgba(0,0,0,0.4),0px 15px 22px 2px rgba(0,0,0,0.3),0px 6px 28px 5px rgba(0,0,0,0.3)",
                "0px 8px 10px -5px rgba(0,0,0,0.4),0px 16px 24px 2px rgba(0,0,0,0.3),0px 6px 30px 5px rgba(0,0,0,0.3)",
                "0px 8px 11px -5px rgba(0,0,0,0.4),0px 17px 26px 2px rgba(0,0,0,0.3),0px 6px 32px 5px rgba(0,0,0,0.3)",
                "0px 9px 11px -5px rgba(0,0,0,0.4),0px 18px 28px 2px rgba(0,0,0,0.3),0px 7px 34px 6px rgba(0,0,0,0.3)",
                "0px 9px 12px -6px rgba(0,0,0,0.4),0px 19px 29px 2px rgba(0,0,0,0.3),0px 7px 36px 6px rgba(0,0,0,0.3)",
                "0px 10px 13px -6px rgba(0,0,0,0.4),0px 20px 31px 3px rgba(0,0,0,0.3),0px 8px 38px 7px rgba(0,0,0,0.3)",
                "0px 10px 13px -6px rgba(0,0,0,0.4),0px 21px 33px 3px rgba(0,0,0,0.3),0px 8px 40px 7px rgba(0,0,0,0.3)",
                "0px 10px 14px -6px rgba(0,0,0,0.4),0px 22px 35px 3px rgba(0,0,0,0.3),0px 8px 42px 7px rgba(0,0,0,0.3)",
                "0px 11px 14px -7px rgba(0,0,0,0.4),0px 23px 36px 3px rgba(0,0,0,0.3),0px 9px 44px 8px rgba(0,0,0,0.3)",
                "0px 11px 15px -7px rgba(0,0,0,0.4),0px 24px 38px 3px rgba(0,0,0,0.3),0px 9px 46px 8px rgba(0,0,0,0.3)",
            ],
            scrollbarStyles: {
                "&::-webkit-scrollbar": {
                    width: '8px',
                    height: '8px',
                },
                "&::-webkit-scrollbar-track": {
                    background: mode === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)",
                    borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                    background: mode === "light" ? 
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : 
                        "linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)",
                    borderRadius: "10px",
                    border: mode === "light" ? "2px solid #f1f1f1" : "2px solid #2d2d2d",
                    transition: "all 0.3s ease",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                    background: mode === "light" ? 
                        "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)" : 
                        "linear-gradient(135deg, #7C3AED 0%, #9333EA 100%)",
                },
            },
            scrollbarStylesSoft: {
                "&::-webkit-scrollbar": {
                    width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                    background: mode === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)",
                    borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: mode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)",
                    borderRadius: "10px",
                    transition: "background-color 0.3s ease",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: mode === "light" ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)",
                },
            },
            palette: {
                type: mode,
                primary: { 
                    main: mode === "light" ? "#667eea" : "#8B5CF6",
                    light: mode === "light" ? "#8b9cf4" : "#A855F7",
                    dark: mode === "light" ? "#4c63d2" : "#7C3AED",
                    contrastText: "#FFFFFF"
                },
                secondary: {
                    main: mode === "light" ? "#764ba2" : "#EC4899",
                    light: mode === "light" ? "#9575cd" : "#F472B6",
                    dark: mode === "light" ? "#5e35b1" : "#DB2777",
                    contrastText: "#FFFFFF"
                },
                background: {
                    default: mode === "light" ? "#f8fafc" : "#0f172a",
                    paper: mode === "light" ? "#ffffff" : "#1e293b",
                },
                textPrimary: mode === "light" ? "#667eea" : "#f1f5f9",
                borderPrimary: mode === "light" ? "#667eea" : "#8B5CF6",
                dark: { main: mode === "light" ? "#1e293b" : "#f1f5f9" },
                light: { main: mode === "light" ? "#f1f5f9" : "#1e293b" },
                tabHeaderBackground: mode === "light" ? "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)" : "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                optionsBackground: mode === "light" ? "#ffffff" : "#1e293b",
                options: mode === "light" ? "#f8fafc" : "#334155",
                fontecor: mode === "light" ? "#0ea5e9" : "#38bdf8",
                fancyBackground: mode === "light" ? 
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : 
                    "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                bordabox: mode === "light" ? "#e2e8f0" : "#374151",
                newmessagebox: mode === "light" ? "#f1f5f9" : "#374151",
                inputdigita: mode === "light" ? "#ffffff" : "#374151",
                contactdrawer: mode === "light" ? "#ffffff" : "#374151",
                announcements: mode === "light" ? "#f8fafc" : "#1e293b",
                login: mode === "light" ? "#ffffff" : "#0f172a",
                announcementspopover: mode === "light" ? "#ffffff" : "#374151",
                chatlist: mode === "light" ? "#f8fafc" : "#374151",
                boxlist: mode === "light" ? "#f1f5f9" : "#374151",
                boxchatlist: mode === "light" ? "#f1f5f9" : "#1e293b",
                total: mode === "light" ? "#ffffff" : "#1e293b",
                messageIcons: mode === "light" ? "#64748b" : "#cbd5e1",
                inputBackground: mode === "light" ? "#ffffff" : "#1e293b",
                barraSuperior: mode === "light" ? 
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : 
                    "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
                boxticket: mode === "light" ? "#f8fafc" : "#374151",
                campaigntab: mode === "light" ? "#f1f5f9" : "#374151",
                mediainput: mode === "light" ? "#f8fafc" : "#0f172a",
            },
            // Overrides para componentes específicos
            overrides: {
                MuiPaper: {
                    root: {
                        backgroundImage: "none",
                        transition: "box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    },
                    elevation1: {
                        boxShadow: mode === "light" ? 
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" :
                            "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
                    },
                    elevation2: {
                        boxShadow: mode === "light" ? 
                            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" :
                            "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
                    },
                    elevation3: {
                        boxShadow: mode === "light" ? 
                            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" :
                            "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
                    },
                },
                MuiButton: {
                    root: {
                        textTransform: "none",
                        fontWeight: 500,
                        borderRadius: "8px",
                        padding: "8px 16px",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                            transform: "translateY(-1px)",
                            boxShadow: mode === "light" ? 
                                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" :
                                "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
                        },
                    },
                    containedPrimary: {
                        background: mode === "light" ? 
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : 
                            "linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        "&:hover": {
                            background: mode === "light" ? 
                                "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)" : 
                                "linear-gradient(135deg, #7C3AED 0%, #9333EA 100%)",
                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                        },
                    },
                },
                MuiCard: {
                    root: {
                        borderRadius: "12px",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: mode === "light" ? 
                                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" :
                                "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
                        },
                    },
                },
                MuiTextField: {
                    root: {
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            "&:hover": {
                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                            },
                            "&.Mui-focused": {
                                boxShadow: "0 4px 6px -1px rgba(103, 126, 234, 0.3), 0 2px 4px -1px rgba(103, 126, 234, 0.2)",
                            },
                        },
                    },
                },
                MuiAppBar: {
                    root: {
                        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                    },
                },
                MuiDrawer: {
                    paper: {
                        borderRadius: mode === "light" ? "0 16px 16px 0" : "0 12px 12px 0",
                    },
                },
            },
            mode,
        },
        locale
    );

    useEffect(() => {
        const i18nlocale = localStorage.getItem("i18nextLng");
        const browserLocale = i18nlocale?.substring(0, 2) ?? 'pt';

        if (browserLocale === "pt"){
            setLocale(ptBR);
        }else if( browserLocale === "en" ) {
            setLocale(enUS)
        }else if( browserLocale === "es" )
            setLocale(esES)

    }, []);

    useEffect(() => {
        window.localStorage.setItem("preferredTheme", mode);
    }, [mode]);



    return (
        <ColorModeContext.Provider value={{ colorMode }}>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                  <SocketContext.Provider value={SocketManager}>
                      <Routes />
                  </SocketContext.Provider>
                </QueryClientProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default App;
