import { Container } from 'react-bootstrap';

function About() {
  return (
    <Container>
      <div className="About">
        <header className="About-header">
          <h1>About</h1>
          {/* TODO: Add content about who we are and what this is: */}
          <p>Our team is made up of three people: </p>
          <ul>
            <li>Hugo Lanfranchi</li>
            <li>Tobias Oberdoerfer</li>
            <li>Jonas Blanc</li>

          </ul>
        </header>
      </div>
    </Container>
  );
}

export default About;