import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Loader from './Loader';  
import MusicPlayer from './MusicPlayer';
import ContactSection from './ContactSection';  // Renamed import
import { Analytics } from "@vercel/analytics/react"

function App() {
  const [loading, setLoading] = useState(true);
  const [currentRapperGroup, setCurrentRapperGroup] = useState(0);
  const [currentGuestGroup, setCurrentGuestGroup] = useState(0);
  
  // Références pour le défilement
  const rappersRef = useRef(null);
  const guestsRef = useRef(null);
  const contactRef = useRef(null);
  
  // Calculer le nombre de groupes de rappeurs (4 par groupe)
  const totalRapperGroups = Math.ceil(rappers.length / 4);
  // Calculer le nombre de groupes d'invités (2 par groupe)
  const totalGuestGroups = Math.ceil(guests.length / 2);

  useEffect(() => {
    // Simuler un temps de chargement
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Effet pour la rotation automatique des groupes de rappeurs (7 secondes)
  useEffect(() => {
    if (!loading) {
      const rapperInterval = setInterval(() => {
        setCurrentRapperGroup((prevGroup) => (prevGroup + 1) % totalRapperGroups);
      }, 7000);
      
      return () => clearInterval(rapperInterval);
    }
  }, [loading, totalRapperGroups]);

  // Effet pour la rotation automatique des groupes d'invités (5 secondes)
  useEffect(() => {
    if (!loading) {
      const guestInterval = setInterval(() => {
        setCurrentGuestGroup((prevGroup) => (prevGroup + 1) % totalGuestGroups);
      }, 5000);
      
      return () => clearInterval(guestInterval);
    }
  }, [loading, totalGuestGroups]);

  // Obtenir les 4 rappeurs actuels à afficher
  const getCurrentRappers = () => {
    const startIndex = currentRapperGroup * 4;
    return rappers.slice(startIndex, startIndex + 4);
  };

  // Obtenir les 2 invités actuels à afficher
  const getCurrentGuests = () => {
    const startIndex = currentGuestGroup * 2;
    return guests.slice(startIndex, startIndex + 2);
  };

  // Navigation manuelle pour les invités
  const navigateGuests = (direction) => {
    if (direction === 'next') {
      setCurrentGuestGroup((prevGroup) => (prevGroup + 1) % totalGuestGroups);
    } else {
      setCurrentGuestGroup((prevGroup) => (prevGroup - 1 + totalGuestGroups) % totalGuestGroups);
    }
  };

  // Fonction pour gérer le défilement vers les sections
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Header>
       
        <NavBar>
          <NavButton>Accueil</NavButton>
          <NavButton onClick={() => scrollToSection(rappersRef)}>Rappeurs</NavButton>
          <NavButton onClick={() => scrollToSection(guestsRef)}>Invités</NavButton>
          <NavButton>Programme</NavButton>
          <NavButton onClick={() => scrollToSection(contactRef)}>Contact</NavButton>
        </NavBar>
      </Header>
      
      <MainTitle>Tournoi de Rap Marocain 2025</MainTitle>
      
      {/* Section EVENT Made By */}
      <EventSection>
        <SectionTitle>EVENT Made By</SectionTitle>
        <EventGrid>
          <EventCard>
            <EventLogo src="https://i.postimg.cc/prvtxw7J/toto.jpg" alt="Elgrande Toto" />
            <EventInfo>
              <EventName>Elgrande Toto</EventName>
              <EventSocialLinks>
                <EventSocialLink href="https://www.instagram.com/elgrandetoto/" target="_blank">
                  <InstagramIcon />
                  <SocialText>Instagram</SocialText>
                </EventSocialLink>
                <EventSocialLink href="https://kick.com/elgrandetotoff" target="_blank">
                  <KickIcon />
                  <SocialText>Kick</SocialText>
                </EventSocialLink>
              </EventSocialLinks>
            </EventInfo>
          </EventCard>
          <EventCard>
            <EventLogo src="https://i.postimg.cc/jd7n5PLg/92e4422d-0448-4324-b37d-2f451d2454ba-fullsize.webp" alt="Moroccan Flow" />
            <EventInfo>
              <EventName>Ilyas Elmaliki</EventName>
              <EventSocialLinks>
                <EventSocialLink href="https://www.instagram.com/ilyas.elmaliki.921/" target="_blank">
                  <InstagramIcon />
                  <SocialText>Instagram</SocialText>
                </EventSocialLink>
                <EventSocialLink href="https://kick.com/ilyaselmaliki" target="_blank">
                  <KickIcon />
                  <SocialText>Kick</SocialText>
                </EventSocialLink>
              </EventSocialLinks>
            </EventInfo>
          </EventCard>
        </EventGrid>
      </EventSection>
      
      {/* Section des rappeurs en compétition */}
      <RapperSection ref={rappersRef}>
        <SectionTitle>Les Rappeurs en Compétition</SectionTitle>
        <RapperInfo>
          Groupe {currentRapperGroup + 1} sur {totalRapperGroups} • {rappers.length} rappeurs au total
        </RapperInfo>
        <CardContainer>
          <CardGrid>
            {getCurrentRappers().map((rapper) => (
              <RapperCard 
                key={rapper.id}
                style={rapper.id === 1 || rapper.id === 2 ? { borderColor: 'gold', borderWidth: '3px' } : {}}
              >
                <RapperImageContainer>
                  <RapperImage src={rapper.image} alt={rapper.name} />
                  <RapperOverlay />
                </RapperImageContainer>
                <RapperContent>
                  <RapperName>{rapper.name}</RapperName>
                  <SocialLinks>
                    <SocialLink href={rapper.instagram} target="_blank">
                      <InstagramIcon />
                      <SocialText>Instagram</SocialText>
                    </SocialLink>
                    <SocialLink href={rapper.youtube} target="_blank">
                      <YoutubeIcon />
                      <SocialText>YouTube</SocialText>
                    </SocialLink>
                  </SocialLinks>
                </RapperContent>
              </RapperCard>
            ))}
          </CardGrid>
        </CardContainer>
        <PaginationDots>
          {Array.from({ length: totalRapperGroups }).map((_, index) => (
            <PaginationDot 
              key={index} 
              active={index === currentRapperGroup}
              onClick={() => setCurrentRapperGroup(index)}
            />
          ))}
        </PaginationDots>
      </RapperSection>
      
      {/* Section des invités spéciaux */}
      <GuestsSection ref={guestsRef}>
        <SectionTitle>Invités Spéciaux</SectionTitle>
        <GuestInfo>
          {currentGuestGroup + 1} / {totalGuestGroups}
        </GuestInfo>
        <GuestsContainer>
          <NavigationButton 
            left 
            onClick={() => navigateGuests('prev')}
            aria-label="Précédent"
          >
            &lt;
          </NavigationButton>
          
          <GuestsGrid>
            {getCurrentGuests().map((guest) => (
              <GuestCard key={guest.id}>
                <GuestImageWrapper>
                  <GuestImage src={guest.logo} alt={guest.name} />
                </GuestImageWrapper>
                <GuestInfo>
                  <GuestName>{guest.name}</GuestName>
                  <GuestRole>{guest.role}</GuestRole>
                  <GuestSocialLinks>
                    <GuestSocialLink href={guest.instagram} target="_blank">
                      <InstagramIcon />
                    </GuestSocialLink>
                    <GuestSocialLink href={guest.kickLink} target="_blank">
                      <KickIcon />
                    </GuestSocialLink>
                  </GuestSocialLinks>
                </GuestInfo>
              </GuestCard>
            ))}
          </GuestsGrid>
          
          <NavigationButton 
            right
            onClick={() => navigateGuests('next')}
            aria-label="Suivant"
          >
            &gt;
          </NavigationButton>
        </GuestsContainer>
        <PaginationDots>
          {Array.from({ length: totalGuestGroups }).map((_, index) => (
            <PaginationDot 
              key={index} 
              active={index === currentGuestGroup}
              onClick={() => setCurrentGuestGroup(index)}
            />
          ))}
        </PaginationDots>
      </GuestsSection>
      
      {/* Section de contact (avec ref pour le défilement) */}
      <div ref={contactRef}>
        <ContactSection />
      </div>
      
      <Footer>
  <MusicPlayer />
  <p>
    © 2025 Tournoi de Rap Marocain -{" "}
    <a
      href="https://www.linkedin.com/in/rahil-ibrahim-b71692302/"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: "white",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => (e.target.style.color = "green")}
      onMouseLeave={(e) => (e.target.style.color = "white")}
    >
      Rahil Ibrahim
    </a>
  </p>
</Footer>

    </Container>
  );
}

// Composant pour l'icône Instagram
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// Composant pour l'icône YouTube
const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
  </svg>
);

// Composant pour l'icône Kick
const KickIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 17V7l8 5-8 5z"/>
  </svg>
);

// Données des rappeurs (18 rappeurs)
const rappers = [
  {
    id: 1,
    name: "Aessa",
    image: "https://i.postimg.cc/HkSrqsrH/channels4-profile.jpg",
    instagram: "https://www.instagram.com/aessa.17/",
    youtube: "https://www.youtube.com/@Aessa"
  },
  
  {
    id: 2,
    name: "Kraken",
    image: "https://i.postimg.cc/GtkBVFyS/channels4-profile.jpg",
    instagram: "https://www.instagram.com/eyokrak3n/",
    youtube: "https://www.youtube.com/@krak3nofficiel"
  },
  {

    id: 3,
    name: "TheTwama",
    image: "https://i.postimg.cc/MGTQHfCv/twama.jpg",
    instagram: "https://instagram.com/tagne",
    youtube: "https://youtube.com/tagne"
  },
  {
    id: 4,
    name: "Shaoline",
    image: "https://i.postimg.cc/MGNvGP0F/487381472-685538813947176-1669292170279316275-n.jpg",
    instagram: "https://www.instagram.com/shaolineee1/",
    youtube: "https://www.youtube.com/@Shaolineee"
  },
  {
    id: 5,
    name: "Merv48",
    image: "https://i.postimg.cc/13T90ggg/merv.jpg",
    instagram: "https://www.instagram.com/mirv48/",
    youtube: "https://www.youtube.com/channel/UCNLrkJhiaNR24ikmOmntxCw"
  },
  {
    id: 6,
    name: "K- THUG",
    image: "https://i.postimg.cc/k5KdxT3Z/dd.jpg",
    instagram: "https://www.instagram.com/@KTHUG",
    youtube: "https://www.youtube.com/@KTHUG"
  },
  {
    id: 7,
    name: "RedaGoathis",
    image: "https://i.postimg.cc/RhsrM8K3/reda.webp",
    instagram: "https://www.instagram.com/redagoathis/",
    youtube: ""
  },
  {
    id: 8,
    name: "ASSAM",
    image: "https://i.postimg.cc/W4RBb0F7/rrr.jpg",
    instagram: "",
    youtube: "https://www.youtube.com/@samimellalpro"
  },
  {
    id: 9,
    name: "the little biggy",
    image: "https://i.postimg.cc/B64R2sCL/dddd.jpg",
    instagram: "https://www.instagram.com/tlbiggy/",
    youtube: "https://www.youtube.com/@tlbiggy"
  },
  {
    id: 10,
    name: "Outis",
    image: "https://i.postimg.cc/wTZP0DVd/ddq.jpg",
    instagram: "https://www.instagram.com/outis_az/",
    youtube: "https://www.youtube.com/@OUTIS_Az"
  },
  {
    id: 11,
    name: "BIG A",
    image: "https://i.postimg.cc/3wCc8VHK/b.webp",
    instagram: "https://www.instagram.com/callme_big_a/",
    youtube: "https://www.youtube.com/@BIG_A_off"
  },
  {
    id: 12,
    name: "ROUIKOS",
    image: "https://i.postimg.cc/NMsP5DgR/a.jpg",
    instagram: "https://www.instagram.com/rouikos/",
    youtube: "https://www.youtube.com/@rouikos1510"
  },
  {
    id: 13,
    name: "Ndrophin",
    image: "https://i.postimg.cc/x1Ls5h8K/dddd.webp",
    instagram: "https://www.instagram.com/ndrophin.off/",
    youtube: "https://www.youtube.com/@Ndrophin_off"
  },
  {
    id: 14,
    name: "Romalisa",
    image: "https://i.postimg.cc/hjZMhqZq/r.jpg",
    instagram: "https://www.instagram.com/romalisaa/",
    youtube: "https://www.youtube.com/@romalisaa"
  },
  {
    id: 15,
    name: "Zeta7",
    image: "https://i.postimg.cc/XNhQb4yf/a.jpg",
    instagram: "https://www.instagram.com/zeta7__/",
    youtube: "https://www.youtube.com/@zeta.7x"
  }
];

// Données des invités spéciaux (5 invités) avec liens officiels (simulés)
const guests = [
  {
    id: 1,
    name: "Nahoule82",
    role: "Streameur",
    logo: "https://i.postimg.cc/pVp3mYKt/images.jpg",
    kickLink: "https://kick.com/nahoule82",
    instagram: "https://www.instagram.com/nahoule82"
  },
  {
    id: 2,
    name: "vodkafunky",
    role: "Streameur",
    logo: "https://i.postimg.cc/Bvxsj5Fg/f6ab5e3a-f016-433a-b78f-8efaae1fb57b.png",
    kickLink: "https://kick.com/vodkafunky",
    instagram: "https://www.instagram.com/vodkafunky"
  },
  {
    id: 3,
    name: "Bougassa",
    role: "Streameur",
    logo: "https://i.postimg.cc/43TRRK0h/images.jpg",
    kickLink: "https://kick.com/bougassa",
    instagram: "https://www.instagram.com/bougassa"
  },
  {
    id: 4,
    name: "DanasTV",
    role: "Streameur",
    logo: "https://i.postimg.cc/Pr87fXYb/images-1.jpg",
    kickLink: "https://kick.com/danastv",
    instagram: "https://www.instagram.com/danastv"
  },
  {
    id: 5,
    name: "Ahmed Sabiri",
    role: "Streameur",
    logo: "https://i.postimg.cc/1z5hzx99/images-2.jpg",
    kickLink: "https://kick.com/ahmedsabiri",
    instagram: "https://www.instagram.com/ahmedsabiri"
  },{
    id: 6,
    name: "7liwa",
    role: "Rappeur",
    logo: "https://i.postimg.cc/hPs7YSF0/1c7432e8b00300d6eaa3f4e2c697d3d7.jpg",
    kickLink: "https://kick.com/ahmedsabiri",
    instagram: "https://www.instagram.com/ahmedsabiri"
  }
];

// Styles pour les composants
const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  font-family: 'Poppins', sans-serif;
  background-color: #121212;
  color: #e0e0e0;
`;

const Header = styled.header`
  margin-bottom: 40px;
`;

const HeaderImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 8px 30px rgba(0, 255, 0, 0.1);
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 15px 0;
  background-color: #1a1a1a;
  border-radius: 8px;
  border: 1px solid #2a2a2a;
`;

const NavButton = styled.button`
  background: linear-gradient(45deg, #00cc00, #00ff66);
  border: none;
  color: #121212;
  padding: 10px 25px;
  border-radius: 30px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 255, 0, 0.3);
    background: linear-gradient(45deg, #00ff66, #00cc00);
  }
`;

const MainTitle = styled.h1`
  font-size: 42px;
  text-align: center;
  margin: 50px 0;
  color: #00ff66;
  text-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
  letter-spacing: 2px;
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  text-align: center;
  margin-bottom: 40px;
  color: #00ff66;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
`;

// Styles pour la section EVENT Made By
const EventSection = styled.section`
  margin-bottom: 80px;
  padding: 60px 0;
  background-color: #1a1a1a;
  border-radius: 15px;
  border-top: 3px solid #00cc00;
  border-bottom: 3px solid #00cc00;
`;

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2a2a2a;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease;
  border: 1px solid #333;
  
  &:hover {
    transform: translateY(-10px);
    border-color: #00ff66;
    box-shadow: 0 20px 40px rgba(0, 255, 0, 0.2);
  }
`;

const EventLogo = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
`;

const EventInfo = styled.div`
  padding: 25px;
  width: 100%;
  background-color: #1a1a1a;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EventName = styled.h3`
  font-size: 28px;
  text-align: center;
  margin: 0 0 25px;
  color: #00ff66;
`;

const EventSocialLinks = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: center;
`;

const EventSocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 25px;
  border-radius: 30px;
  background: linear-gradient(45deg, #1a1a1a, #2a2a2a);
  border: 1px solid #00cc00;
  color: #00ff66;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #00cc00, #00ff66);
    color: #121212;
    transform: scale(1.05);
  }
`;

// Section des rappeurs en compétition
const RapperSection = styled.section`
  margin-bottom: 80px;
  padding: 40px 0;
`;

const RapperInfo = styled.p`
  text-align: center;
  color: #00cc00;
  margin-bottom: 30px;
  font-size: 16px;
  font-weight: 500;
`;

// Nouveau conteneur pour centrer la grille des rappeurs
const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(240px, 280px));
  gap: 30px;
  max-width: 1200px;
  justify-content: center;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(240px, 280px));
  }
  
  @media (max-width: 600px) {
    grid-template-columns: minmax(240px, 280px);
  }
`;

const RapperCard = styled.div`
  background-color: #1a1a1a;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: all 0.4s ease;
  border: 2px solid #2a2a2a;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-10px);
    border-color: #00ff66;
    box-shadow: 0 15px 40px rgba(0, 255, 0, 0.2);
  }
`;

const RapperImageContainer = styled.div`
  position: relative;
  height: 280px;
  overflow: hidden;
`;

const RapperImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${RapperCard}:hover & {
    transform: scale(1.1);
  }
`;

const RapperOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
`;

const RapperContent = styled.div`
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #1a1a1a, #222);
`;

const RapperName = styled.h3`
  font-size: 22px;
  text-align: center;
  margin: 0 0 20px;
  color: #00ff66;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 2px;
    background: linear-gradient(90deg, #00cc00, #00ff66);
  }
`;


const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: auto;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px 20px;
  border-radius: 30px;
  background-color: #2a2a2a;
  border: 1px solid #00cc00;
  color: #00ff66;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #00cc00, #00ff66);
    color: #121212;
    transform: scale(1.05);
  }
`;

const SocialText = styled.span`
  font-weight: bold;
`;

const PaginationDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 40px;
`;

const PaginationDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#00ff66' : '#333'};
  box-shadow: ${props => props.active ? '0 0 10px rgba(0, 255, 0, 0.7)' : 'none'};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.active ? '#00ff66' : '#555'};
  }
`;

// Section des invités spéciaux
// Section des invités spéciaux (continuation)
const GuestsSection = styled.section`
  margin-bottom: 80px;
  padding: 60px 0;
  background-color: #1a1a1a;
  border-radius: 15px;
  position: relative;
  border-top: 3px solid #00cc00;
  border-bottom: 3px solid #00cc00;
`;

const GuestInfo = styled.p`
  text-align: center;
  color: #00cc00;
  margin-bottom: 30px;
  font-size: 16px;
  font-weight: 500;
`;

const GuestsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
`;

const GuestsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  width: 100%;
  padding: 0 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GuestCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(145deg, #222, #1a1a1a);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  transition: all 0.4s ease;
  border: 2px solid #2a2a2a;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center,
      rgba(0, 255, 102, 0.1) 0%,
      transparent 70%
    );
    z-index: 0;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-10px);
    border-color: #00ff66;
    box-shadow: 0 20px 40px rgba(0, 255, 0, 0.2);
    
    &:before {
      opacity: 1;
    }
  }
`;

const GuestImageWrapper = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 25px;
  border: 4px solid #00cc00;
  position: relative;
  z-index: 1;
  box-shadow: 0 10px 25px rgba(0, 255, 0, 0.3);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(0, 204, 0, 0.5), rgba(0, 255, 102, 0.5));
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 2;
  }
  
  ${GuestCard}:hover &:before {
    opacity: 0.3;
  }
`;

const GuestImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${GuestCard}:hover & {
    transform: scale(1.1);
  }
`;

const GuestName = styled.h3`
  font-size: 24px;
  margin: 0 0 10px;
  color: #00ff66;
  text-align: center;
  position: relative;
  z-index: 1;
  font-weight: 700;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #00cc00, #00ff66);
    border-radius: 3px;
  }
`;

const GuestRole = styled.p`
  font-size: 18px;
  margin: 15px 0 20px;
  color: #e0e0e0;
  text-align: center;
  font-style: italic;
  position: relative;
  z-index: 1;
`;

const GuestSocialLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 15px;
  position: relative;
  z-index: 1;
`;

const GuestSocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(45deg, #1a1a1a, #2a2a2a);
  border: 2px solid #00cc00;
  color: #00ff66;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(45deg, #00cc00, #00ff66);
    color: #121212;
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
  }
`;

const NavigationButton = styled.button`
  background: linear-gradient(45deg, #00cc00, #00ff66);
  border: none;
  width: 50px;
  height: 50px;
  margin: 0 -40px;
  border-radius: 50%;
  color: #121212;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  ${props => props.left ? 'left: -25px;' : 'right: -25px;'}
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);

  &:hover {
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 15px 25px rgba(0, 255, 0, 0.3);
  }
  
  @media (max-width: 768px) {
    ${props => props.left ? 'left: 10px;' : 'right: 10px;'}
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
`;












const Footer = styled.footer`
  text-align: center;
  padding: 40px 0;
  background-color:rgb(1, 44, 0);
  margin-top: 100px;
  border-top: 2px solid #1a1a1a;
  
  p {
    color: #888;
    margin: 0;
  }
`;





export default App;