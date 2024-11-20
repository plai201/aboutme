import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/Themes";
import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";
import ProSection from "./components/sections/ProSection";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import Projects from "./components/sections/Projects";

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;
const Wrapper = styled.div`
  padding-bottom: 100px;
  background: linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.15) 100%
    );
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

function App() {
  return <ThemeProvider theme={darkTheme}>
    <BrowserRouter>
      <Navbar />
      <Body>
        <div>
          <ProSection />
          <Wrapper>
            <Skills />
          </Wrapper>
          <Projects />
          <Wrapper>
          </Wrapper>
          <Wrapper>
           <Contact />
          </Wrapper>
          <Footer />
        </div>
          
      </Body>
    </BrowserRouter>
    
  </ThemeProvider>;
}

export default App;
