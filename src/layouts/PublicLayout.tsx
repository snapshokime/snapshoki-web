import {Outlet} from 'react-router-dom'
import {Container} from "react-bootstrap";
import {PublicNavBar} from "@/components/PublicNavBar";
import ThemeInit from "@/components/ThemeInit";

export default function PublicLayout() {

    return (
        <>
            <ThemeInit />
            <PublicNavBar/>
            <Container className="my-4">
                <Outlet/>
            </Container>
        </>
    )
}
