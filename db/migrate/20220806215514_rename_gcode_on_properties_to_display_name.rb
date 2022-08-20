class RenameGcodeOnPropertiesToDisplayName < ActiveRecord::Migration[7.0]
  def change
    rename_column :properties, :g_code, :display_name
  end
end
