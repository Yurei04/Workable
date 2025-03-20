
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import SignupPage from "../signup";


export default function SigninPageLayout () {
    return (
        <div className="w-full items-center justify-items-center">
            <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem>
                <SignupPage />
            </ThemeProvider>
        </div>
    )
}