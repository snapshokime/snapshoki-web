import {Form} from 'react-bootstrap'
import {useThemeStore} from "@/stores/useThemeStore";

export default function DarkModeSwitch() {
    const {darkMode, toggleDarkMode, navBarTextClass} = useThemeStore()

    return (
        <Form.Check
            inline
            type="switch"
            id="darkModeSwitch"
            label={'Dark Mode'}
            checked={darkMode}
            onChange={toggleDarkMode}
            className={`ms-3 ${navBarTextClass} danger`}
        />
    )
}
