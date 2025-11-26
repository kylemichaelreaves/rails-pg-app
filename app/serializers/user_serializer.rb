# frozen_string_literal: true

# app/serializers/user_serializer.rb
class UserSerializer
  def initialize(user)
    @user = user
  end

  def as_json
    {
      id: @user.id,
      email: @user.email,
      role: @user.role,
      created_at: @user.created_at,
      updated_at: @user.updated_at
    }
  end
end