import Navbar from "./components/nav";
import HeroSection from "./components/hero";
import AboutSection from "./components/about";
import EventsSection from "./components/events";
import RegistrationSection from "./components/registration";
import PrizesSection from "./components/prize";
import TeamSection from "./components/team";
import ContactSection from "./components/contact";

export default function HomePage() {

    return (
        <>
        <Navbar />
        <HeroSection />
        {/* <AboutSection/> */}
        <EventsSection/>
        <RegistrationSection/>
        {/* <TeamSection/> */}
        <PrizesSection/>
        <ContactSection/>
        </>
    );
}