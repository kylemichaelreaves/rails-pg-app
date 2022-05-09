require "test_helper"

class Api::V1::LandlordsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @landlord = landlords(:one)
  end

  test "should get index" do
    get landlords_url, as: :json
    assert_response :success
  end

  test "should create landlord" do
    assert_difference("Landlord.count") do
      post landlords_url, params: { landlord: {} }, as: :json
    end

    assert_response :created
  end

  test "should show landlord" do
    get landlord_url(@landlord), as: :json
    assert_response :success
  end

  test "should update landlord" do
    patch landlord_url(@landlord), params: { landlord: {} }, as: :json
    assert_response :success
  end

  test "should destroy landlord" do
    assert_difference("Landlord.count", -1) do
      delete landlord_url(@landlord), as: :json
    end

    assert_response :no_content
  end
end
