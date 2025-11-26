class AddColumnsToMemos < ActiveRecord::Migration[8.0]
  def change
    add_column :memos, :recurring, :boolean
    add_column :memos, :ambiguous, :boolean
    add_column :memos, :necessary, :boolean
    add_column :memos, :budget_category, :text
    add_column :memos, :frequency, :string
    add_column :memos, :avatar_s3_url, :string
  end
end
