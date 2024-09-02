import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Dropdown, Modal, Button } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaTrash, FaPlus } from "react-icons/fa";
import "./HomePage.css";
import { ModelFilterRequest } from "../../config/model/ModelFilter/ModelFilterRequest";
import { Toy } from "../../config/model/ModelToy";
import Paging from "../../components/PagingNumber";
import ServiceHome from "../../config/service/ServiceHome";

const HomePage: React.FC = () => {
  const [toys, setToys] = useState<Toy[]>([]);
  const [type, setType] = useState<string>("");
  const [order, setOrder] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedToy, setSelectedToy] = useState<Toy | null>(null);
  const itemsPerPage = 10;

  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate();

  const serviceHome = useMemo(
    () => new ServiceHome("http://localhost:8080"),
    []
  );

  useEffect(() => {
    const fetchFilteredToys = async () => {
      const filterRequest: ModelFilterRequest = { order, type };

      try {
        const filteredToys = await serviceHome.filterToys(filterRequest);
        const sortedToys = filteredToys.sort((a: Toy, b: Toy) =>
          a.name.localeCompare(b.name)
        );
        setToys(sortedToys);
        setError(null);
      } catch (error) {
        console.error("Error fetching toys:", error);
        setError("Failed to fetch toys");
      }
    };

    fetchFilteredToys();
  }, [serviceHome, order, type]);

  useEffect(() => {
    if (page) {
      setCurrentPage(parseInt(page, 10));
    }
  }, [page]);

  const handleTypeSelect = (selectedType: string | null) => {
    setType(selectedType ?? "");
  };

  const handleOrderSelect = (selectedOrder: string | null) => {
    setOrder(selectedOrder ?? "");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`/home/${page}`);
  };

  const handleDelete = async () => {
    if (selectedToy) {
      try {
        await serviceHome.deleteToy(selectedToy.id);
        setToys((prevToys) =>
          prevToys.filter((toy) => toy.id !== selectedToy.id)
        );
        setShowModal(false);
        setSelectedToy(null);
      } catch (error) {
        console.error("Error deleting toy:", error);
        setError("Failed to delete toy");
      }
    }
  };

  const handleShowModal = (toy: Toy) => {
    setSelectedToy(toy);
    setShowModal(true);
  };

  const totalPages = Math.ceil(toys.length / itemsPerPage);
  const displayedToys = toys.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container className="home-page">
      <Container className="nav-home">
        <Row className="align-items-center">
          <Col>
            <h1 className="filter-dropdown">Filter</h1>
            <Row className="dropdown-row">
              <Dropdown className="dropdown-nav" onSelect={handleTypeSelect}>
                <Dropdown.Toggle className="dropdown-toggle-nav">
                  {type || "Select Type"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="">Select All</Dropdown.Item>
                  <Dropdown.Item eventKey="Doll">Dolls</Dropdown.Item>
                  <Dropdown.Item eventKey="Electronic Toy">
                    Electronic Toys
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="Plastic Toy">
                    Plastic Toys
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown className="dropdown-nav" onSelect={handleOrderSelect}>
                <Dropdown.Toggle className="dropdown-toggle-nav">
                  {order === "highest"
                    ? "Harga Tertinggi"
                    : order === "lowest"
                      ? "Harga Terendah"
                      : "Select Price"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="">Select All</Dropdown.Item>
                  <Dropdown.Item eventKey="highest">
                    Harga Tertinggi
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="lowest">
                    Harga Terendah
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Row>
          </Col>
          <Col className="text-end">
            <img src="/logo_hyou512.png" alt="Logo" className="logo-image" />
          </Col>
        </Row>
      </Container>

      <Container className="body-home">
        <Row className="align-items-center mb-3">
          <Col>
            <Link
              to="/add-toy"
              className="btn btn-primary d-flex align-items-center"
            >
              <FaPlus className="me-2" />
              Add Toys
            </Link>
          </Col>
        </Row>

        {error && <p>{error}</p>}
        {displayedToys.length > 0 ? (
          displayedToys.map((toy) => (
            <Link
              to={`/toys/detail/${toy.id}/${toy.name.toLowerCase().replace(/\s+/g, "-")}`}
              key={toy.id}
              className="toy-link"
            >
              <div className="toy-container">
                <div className="toy-grid d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="toy-name">{toy.name}</h4>
                    <p className="toy-type">{toy.type}</p>
                    <p className="toy-price">
                      {" "}
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(Number(toy.price))}
                    </p>
                    <p className="toy-stock">
                      <strong>Stock:</strong> {toy.stock}
                    </p>
                  </div>
                  <FaTrash
                    className="delete-icon"
                    onClick={(e) => {
                      e.preventDefault();
                      handleShowModal(toy);
                    }}
                  />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No toys available</p>
        )}
      </Container>

      <Paging
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the toy "{selectedToy?.name}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HomePage;
