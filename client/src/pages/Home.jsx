import { useAuth } from "../auth/AuthProvider";
import "../styles/Home.css";
// import Main from "../components/Common/Main";

function Home() {
  const auth = useAuth();

  return (
    <>
      <header>
        {/* <!-- Navbar --> */}
        {/* <NavBar /> */}

        {/* <!-- Banner --> */}
        <div className="banner">
          <div className="overlay">
            <div className="TextContainer">
              <h1 className="title">
                Bienvenido {auth.getUser()?.firstName || ""}
              </h1>
              <p className="subtitle">
                Lorem Ipsumes simplemente el texto de relleno de las imprentas y
                archivos de texto. Lorem Ipsum ha sido el texto de relleno
                estándar de las industrias desde el año 1500, cuando un impresor
                (N. de Tu vieja) desconocido usó una galería de textos y los
                mezcló de tal manera que logró hacer un libro de textos
                especimen.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* <!-- Contenido principal --> */}
      {/* <Main /> */}
    </>
  );
}

export default Home;
