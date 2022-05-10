require "test_helper"

class Api::V1::PropertiesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @property = properties(:one)
  end

  test "should get index" do
    get api_v1_properties_url, as: :json
    assert_response :success
  end

  test "should create property" do
    assert_difference("Property.count") do
      post api_v1_property_url, params: { property: { street_address: @property.street_address, owner_name: @property.owner_name, city_state_zip: @property.city_state_zip, owner_mailing_address: @property.owner_mailing_address } }, as: :json
    end

    assert_response :created
  end

  test "should show property" do
    get api_v1_property_url(@property), as: :json
    assert_response :success
  end

  test "should update property" do
    patch api_v1_property_url(@property), params: { property: { street_address: "1600 Pennsylvania Ave" } }, as: :json
    assert_response :success
  end

  test "should destroy property" do
    assert_difference("Property.count", -1) do
      delete api_v1_property_url(@property), as: :json
    end

    assert_response :no_content
  end
end
