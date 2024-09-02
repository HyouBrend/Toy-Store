import React, { useState } from "react";
import { Container, Form, Button, Dropdown } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ServiceHome from "../../config/service/ServiceHome";
import "./ToyForm.css";

const ToyForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [material, setMaterial] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [batteryType, setBatteryType] = useState<string>("");
  const [voltage, setVoltage] = useState<string>("");
  const [plasticType, setPlasticType] = useState<string>("");
  const [isBpaFree, setIsBpaFree] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const serviceHome = new ServiceHome("http://localhost:8080");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const toyData: any = {
        name,
        type,
        price,
        stock,
      };

      if (type === "Doll") {
        toyData.material = material;
        toyData.size = size;
      } else if (type === "Electronic Toy") {
        toyData.battery_type = batteryType;
        toyData.voltage = voltage;
      } else if (type === "Plastic Toy") {
        toyData.plastic_type = plasticType;
        toyData.is_bpa_free = isBpaFree;
      }

      await serviceHome.createToy(toyData);
      alert("Toy created successfully!");
      setName("");
      setType("");
      setPrice("");
      setStock("");
      setMaterial("");
      setSize("");
      setBatteryType("");
      setVoltage("");
      setPlasticType("");
      setIsBpaFree(false);
    } catch (error) {
      setError("Failed to create toy");
    }
  };

  return (
    <div className="toy-form-body">
      <Container className="toy-form-container">
        <div className="form-header">
          <Button
            variant="link"
            onClick={() => navigate(-1)}
            className="back-button"
          >
            <FaArrowLeft />
          </Button>
          <h2>Create a New Toy</h2>
        </div>
        {error && <p>{error}</p>}
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Type</Form.Label>
            <Dropdown
              onSelect={(selectedType: string | null) =>
                setType(selectedType || "")
              }
            >
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {type || "Select Type"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="Doll">Doll</Dropdown.Item>
                <Dropdown.Item eventKey="Electronic Toy">
                  Electronic Toy
                </Dropdown.Item>
                <Dropdown.Item eventKey="Plastic Toy">
                  Plastic Toy
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>

          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </Form.Group>

          {type === "Doll" && (
            <>
              <Form.Group>
                <Form.Label>Material</Form.Label>
                <Form.Control
                  type="text"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Size</Form.Label>
                <Form.Control
                  type="text"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
              </Form.Group>
            </>
          )}
          {type === "Electronic Toy" && (
            <>
              <Form.Group>
                <Form.Label>Battery Type</Form.Label>
                <Form.Control
                  type="text"
                  value={batteryType}
                  onChange={(e) => setBatteryType(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Voltage</Form.Label>
                <Form.Control
                  type="text"
                  value={voltage}
                  onChange={(e) => setVoltage(e.target.value)}
                />
              </Form.Group>
            </>
          )}
          {type === "Plastic Toy" && (
            <>
              <Form.Group>
                <Form.Label>Plastic Type</Form.Label>
                <Form.Control
                  type="text"
                  value={plasticType}
                  onChange={(e) => setPlasticType(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Is BPA Free?"
                  checked={isBpaFree}
                  onChange={(e) => setIsBpaFree(e.target.checked)}
                />
              </Form.Group>
            </>
          )}

          <Button variant="primary" onClick={handleSubmit}>
            Create Toy
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default ToyForm;
