import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Spinner, Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import "./DetailPage.css";
import { ServiceDetail } from "../../config/service/ServiceDetail/ServiceDetail";
import { Toy } from "../../config/model/ModelToy";
import { ModelDetailDoll } from "../../config/model/ModelDetail/ModelDetailDoll";
import { ModelDetailElectronicToy } from "../../config/model/ModelDetail/ModelDetailElectronicToy";
import { ModelDetailPlasticToy } from "../../config/model/ModelDetail/ModelDetailPlasticToy";

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [toy, setToy] = useState<
    | Toy
    | ModelDetailDoll
    | ModelDetailElectronicToy
    | ModelDetailPlasticToy
    | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchToyDetail = async () => {
      if (!id) {
        setError("ID is required");
        return;
      }

      const service = new ServiceDetail("http://localhost:8080");
      try {
        const toyData = await service.getToyById(id);
        setToy(toyData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch toy details");
      }
    };

    fetchToyDetail();
  }, [id]);

  const renderDetailFields = () => {
    if (!toy) return null;

    return (
      <>
        <div className="info-row">
          <p>
            <strong>Type</strong>
            <span className="colon">:</span> {toy.type}
          </p>
        </div>
        <div className="info-row">
          <p>
            <strong>Price</strong>
            <span className="colon">:</span>{" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(Number(toy.price))}
          </p>
        </div>
        <div className="info-row">
          <p>
            <strong>Stock</strong>
            <span className="colon">:</span> {toy.stock}
          </p>
        </div>

        {toy.type === "Doll" && (
          <>
            <div className="info-row">
              <p>
                <strong>Material</strong>
                <span className="colon">:</span>{" "}
                {(toy as ModelDetailDoll).material}
              </p>
            </div>
            <div className="info-row">
              <p>
                <strong>Size</strong>
                <span className="colon">:</span> {(toy as ModelDetailDoll).size}
              </p>
            </div>
          </>
        )}

        {toy.type === "Electronic Toy" && (
          <>
            <div className="info-row">
              <p>
                <strong>Battery Type</strong>
                <span className="colon">:</span>{" "}
                {(toy as ModelDetailElectronicToy).battery_type}
              </p>
            </div>
            <div className="info-row">
              <p>
                <strong>Voltage</strong>
                <span className="colon">:</span>{" "}
                {(toy as ModelDetailElectronicToy).voltage}
              </p>
            </div>
          </>
        )}

        {toy.type === "Plastic Toy" && (
          <>
            <div className="info-row">
              <p>
                <strong>Plastic Type</strong>
                <span className="colon">:</span>{" "}
                {(toy as ModelDetailPlasticToy).plastic_type}
              </p>
            </div>
            <div className="info-row">
              <p>
                <strong>Is BPA Free</strong>
                <span className="colon">:</span>{" "}
                {(toy as ModelDetailPlasticToy).is_bpa_free ? "Yes" : "No"}
              </p>
            </div>
          </>
        )}
      </>
    );
  };

  if (error) {
    return (
      <Container className="centered-container">
        <Card className="p-4">
          <p>{error}</p>
        </Card>
      </Container>
    );
  }

  if (!toy) {
    return (
      <Container className="centered-container">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <>
      <Container className="centered-container">
        <Card className="detail-page p-4">
          <Card.Header className="card-header">
            <Button
              variant="link"
              onClick={() => navigate(-1)}
              className="back-button-icon"
            >
              <FaArrowLeft />
            </Button>
            <div className="title-container">
              <Card.Title className="text-center">{toy.name}</Card.Title>
            </div>
          </Card.Header>
          <Card.Body>
            <div className="detail-info">{renderDetailFields()}</div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default DetailPage;
