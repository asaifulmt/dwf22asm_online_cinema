import { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { API } from "../config/api";
import { ModalContext } from "../contexts/modalContext";
import { UserContext } from "../contexts/userContext";

export default function Home() {
  const [films, setFilms] = useState([])

  const router = useHistory()

  const [{ isLogin }] = useContext(UserContext)
  const [, dispatchModal] = useContext(ModalContext)

  useEffect(() => {
    async function getFilms() {
      try {
        const resp = await API.get('/film')

        setFilms(resp.data.films)
      } catch(err) {
        console.log(err)
        // setIsError(true)
      }
    }

    getFilms()
  }, [])

  const goToDetailPage = (id) => {
    if (isLogin) {
      router.push(`/film/${id}`)
    } else {
      dispatchModal({
        type: 'SHOW_LOGIN_MODAL'
      })
    }
  }


  return (
    <Container className="mt-5">
      <h1 className="mb-4">List Film</h1>
      <Row>
        {
          films.map(film => (
            <Col md={2} className="mb-5">
              <img className="cursor-pointer" onClick={() => goToDetailPage(film.id)} src={`http://localhost:5000/uploads/${film.thumbnail}`} alt={film.title} width="180px" height="250px" />
            </Col>
          ))
        }
      </Row>
    </Container>
  )
}
