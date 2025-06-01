import LimitBanner from '@/components/LimitBanner'
import AlbumSidebar from '@/components/AlbumSidebar'
import PhotoGrid from '@/components/PhotoGrid'
import PhotoViewer from '@/components/PhotoViewer'
import ThemeInit from "@/components/ThemeInit";
import {PublicNavBar} from "@/components/PublicNavBar";

export default function DashboardLayout() {
    return (
        <>
            <ThemeInit />
            <PublicNavBar/>
            <LimitBanner />
            <div className="container-fluid page-fade">
                <div className="row">
                    <div className="col-md-3 p-3 border-end">
                        <AlbumSidebar />
                    </div>
                    <div className="col-md-9 p-3">
                        <PhotoGrid />
                    </div>
                </div>
            </div>
            <PhotoViewer />
        </>
    )
}
