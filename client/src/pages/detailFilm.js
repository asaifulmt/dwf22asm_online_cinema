import { useEffect, useState } from "react"
import { Button, Container } from "react-bootstrap"
import { useParams } from "react-router-dom"
import ModalPurchase from "../components/modalPurchase"
import { API } from "../config/api"
import { convertToRupiah } from "../utils/helper"
import NotFound from "./notFound"

export default function DetailFilm() {
  const [film, setFilm] = useState({})
  const [isError, setIsError] = useState(false)
  const [isVisibleModal, setIsVisibleModal] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    const getFilm = async () => {
      try {
        const resp = await API.get(`/film/${id}`)
        setFilm(resp.data.film)
      } catch(err) {
        setIsError(true)
      }
    }

    getFilm()
  }, [id])

  if (isError) {
    return <NotFound />
  }

  if (!film.title) {
    return <div></div>
  }

  return (
    <>
      <Container className="mt-5">
        <div className="d-flex justify-content-between">
          <img src={`http://localhost:5000/uploads/${film.thumbnail}`} alt="thumbnail" height="485px" width="349px" />
          <div>
            <div className="d-flex align-items-center justify-content-between">
              <h1 className="mb-4">{film.title}</h1>
              {
                (!film.userFilm.status || film.userFilm.status === 'pending') && <Button style={{ width: '5rem', height: '2rem' }} onClick={() => setIsVisibleModal(true)}>Buy</Button>
              }
            </div>
            <iframe id={(!film.userFilm.status || film.userFilm.status === 'pending') ? 'overlay' : ''} width="640" height="360" src={film.filmUrl} title={film.title} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <div style={{ width: 640, marginTop: '2rem' }}>
              <h4>{film.category.name}</h4>
              {
                (!film.userFilm.status || film.userFilm.status === 'pending') && <p>{convertToRupiah(film.price)}</p>
              }
              <p>{film.description}</p>
            </div>
          </div>
        </div>
      </Container>
      <ModalPurchase isVisible={isVisibleModal} onHide={() => setIsVisibleModal(false)} filmId={film.id} title={film.title} />
    </>
  )
}
