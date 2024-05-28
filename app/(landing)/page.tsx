import { LandingContent } from "@/components/landing-content";
import { LandingHero } from "@/components/landing-rules";
import { LandingNavbar } from "@/components/landing-navbar";
import BackgroundImages from "@/components/bg-images";

export default async function Home() {
    return (        
        <div className="h-full">  
            {/* <BackgroundImages />       */}
            <LandingNavbar />
            <LandingContent />
            <LandingHero />
        </div>
    );
}
  