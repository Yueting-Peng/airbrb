import React from 'react'
import {
  Form,
  Input,
  InputNumber,
  Upload,
  Button,
  Select,
  Checkbox,
} from 'antd'
import { UploadOutlined, WifiOutlined, CarOutlined } from '@ant-design/icons'
import { Snow, Tv, Water, WindowFullscreen } from 'react-bootstrap-icons'
import washingMachine from '../assets/washing-machine.svg'
import styled from 'styled-components'

const { Option } = Select

const FormRow = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 10px;
  @media (max-width: 850px) {
    flex-direction: column;
  }
`
const BedInfo = styled.div`
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
`
const CheckboxAmenities = styled(Checkbox)`
  margin-top: 20px;
  padding-right: 5px;
`

const ListingForm = (props) => {
  const [form] = Form.useForm()

  React.useEffect(() => {
    if (props.initialValues) {
      form.setFieldsValue(props.initialValues)
    }
  }, [props.initialValues, form])
  console.log(props.initialValues)
  return (
    <>
      {props.isLoading
        ? <div>Loading...</div>
        : <Form
          form={form}
          layout="vertical"
          name="new_listing_form"
          onFinish={props.onFinish}
        >
          <Form.Item
            name="title"
            label="Listing Title"
            rules={[
              {
                required: true,
                message: 'Please input the title of the listing!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="street"
            label="Street Name"
            rules={[{ required: true, message: 'Please input the street!' }]}
          >
            <Input />
          </Form.Item>
          <FormRow>
            <Form.Item
              name="city"
              label="Suburb/City"
              rules={[
                { required: true, message: 'Please input the suburb/city!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="state"
              label="State"
              rules={[{ required: true, message: 'Please input the state!' }]}
            >
              <Input />
            </Form.Item>
          </FormRow>
          <FormRow>
            <Form.Item
              name="postcode"
              label="Postcode"
              rules={[
                { required: true, message: 'Please input the postcode!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="country"
              label="Country"
              rules={[
                { required: true, message: 'Please select the country!' },
              ]}
            >
              <Input />
            </Form.Item>
          </FormRow>
          <FormRow>
            <Form.Item
              name="price"
              label="Listing Price (per night)"
              rules={[
                {
                  required: true,
                  message: 'Please input the price per night!',
                },
              ]}
            >
              <InputNumber prefix="$" />
            </Form.Item>

            <Form.Item
              name="thumbnail"
              label="Listing Thumbnail"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e
                }
                return e && e.fileList
              }}
            >
              <Upload beforeUpload={() => false} listType="picture">
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </FormRow>

          <Form.Item
            name="propertyType"
            label="Property Type"
            rules={[
              { required: true, message: 'Please select the property type!' },
            ]}
          >
            <Select placeholder="Select a property type">
              <Option value="Apartment">Apartment</Option>
              <Option value="House">House</Option>
              <Option value="Boat">Boat</Option>
              <Option value="Cabin">Cabin</Option>
              <Option value="Campervan/RV">Campervan/RV</Option>
              <Option value="Farm">Farm</Option>
              <Option value="Hotel">Hotel</Option>
              <Option value="Tent">Tent</Option>
            </Select>
          </Form.Item>
          <BedInfo>
            <Form.Item
              name="guests"
              label="Guests"
              rules={[
                {
                  required: true,
                  message: 'Please input the number of guests!',
                },
              ]}
            >
              <InputNumber min={1} max={10} />
            </Form.Item>
            <Form.Item
              name="bedrooms"
              label="Bedrooms"
              rules={[
                {
                  required: true,
                  message: 'Please input the number of bedrooms!',
                },
              ]}
            >
              <InputNumber min={1} max={10} />
            </Form.Item>
            <Form.Item
              name="beds"
              label="Beds"
              rules={[
                { required: true, message: 'Please input the number of beds!' },
              ]}
            >
              <InputNumber min={1} max={10} />
            </Form.Item>
            <Form.Item
              name="bathrooms"
              label="Bathrooms"
              rules={[
                {
                  required: true,
                  message: 'Please input the number of bathrooms!',
                },
              ]}
            >
              <InputNumber min={1} max={10} />
            </Form.Item>
          </BedInfo>
          <Form.Item name="amenities" label="Property Amenities">
            <Checkbox.Group style={{ width: '100%' }}>
              <CheckboxAmenities value="wifi">
                <WifiOutlined />
                &nbsp;&nbsp;Wi-Fi
              </CheckboxAmenities>
              <CheckboxAmenities value="tv">
                <Tv />
                &nbsp;&nbsp;TV
              </CheckboxAmenities>
              <CheckboxAmenities value="kitchen">
                <WindowFullscreen />
                &nbsp;&nbsp;Kitchen
              </CheckboxAmenities>
              <CheckboxAmenities value="washingMachine">
                <img src={washingMachine} />
                &nbsp;&nbsp;Washing Machine
              </CheckboxAmenities>
              <CheckboxAmenities value="airConditioning">
                <Snow />
                &nbsp;&nbsp;Air Conditioning
              </CheckboxAmenities>
              <CheckboxAmenities value="swimmingPool">
                <Water />
                &nbsp;&nbsp;Swimming Pool
              </CheckboxAmenities>
              <CheckboxAmenities value="parking">
                <CarOutlined />
                &nbsp;&nbsp;Parking
              </CheckboxAmenities>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            name="images"
            label="Property Images"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e
              }
              return e && e.fileList
            }}
          >
            <Upload listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {props.isLoading ? 'Loading...' : 'Submit'}
            </Button>
          </Form.Item>
        </Form>
      }
    </>
  )
}

export default ListingForm
