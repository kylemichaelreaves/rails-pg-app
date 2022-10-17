require 'rails_helper'

RSpec.describe Api::V1::LandlordsController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/api/v1/landlords').to route_to('api/v1/landlords#index')
    end

    it 'routes to #show' do
      expect(get: '/api/v1/landlords/1').to route_to('api/v1/landlords#show', id: '1')
    end

    it 'routes to #create' do
      expect(post: '/api/v1/landlords').to route_to('api/v1/landlords#create')
    end

    it 'routes to #update via PUT' do
      expect(put: '/api/v1/landlords/1').to route_to('api/v1/landlords#update', id: '1')
    end

    it 'routes to #update via PATCH' do
      expect(patch: '/api/v1/landlords/1').to route_to('api/v1/landlords#update', id: '1')
    end

    it 'routes to #destroy' do
      expect(delete: '/api/v1/landlords/1').to route_to('api/v1/landlords#destroy', id: '1')
    end

    it 'routes to #search' do
      expect(get: '/api/v1/landlords/search').to route_to('api/v1/landlords#search')
    end
  end
end
