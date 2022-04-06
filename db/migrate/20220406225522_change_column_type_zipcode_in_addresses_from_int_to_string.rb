class ChangeColumnTypeZipcodeInAddressesFromIntToString < ActiveRecord::Migration[7.0]
  def change
    change_table :addresses do |t|
      t.change :zipcode, :string
    end
  end
end
