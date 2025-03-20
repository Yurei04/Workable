import  LoginPage  from "@/pages/loginPage"
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider"


export default function LoginPageLayout () {
    return (
        <div className="w-full items-center justify-items-center">
            <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem>
                <LoginPage />
            </ThemeProvider>
        </div>
    )
}