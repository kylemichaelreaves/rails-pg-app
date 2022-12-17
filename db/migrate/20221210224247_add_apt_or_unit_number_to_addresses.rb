class AddAptOrUnitNumberToAddresses < ActiveRecord::Migration[7.0]
  def change
    add_column :addresses, :apt_or_unit_number, :string, optional: true
  end
end
