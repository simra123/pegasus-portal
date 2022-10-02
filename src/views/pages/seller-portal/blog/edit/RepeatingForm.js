// ** React Imports
import { useState } from 'react'

// ** Icons Imports
import { X, Plus } from 'react-feather'

// ** Custom Components
import Repeater from '@components/repeater'

// ** Reactstrap Imports
import { Row, Col, Card, CardHeader, CardBody, Form, Label, Input, Button } from 'reactstrap'

const RepeatingForm = ({imgPath,featuredImg,onChange}) => {
  // ** State
  const [count, setCount] = useState(1)

  const increaseCount = () => {
    setCount(count + 1)
  }

  const deleteForm = e => {
    e.preventDefault()
    e.target.closest('form').remove()
  }

  return (
    <Card>
      <CardHeader>
        <h4 className="card-title">Repeating Forms</h4>
      </CardHeader>

      <CardBody>
        <Repeater count={count}>
          {(i) => (
            <Form key={i}>
              <Row className="justify-content-between align-items-center">
                <Col className="mb-2" sm="12">
                  <div className="border rounded p-2">
                    <h4 className="mb-1">Featured Image</h4>
                    <div className="d-flex flex-column flex-md-row">
                      {featuredImg[i] ? (
                        <img
                          className="rounded me-2 mb-1 mb-md-0"
                          src={featuredImg[i]}
                          alt="featured img"
                          width="170"
                          height="110"
                        />
                      ) : (
                        <p>Upload Picture</p>
                      )}
                      <div>
                        <br />

                        <p className="my-50" style={{paddingLeft: "10px"}}>
                          <a href="/" onClick={(e) => e.preventDefault()}>
                           
                            {`C:/fakepath/${imgPath}`}
                          </a>
                        </p>
                        <div className="d-inline-block">
                          <div className="mb-0">
                            <Input
                              type="file"
                              id="exampleCustomFileBrowser"
                              name="customFile"
                              onChange={onChange}
                              accept=".jpg, .png, .gif"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Form>
          )}
        </Repeater>
        <Button className="btn-icon" color="primary" onClick={increaseCount}>
          <Plus size={14} />
          <span className="align-middle ms-25">Add New</span>
        </Button>
      </CardBody>
    </Card>
  );
}

export default RepeatingForm
