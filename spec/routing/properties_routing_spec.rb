require "rails_helper"

RSpec.describe Api::V1::PropertiesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/api/v1/properties").to route_to("api/v1/properties#index")
    end

    it "routes to #show" do
      expect(get: "/api/v1/properties/1").to route_to("api/v1/properties#show", id: "1")
    end

    it "routes to #create" do
      expect(post: "/api/v1/properties").to route_to("api/v1/properties#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/api/v1/properties/1").to route_to("api/v1/properties#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/api/v1/properties/1").to route_to("api/v1/properties#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/api/v1/properties/1").to route_to("api/v1/properties#destroy", id: "1")
    end
  end
end
